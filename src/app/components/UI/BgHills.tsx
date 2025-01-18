'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BgHills() {
  const mountain1Ref = useRef<HTMLImageElement>(null);
  const mountain2Ref = useRef<HTMLImageElement>(null);
  const mountain3Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1 } });

    tl.fromTo(
      mountain1Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: 'bounce', delay: 0.5 }
    )
      .fromTo(
        mountain2Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'bounce' },
        '-=0.5'
      )
      .fromTo(
        mountain3Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'bounce' },
        '-=0.5'
      );
  }, []);

  /*

      
  */

  return (
    <div className="-z-10 absolute w-full h-full overflow-hidden">
      <img
        ref={mountain1Ref}
        src="/mountain-1.svg"
        alt="mountain"
        className="absolute w-full h-1/5 -bottom-16 -right-[5em]"
      />
      <img
        ref={mountain2Ref}
        src="/mountain-2.svg"
        alt="mountain"
        className="absolute w-full -bottom-4 -right-[20em] -z-20"
      />
      <img
        ref={mountain3Ref}
        src="/mountain-3.svg"
        alt="mountain"
        className="absolute w-full h-1/5 -bottom-4 -left-[30em] -z-20"
      />
    </div>
  );
}
