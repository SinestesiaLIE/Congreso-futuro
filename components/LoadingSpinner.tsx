
import React from 'react';
import { BrainCircuitIcon } from './Icons';

const LoadingSpinner: React.FC = () => {
  const messages = [
    "Analizando abstractos...",
    "Identificando expositores clave...",
    "Sintetizando conclusiones...",
    "Conectando ideas entre congresos...",
    "Generando conocimiento...",
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-cyan-300">
      <BrainCircuitIcon className="w-16 h-16 animate-spin-slow" />
      <p className="text-lg font-light transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
