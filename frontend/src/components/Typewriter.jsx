import { useState, useEffect } from 'react';

export default function Typewriter({
  text = '',
  speed = 40,
  startDelay = 300,
  className = '',
  showCursor = true,
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    if (!text) return;

    let i = 0;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && (
        <span className="inline-block w-[2px] h-[0.9em] ml-0.5 align-middle bg-current animate-pulse opacity-80" />
      )}
    </span>
  );
}