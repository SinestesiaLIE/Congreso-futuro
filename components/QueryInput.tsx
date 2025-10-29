
import React from 'react';
import { SearchIcon } from './Icons';

interface QueryInputProps {
  onQuerySubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onQuerySubmit, isLoading }) => {
  const [query, setQuery] = React.useState('');
  
  const exampleQueries = [
    "¿Qué se ha dicho sobre la inteligencia artificial y la sostenibilidad?",
    "¿Quiénes hablaron sobre la colonización de Marte y cuáles fueron sus ideas principales?",
    "Resume las discusiones sobre bioética y edición genética.",
    "¿Cuál es la evolución del concepto de metaverso en los congresos?"
  ];
  const [placeholder, setPlaceholder] = React.useState(exampleQueries[0]);

  React.useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
        index = (index + 1) % exampleQueries.length;
        setPlaceholder(exampleQueries[index]);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [exampleQueries]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onQuerySubmit(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pl-5 pr-28 py-4 bg-gray-800/50 border-2 border-cyan-500/30 rounded-full text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0 right-0 m-2 flex items-center px-6 bg-cyan-600 text-white rounded-full font-bold hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          <SearchIcon className="w-5 h-5 mr-2" />
          <span>Consultar</span>
        </button>
      </div>
    </form>
  );
};

export default QueryInput;
