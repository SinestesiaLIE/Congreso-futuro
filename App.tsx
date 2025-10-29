
import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { BrainCircuitIcon } from './components/Icons';
import { queryCongressData } from './services/geminiService';
import type { QueryResult } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuerySubmit = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await queryCongressData(query);
      setResults(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black font-sans flex flex-col items-center p-4 sm:p-8 transition-all duration-500">
      <header className="w-full text-center mb-8 md:mb-12">
        <div className="flex justify-center items-center gap-4">
          <BrainCircuitIcon className="w-12 h-12 text-cyan-400" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white animate-text-glow">
            Congresos Futuros
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mt-2">
          Explorador de Conocimiento con IA
        </p>
      </header>

      <main className="w-full flex-grow flex flex-col items-center justify-start">
        <div className="w-full max-w-3xl mb-12">
          <QueryInput onQuerySubmit={handleQuerySubmit} isLoading={isLoading} />
        </div>
        
        <div className="w-full flex-grow flex items-center justify-center">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg max-w-2xl">
              <h3 className="text-xl font-bold mb-2">Error de Comunicación</h3>
              <p>{error}</p>
            </div>
          )}
          {results && <ResultsDisplay results={results} />}
          {!isLoading && !error && !results && (
             <div className="text-center text-gray-500 max-w-2xl">
                <p className="text-2xl">Bienvenido al archivo de conocimiento.</p>
                <p className="mt-2">Realiza una pregunta sobre las temáticas, expositores o conceptos discutidos a lo largo de los años en Congreso Futuro para comenzar.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full text-center text-gray-600 p-4 mt-auto">
        <p>Potenciado por Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
