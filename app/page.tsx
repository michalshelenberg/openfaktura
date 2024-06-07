// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <header className="w-dvw h-dvh flex">
      <div className="flex-1 flex flex-col items-center gap-8 p-4 justify-center">
        <p>Faktura online bez registrace a zcela zdarma</p>
        <Link
          href={"/editor"}
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          Přejít do aplikace
        </Link>
      </div>
      <div className="relative hidden flex-1 md:block">
        {/* <Image
          src={"/images/header_image.jpg"}
          alt=""
          fill
          objectFit="cover"
          priority
        /> */}
      </div>
    </header>
  );
}
