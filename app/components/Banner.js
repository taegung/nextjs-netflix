"use client";

import Image from "next/image";

export default function Banner({ bannerData }) {
  return (
    <div className="relative h-[500px] w-full">
      <Image
        src={bannerData.image}
        alt={bannerData.title}
        fill
        objectFit="cover"
        priority
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90"></div>
      <div className="relative z-10 p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">{bannerData.title}</h1>
        <p className="mb-6">{bannerData.description}</p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-4 py-2 rounded">재생</button>
          <button className="bg-gray-800 px-4 py-2 rounded">상세 정보</button>
        </div>
      </div>
    </div>
  );
}
