"use client";

import { MdArrowBack } from "react-icons/md";
import { useSwiper } from "swiper/react";

export default function TemporarySlideHeader({ title }: { title: string }) {
  const swiper = useSwiper();

  return (
    <div className="sticky top-0 z-10 flex h-[50px] flex-row items-center justify-between bg-blue-700 pr-2 text-white">
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => {
            swiper.slidePrev();
          }}
          className="flex h-[50px] w-[50px] items-center justify-center text-white duration-300 hover:bg-white/15"
        >
          <MdArrowBack size={24} />
        </button>
        <p className="font-bold">{title}</p>
      </div>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className="rounded bg-white/25 px-3 py-1.5 text-white duration-300 hover:bg-white/30"
      >
        Pokračovat
      </button>
    </div>
  );
}
