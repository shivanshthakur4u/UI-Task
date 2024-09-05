import CarbonNoteBook from "../assets/icons/carbon_notebook-reference.svg";
import CommunityIcon from "../assets/icons/Vector.svg";
import RobotIcon from "../assets/icons/Robot.svg";
import IdentificationCardIcon from "../assets/icons/IdentificationCard.svg";

const Data = [
  {
    id: 1,
    icon: CarbonNoteBook,
    iconSize: ["43px", "43px"],
    title: "Prove your skills",
    description:
      "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
  },
  {
    id: 2,
    icon: CommunityIcon,
    iconSize: ["39px", "30px"],
    title: "Learn from community",
    description:
      "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
  },
  {
    id: 3,
    icon: RobotIcon,
    title: "Challenge yourself",
    iconSize: ["47px", "47px"],
    description:
      "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
  },
  {
    id: 4,
    icon: IdentificationCardIcon,
    title: "Earn recognition",
    iconSize: ["55px", "55px"],
    description:
      "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
  },
];

const WhyAIChallenges: React.FC = () => {
  return (
    <section className=" py-[90px] px-40 flex flex-col gap-[72px] justify-center items-center">
      <h3 className="text-center text-[32px] font-poppins font-semibold leading-5">
        Why Participate in{" "}
        <span className="text-[#44924C]">AI Challenges?</span>
      </h3>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[35px] gap-y-[37px] ">
        {Data.map((item) => (
          <div
            className="lg:w-[553px] h-[276px] w-full rounded-[20px] bg-[#F8F9FD] px-8 py-[59px]"
            key={item.id}
          >
            <div className="flex flex-col gap-[5px]">
              <img
                src={item.icon}
                alt="icon"
                style={{
                  width: item.iconSize[0],
                  height: item.iconSize[1],
                }}
              />
              <h5 className=" text-2xl font-semibold leading-[50px] tracking-[-3%] font-poppins">
                {item.title}
              </h5>
              <p className="text-base font-medium font-poppins text-[#64607D] tracking-[-2%]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAIChallenges;
