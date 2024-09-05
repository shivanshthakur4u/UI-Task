import AiIcon from "../assets/icons/Group 1000002515.svg";
import DataScientistIcon from "../assets/icons/Group 1000002516.svg";
import HostedIcon from "../assets/icons/Group 1000002518.svg";
const overViewData = [
  {
    id: 1,
    title: "100K+",
    icon: AiIcon,
    description: "AI model submissions",
  },
  {
    id: 2,
    title: "50K+",
    icon: DataScientistIcon,
    description: "Data Scientists",
  },
  {
    id: 3,
    title: "100+",
    icon: HostedIcon,
    description: "AI Challenges hosted",
  },
];
const OverViewCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[200px] bg-secondary">
      <div className="flex gap-[88px]">
        {overViewData.map((item) => (
          <div className="flex gap-16 items-center" key={item.id}>
            <div className="flex gap-6 items-center">
              <div className="flex items-center justify-center rounded-2xl bg-[#F2F4FF] w-14 h-14">
                <img src={item.icon} alt={`${AiIcon}-icon`} />
              </div>
              {/* text */}
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl leading-5 text-white font-inter font-bold">
                  {item.title}
                </h4>
                <p className=" text-base leading-5 font-medium text-white font-inter">
                  {item.description}
                </p>
              </div>
            </div>
            {item.id !== overViewData.length && (
              <div className="bg-[#C4C4C4] h-9 w-[0.5px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverViewCard;
