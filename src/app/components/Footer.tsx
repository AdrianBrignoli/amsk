import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full bg-black text-white p-8">
      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <Link href="/asd">X_1</Link>
          <Link href="/asd">X_2</Link>
          <Link href="/asd">X_3</Link>
        </div>
        <div className="flex flex-col">
          <Link href="/asd">X_1</Link>
          <Link href="/asd">X_2</Link>
          <Link href="/asd">X_3</Link>
        </div>
        <div className="flex flex-col">
          <Link href="/asd">X_1</Link>
          <Link href="/asd">X_2</Link>
          <Link href="/asd">X_3</Link>
        </div>
      </div>
    </div>
  );
}
