import Navbarlink from "@/components/navbarLink";
import Navbarbuttomlink from "@/components/navbarbuttomlink";
const Navbar = () => {
  return (
    <nav className="bg-slate-100 h-24 flex  items-center fixed backdrop-blur-lg  z-50 shadow-md py-4  size-full mb-6">
      <div className="container ">
        <div className="flex justify-between">
          <Navbarlink />
          <Navbarbuttomlink />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
