// import Logo
const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-black text-white px-10 py-3 fixed w-full z-10">
      <div className="w-2/3 text-left text-4xl cursor-pointer">
        AudioDissect
      </div>
      <div className="flex justify-between list-none w-1/3 text-md font-semibold items-center">
        <li>How it works</li>
        <li>Pricing</li>
        <li>API</li>
        <div>
          <button className="bg-slate-800 px-4 py-2 rounded-xl mx-3">
            Signup
          </button>
          <button className="px-4 py-2 rounded-xl bg-white text-violet-950 mx-3">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
