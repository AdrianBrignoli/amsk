interface ErrorSmallProps {
  message: string;
}

export default function ErrorSmall({ message }: ErrorSmallProps) {
  return (
    <div className="text-center bg-black bg-opacity-30 rounded-xl w-1/2 mx-auto py-20 px-8 text-gray-400">
      {message}
    </div>
  );
}
