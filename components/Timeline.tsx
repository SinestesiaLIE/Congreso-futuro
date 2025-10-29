import React from 'react';
import type { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="relative border-l-2 border-cyan-700/50 ml-6 md:ml-10">
      {events.map((event, index) => (
        <div key={index} className="mb-10 ml-8 md:ml-12">
          {/* Timeline Dot */}
          <span className="absolute -left-[13px] md:-left-[17px] flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-cyan-900 rounded-full ring-4 ring-cyan-500">
            <span className="text-white text-xs md:text-sm font-bold">{event.year.toString().slice(-2)}</span>
          </span>

          {/* Content */}
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700 hover:border-cyan-600 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-white">{event.talk_title}</h3>
            <p className="text-md text-cyan-300 mb-1">{event.speaker}</p>
            <p className="text-sm text-gray-400">{event.congress_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
