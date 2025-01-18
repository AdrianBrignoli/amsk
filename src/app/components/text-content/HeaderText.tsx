import { ReactNode } from 'react';

interface HeaderTextProps {
  hone: string;
  htwo: string;
  content: ReactNode | null;
}

export default function HeaderText({ hone, htwo, content }: HeaderTextProps) {
  return (
    <>
      <section className="w-full h-auto">
        <div className="text-white bg-black bg-opacity-50 mt-8 border-2 border-white px-6 py-10 rounded-3xl">
          <div className="border-l-8 border-blue-400 pl-8">
            <p className="text-4xl">{hone}</p>
            <p className="mt-6 text-2xl">{htwo}</p>
          </div>
          {content ? (
            <div className="w-[99%] h-1 bg-white bg-opacity-20 mx-auto my-12"></div>
          ) : (
            ''
          )}
          {content ? <div className="">{content}</div> : ''}
        </div>
      </section>
    </>
  );
}
