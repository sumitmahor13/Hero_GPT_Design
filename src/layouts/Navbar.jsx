import { PiStarFill } from "react-icons/pi";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-white text-black page-shadow h-12 fixed z-5 w-full">
        <div className="w-full px-2 flex items-center mx-auto justify-end">
          <button className="flex gap-1 items-center px-5 py-1 rounded-full bg-black text-white"><PiStarFill className="text-yellow-400"/>Upgrade</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
