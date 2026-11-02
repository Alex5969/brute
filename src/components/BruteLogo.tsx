import React from 'react';

interface BruteWordmarkProps {
  className?: string;
  dotColor?: string;
}

/**
 * Logotype & signature BRUT.E officielle
 * Le point entre BRUT et E est rigoureusement carré (charte du dossier BRUT.E).
 */
export const BruteWordmark: React.FC<BruteWordmarkProps> = ({
  className = '',
  dotColor = 'bg-[#8F4D32]',
}) => {
  return (
    <span className={`inline-flex items-baseline tracking-tight uppercase ${className}`}>
      <span>BRUT</span>
      <span
        className={`inline-block w-[0.22em] h-[0.22em] ${dotColor} mx-[0.05em] mb-[0.04em] shrink-0 rounded-none`}
        aria-hidden="true"
      />
      <span className="sr-only">.</span>
      <span>E</span>
    </span>
  );
};
