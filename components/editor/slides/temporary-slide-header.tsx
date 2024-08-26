"use client";

import { MdArrowBack } from "react-icons/md";
import { useSwiper } from "swiper/react";

export default function TemporarySlideHeader({ title }: { title: string }) {
  const swiper = useSwiper();

  return (
    <div className="flex flex-row items-center sticky justify-between top-0 pr-2 bg-blue-700 text-white h-[50px] z-10">
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={() => {
            swiper.slidePrev();
          }}
          className="flex items-center h-[50px] w-[50px] justify-center hover:bg-white/15 duration-300 text-white"
        >
          <MdArrowBack size={24} />
        </button>
        <p className="font-bold">{title}</p>
      </div>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className="px-3 py-1.5 bg-white/25 hover:bg-white/30 duration-300 text-white rounded"
      >
        Pokračovat
      </button>
    </div>
  );
}
