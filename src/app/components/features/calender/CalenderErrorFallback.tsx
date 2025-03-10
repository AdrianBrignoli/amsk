export default function CalenderErrorFallback() {
  return (
    <div className="w-full h-[22em] bg-black bg-opacity-40 rounded-2xl p-4 flex items-center justify-center">
      <div className="text-center text-gray-300">
        <h3 className="text-xl mb-2">Något gick fel med kalendern</h3>
        <p className="text-sm">Försök ladda om sidan</p>
      </div>
    </div>
  );
}
