type PostsMiscProps = {
  itemRows: { icon: React.JSX.Element; content: React.ReactNode }[];
};

export default function PostsMisc({ itemRows }: PostsMiscProps) {
  return (
    <section className="bg-sky-400 bg-opacity-20 hover:bg-opacity-30 flex flex-col text-white space-y-2 pl-6 p-4 border-l-4 border-gray-300 rounded-2xl my-4">
      {itemRows.map((row, index) => (
        <div key={index} className="flex items-center">
          {row.icon}
          {row.content}
        </div>
      ))}
    </section>
  );
}
