import { ReactNode } from 'react';

interface HeaderTextProps {
  hone: string;
  htwo: string;
  content?: ReactNode;
}

export default function HeaderText({ hone, htwo, content }: HeaderTextProps) {
  return (
    <>
      <section className="flex flex-col w-full h-full">
        <div className="text-white bg-black bg-opacity-50 px-6 py-14 mt-20 h-1/3">
          <div className="w-[1300px] mx-auto">
            <div className="flex flex-col space-y-2">
              <p className="text-4xl">{hone}</p>
              <p className="text-2xl text-gray-400">{htwo}</p>
            </div>
            {content ? (
              <div className="w-[99%] h-1 bg-white bg-opacity-20 mx-auto my-12"></div>
            ) : (
              ''
            )}
            {content ? <div className="">{content}</div> : ''}
          </div>
        </div>
      </section>
    </>
  );
}
