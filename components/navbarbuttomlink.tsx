import Link from "next/link";

const Navbarbuttomlink = () => {
  return (
    <div>
      <Link
        href={"/login"}
        className="ml-5 text-l border border-slate-400 px-6 py-1 rounded-md  hover:bg-slate-500 bg-green-500 text-white"
      >
      ورود | عضویت
      </Link>
    </div>
  );
};
export default Navbarbuttomlink;
