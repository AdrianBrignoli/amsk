export default function RootLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="spinner"></div>
        <p className="text-white/50 text-sm animate-pulse">Laddar...</p>
      </div>
    </div>
  );
}
