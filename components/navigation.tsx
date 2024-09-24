import AppsIcon from "@mui/icons-material/Apps";
import Link from "next/link";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../public/fonts/FellixTRIAL-Bold.CkQlcgMT.woff2",
});

export default function Navigation() {
  return (
    <div className="flex flex-row gap-2 min-h-[50px] h-[50px] z-10 sticky top-0 bg-[#003dff] text-white">
      <nav className="">
        <Link
          href={"#"}
          className="h-full w-[50px] flex items-center justify-center"
        >
          <AppsIcon />
        </Link>
      </nav>
      <div className="flex flex-row items-center justify-center">
        <h1 className={`${myFont.className} font-bold text-xl`}>OpenFaktura</h1>
      </div>
    </div>
  );
}
