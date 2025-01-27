import Calender from '../calender/Calender';
import { CalenderProps } from '@/app/misc/types';

export default function CalenderWithText({ setPosts }: CalenderProps) {
  return (
    <>
      <div className="flex text-2xl mb-8 text-center w-full rounded-2xl bg-gradient-to-r from-[#2C3093] to-[#EA5661]">
        <p className="p-2 w-full">Nyheter</p>
        <p className="p-2 w-full">Tävlingar</p>
      </div>
      <Calender setPosts={setPosts} />
    </>
  );
}
