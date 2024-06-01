import AppsIcon from "@mui/icons-material/Apps";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex flex-row justify-between bg-black p-4 text-white">
      <p className="font-bold">InFaktura</p>
      <nav>
        <Link href={"/dashboard"}>
          <AppsIcon />
        </Link>
      </nav>
    </div>
  );
}
