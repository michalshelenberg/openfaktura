import AppsIcon from "@mui/icons-material/Apps";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex flex-row gap-2 bg-black h-[50px] text-white sticky top-0">
      <nav>
        <Link
          href={"#"}
          className="h-full w-[50px] flex items-center justify-center"
        >
          <AppsIcon />
        </Link>
      </nav>
      <div className="flex flex-row items-center justify-center">
        <h1 className="font-bold">OpenFaktura</h1>
      </div>
    </div>
  );
}
