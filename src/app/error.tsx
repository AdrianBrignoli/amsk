'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-white">
      <h2 className="text-2xl mb-4">Något gick fel</h2>
      <p className="text-gray-400 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Försök igen
      </button>
    </div>
  );
}
