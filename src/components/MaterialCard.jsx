import { RxDotFilled } from "react-icons/rx";
function MaterialCard({ name, icons, des, clr }) {
  return (
    <div >
      <section className="px-10 py-10 font-verdana ">
        <div className=" grid-cols-4 gap-6 flex">
          <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <span className="text-[12px] text-green-600 font-bold flex justify-end" >
              <RxDotFilled /> Accepted
            </span>

            <div className={`w-[45px] h-[45px] rounded-lg flex items-center justify-center text-white  ${clr}`}>
              {icons}
            </div>

            <h3 className="text-lg mb-1 font-bold font-[Verdana]">{name}</h3>

            <p className="text-sm text-[#444] font-sans ">
              {des}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MaterialCard;
