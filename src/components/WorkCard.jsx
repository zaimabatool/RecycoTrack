import React from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
function WorkCard() {
  return (
    <div>
    {/* <div className="w-full font-verdana"> */}
  <section className="max-w-[1280px] w-full px-10 py-10 mx-auto text-center bg-white font-bold">

    <div className=" grid-cols-4 gap-6 flex">
      
      {/* Upload Photo Card */}
      <div className="bg-[#f9fefe] rounded-xl p-5 border border-[#e2efec]">
        
        <div className="flex justify-center mb-3">
          <div className="w-[45px] h-[45px] rounded-lg text-white bg-[rgb(62,62,238)] flex items-center justify-center">
            <IoCloudUploadSharp /> 
          </div>
        </div>

        <h3 className="text-lg mb-1 font-bold font-[Verdana]">
          Upload Photo
        </h3>

        <p className="text-sm text-[#444] font-sans">
          Take clear photos of your scrap materials and upload them to our platform
        </p>

      </div>
    </div>
  </section>
</div>

    // </div>
  );
}

export default WorkCard;
