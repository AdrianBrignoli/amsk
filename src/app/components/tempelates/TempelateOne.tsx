type TempelateOneProps = {
  title: string | undefined;
  text: string;
  component: React.ReactNode | null;
};

export default function TempelateOne({
  title,
  text,
  component,
}: TempelateOneProps) {
  return (
    <div className="flex-grow flex flex-col justify-center w-full">
      <div className="flex md:flex-row flex-col space-y-4 px-4 max-w-[1300px] w-full mx-auto">
        <div className="flex flex-col justify-center space-y-2 p-2 md:w-1/3 w-full pr-12">
          <h3 className="text-3xl text-gray-100">{title}</h3>
          <p className="text-gray-400">{text}</p>
        </div>
        <div className="md:w-2/3 w-full">{component}</div>
      </div>
    </div>
  );
}
