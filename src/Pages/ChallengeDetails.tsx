import ClockIcon from "../assets/icons/clockIcon.svg";
import SkillIconBasic from "../assets/icons/carbon_skill-level-basic.svg";
import SkillIconMedium from "../assets/icons/medium-skill-level.svg";
import SkillIconHard from "../assets/icons/Hard-skill-level.svg";
import Tabs from "../components/Tabs";
import { useParams } from "react-router-dom";
import { useChallengeContext } from "../context/ChallengeContext";
import { format } from "date-fns";
import { CapitaliseFirstLetter, trimText } from "../utils/utils";

const ChallengeDetails: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { getChallengesById } = useChallengeContext();
  const challengeData = params.id ? getChallengesById(params.id) : undefined;
  console.log("dayta received:", challengeData);

  const formatChallengeDate = () => {
    if (!challengeData) return "";

    const { challenge_startDate, challenge_endDate, status } = challengeData;
    const startDate = new Date(challenge_startDate);
    const endDate = new Date(challenge_endDate);

    const startDateFormatted = format(startDate, "do MMM''yy hh:mm a");
    const endDateFormatted = format(endDate, "do MMM''yy hh:mm a");

    switch (status) {
      case "Upcoming":
        return `Starts on ${startDateFormatted}`;
      case "Active":
        return `Ongoing - until ${endDateFormatted}`;
      case "Past":
        return `Ended on ${endDateFormatted}`;
      default:
        return "";
    }
  };

  return (
    <>
      <div className="bg-primary sm:py-24 py-10 sm:px-32 px-8 flex flex-col gap-6">
        {/* challenge time details */}
        <div className="py-2.5 bg-[#FFCE5C] rounded-md px-[22px] flex gap-2.5 items-center w-fit">
          <img src={ClockIcon} alt="clock-icon" />
          <p className="text-sm font-semibold font-inter leading-3 flex gap-1">
            {challengeData && formatChallengeDate()} <span className="sm:block hidden">(India Standard Time)</span>
          </p>
        </div>
        {/* challenge title */}
        <div className=" flex flex-col gap-7">
          <h4 className="text-[40px] font-semibold font-poppins leading-[48px] text-white">
            {challengeData &&
              trimText(CapitaliseFirstLetter(challengeData?.challenge_name), challengeData.challenge_name.length)}
          </h4>
          <p className="text-lg font-medium text-[#F8F9FD] font-inter leading-6">
            {challengeData && challengeData.challenge_description}
          </p>
        </div>
        {/* level */}
        {challengeData && (
          <div className="bg-[#F8F9FD] rounded-md py-2 px-5 w-fit flex gap-2 items-center">
            <img
              src={
                challengeData.level_type === "Easy"
                  ? SkillIconBasic
                  : challengeData.level_type === "Medium"
                  ? SkillIconMedium
                  : SkillIconHard
              }
              alt="icon-iage"
              className="h-[18px] w-[18px]"
            />
            <p className=" text-primary text-sm font-semibold font-inter leading-3">
              {challengeData && challengeData.level_type}
            </p>
          </div>
        )}
      </div>
      {/* tabs  with edit/delete button*/}
     {
        challengeData &&  <Tabs challengeId={challengeData?.id}/>
     }
   
    </>
  );
};

export default ChallengeDetails;
