'use client';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';

export default function Hero() {
  return (
    <>
      <Parallax speed={0}>
        <Image src="/alps.jpg" alt="Ski Logo" width={1920} height={1080} />;
      </Parallax>
    </>
  );
}
