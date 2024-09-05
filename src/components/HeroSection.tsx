import RocketImage from "../assets/icons/PicsArt_04-14-04.42 1.svg";
import OverViewCard from "./OverViewCard";
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="bg-primary pt-[124px] pb-[90px] pl-[143px]">
        <div className="flex gap-24">
          <div className="flex gap-[52px] max-w-[705px]">
            <div className="bg-[#FFCE5C] h-28 w-2.5" />
            {/* heading */}
            <div className="flex flex-col gap-9">
              <h2 className=" text-5xl font-semibold font-poppins text-white">
                Accelerate Innovation with Global AI Challenges
              </h2>
              <p className="text-[#ECECEC] text-lg font-medium font-poppins pt-0.5">
                AI Challenges at DPhi simulate real-world problems. It is a
                great place to put your AI/Data Science skills to test on
                diverse datasets allowing you to foster learning through
                competitions.
              </p>
              <button
                className="text-primary w-fit bg-white font-poppins font-semibold rounded-[10px] text-lg leading-4 px-[18px] py-[15px]"
                color="inherit"
                onClick={() => navigate("/challenge-add")}
              >
                Create Challenge
              </button>
            </div>
          </div>
          {/* Image */}
          <div className="p-0">
            <img
              src={RocketImage}
              alt="rocket-image"
              className="w-[242px] h-[294px]"
            />
          </div>
        </div>
      </div>
      <OverViewCard />
    </section>
  );
};

export default HeroSection;
