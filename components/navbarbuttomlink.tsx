import Link from "next/link";

const Navbarbuttomlink = () => {
  return (
    <div>
      <Link
        href={"/login"}
        className="ml-5 text-l border border-slate-400 px-6 py-1 rounded-md bg-slate-200 hover:bg-slate-500"
      >
        ورود
      </Link>
    </div>
  );
};
export default Navbarbuttomlink;
