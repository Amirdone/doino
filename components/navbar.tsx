import Navbarlink from "@/components/navbarLink";
import Navbarbuttomlink from "@/components/navbarbuttomlink";
const Navbar = () => {
  return (
    <nav className="bg-slate-100 h-24 flex justify-end items-center">
      <div className="container">
        <div className="flex justify-between">
          <Navbarlink />
          <Navbarbuttomlink />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
