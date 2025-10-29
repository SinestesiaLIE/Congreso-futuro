import React from 'react';
import type { QueryResult } from '../types';
import { QuoteIcon } from './Icons';
import TagCloud from './TagCloud';
import Timeline from './Timeline';

interface ResultsDisplayProps {
  results: QueryResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { congresses, timeline_events, key_quotes, summary, main_concepts } = results;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 p-4 md:p-8">
      {/* Section 1: Congresses */}
      <div className="card-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-6 border-l-4 border-cyan-400 pl-4">
          Congresos Relevantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {congresses.map((congress, index) => (
            <div key={index} className="bg-gray-800/60 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors duration-300">
              <p className="font-bold text-lg text-white">{congress.name}</p>
              <p className="text-cyan-400">{congress.year}</p>
              <p className="text-gray-300 text-sm mt-1">Tema: {congress.theme}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Timeline */}
      {timeline_events && timeline_events.length > 0 && (
        <div className="card-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-green-300 mb-8 border-l-4 border-green-400 pl-4">
            Línea de Tiempo Evolutiva
          </h2>
          <Timeline events={timeline_events} />
        </div>
      )}

      {/* Section 3: Tag Cloud */}
      {main_concepts && main_concepts.length > 0 && (
        <div className="card-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 border-l-4 border-yellow-400 pl-4">
            Conceptos Clave
          </h2>
          <TagCloud tags={main_concepts} />
        </div>
      )}

      {/* Section 4: Key Quotes */}
      <div className="card-fade-in" style={{ animationDelay: '0.8s' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-300 mb-6 border-l-4 border-purple-400 pl-4">
          Qué se dijo y Quiénes lo dijeron
        </h2>
        <div className="space-y-6">
          {key_quotes.map((item, index) => (
            <blockquote key={index} className="bg-gray-800/60 p-6 rounded-lg border-l-4 border-purple-500 relative">
              <QuoteIcon className="absolute top-4 right-4 w-8 h-8 text-gray-700" />
              <p className="text-lg italic text-white mb-4">"{item.quote}"</p>
              <footer className="text-right">
                <p className="font-semibold text-purple-300">{item.speaker}</p>
                <p className="text-sm text-gray-400">{item.talk_title}</p>
                <p className="text-xs text-gray-500">{item.congress_name}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Section 5: Summary */}
      <div className="card-fade-in" style={{ animationDelay: '1.0s' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-teal-300 mb-6 border-l-4 border-teal-400 pl-4">
          Conclusión General
        </h2>
        <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-700">
          <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
