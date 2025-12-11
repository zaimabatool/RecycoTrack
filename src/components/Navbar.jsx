import { useNavigate } from "react-router-dom";
import logo from "./../assets/assets/images/recycle.png";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full p-1 fixed">
        <div className="max-w-[1280px] w-full h-[70px] flex items-center justify-between mx-auto px-3 bg-white">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src={logo}
              alt="RecycoTrack Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="font-bold font-[Verdana] text-[#082b5c] text-xl">
                RecycoTrack
              </p>
              <p className="font-[Arial] text-teal-800 text-sm">
                Smart Scrap Selling
              </p>
            </div>
          </div>

          {/* Navigation (Desktop) */}
          <div className="flex gap-8 items-center w-[60%]">
            <div className="flex w-[80%] items-center justify-around px-1 transition-all duration-200">
              <button onClick={() => navigate('/')} className="text-[#082b5c] hover:text-[#0CAEA0] bg-transparent border-none cursor-pointer">
                Home
              </button>
              <button onClick={() => navigate('/rate-list')} className="text-[#082b5c] hover:text-[#0CAEA0] bg-transparent border-none cursor-pointer">
                Rate List
              </button>
              <button onClick={() => navigate('/coming-soon')} className="text-[#082b5c] hover:text-[#0CAEA0] bg-transparent border-none cursor-pointer">
                How It Work
              </button>
              <button onClick={() => navigate('/about-us')} className="text-[#082b5c] hover:text-[#0CAEA0] bg-transparent border-none cursor-pointer">
                About Us
              </button>
              <button onClick={() => navigate('/coming-soon')} className="text-[#082b5c] hover:text-[#0CAEA0] bg-transparent border-none cursor-pointer">
                Contact Us
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="h-10 w-[70px] rounded-lg bg-transparent hover:bg-[#025952] hover:text-white transition-all duration-200"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="h-10 w-[70px] rounded-lg bg-[#0e9d90] text-white hover:bg-[#025952] transition-all duration-200"
              >
                SignUp
              </button>
            </div>

            {/* Menu Icon (mobile) */}
            <i className="fa-solid fa-list hidden"></i>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Navbar;
