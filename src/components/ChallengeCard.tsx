import { useNavigate } from "react-router-dom";
import CharmCircleTick from "../assets/icons/charm_circle-tick.svg";
import { Challenge } from "../Types/types";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useEffect, useState } from "react";
import { CapitaliseFirstLetter, trimText } from "../utils/utils";


interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const navigate = useNavigate();
  
  const GetTimeOfChallenges = (
    startDate: string,
    endDate: string,
    status: string
  ) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
    });

    useEffect(() => {
      const updateTime = () => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (status === "Active" || status === "Upcoming") {
          const targetDate = status === "Active" ? end : start;
          const days = differenceInDays(targetDate, currentDate);
          const hours = differenceInHours(targetDate, currentDate) % 24;
          const minutes = differenceInMinutes(targetDate, currentDate) % 60;

          setTimeLeft({
            days: Math.max(0, days),
            hours: Math.max(0, hours),
            minutes: Math.max(0, minutes),
          });
        }
      };

      // Update time every minute
      updateTime();
      const timerId = setInterval(updateTime, 60000);

      // Clean up interval on unmounts
      return () => clearInterval(timerId);
    }, [startDate, endDate, status]);

    if (status === "Past") {
      return (
        <div className="flex w-full pt-2.5">
          <span className="text-lg font-poppins font-semibold text-[#454545] text-center">
            {format(new Date(endDate), "do MMM''yy h:mm a")}
          </span>
        </div>
      );
    }

    if (status === "Active" || status === "Upcoming") {
      return (
        <div className="flex justify-between">
          <div className="text-lg font-poppins font-semibold text-[#454545]">
            {timeLeft.days.toString().padStart(2, "0")}
          </div>
          <div className="text-lg font-poppins font-semibold text-[#454545]">
            :
          </div>
          <div className="text-lg font-poppins font-semibold text-[#454545]">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-lg font-poppins font-semibold text-[#454545]">
            :
          </div>
          <div className="text-lg font-poppins font-semibold text-[#454545]">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="flex flex-col gap-6 w-[354px] h-[473px] rounded-2xl bg-white cursor-pointer"
      onClick={() => navigate(`/challenge-details/${challenge.id}`)}
    >
      <img src={challenge.image} alt="data-image" className="h-[174px] rounded-t-2xl" />
      <div className="flex flex-col gap-5 justify-center items-center px-[54px]">
        {/* status pill */}
        <div
          className={`w-[87px] ${
            challenge.status === "Upcoming"
              ? "bg-[#F2C94C40]"
              : challenge.status === "Past"
              ? "bg-[#FF3C002B]"
              : "bg-[#44924C3D]"
          } flex items-center justify-center 
         h-5 font-inter text-xs text-center rounded-md ${
           challenge.status === "Active" ? "text-[#44924C]" : "text-[#666666]"
         } font-semibold`}
        >
          {challenge.status}
        </div>
        {/* title */}
        <h5 className="text-base font-semibold font-poppins  text-center h-11">
          {trimText(CapitaliseFirstLetter(challenge.challenge_name).slice(0,45))}
        </h5>
        {/* start-in */}
        <div className="flex flex-col gap-1 pt-1">
          <p
            className={`font-poppins text-sm font-medium text-[#444444] text-center`}
          >
            {challenge.status === "Upcoming"
              ? "Starts in"
              : challenge.status === "Past"
              ? "Ended on"
              : "Ends in"}
          </p>
          <div className={`flex flex-col gap-0.5 ${challenge.status!=="Past" && 'w-[127px]'}`}>
            {GetTimeOfChallenges(
              challenge.challenge_startDate,
              challenge.challenge_endDate,
              challenge.status
            )}
            {challenge.status!=="Past" &&
              <div className="flex justify-between text-[10px] font-inter text-[#4F4F4F] leading-[10px] font-medium">
              <p>Days</p>
              <p>Hours</p>
              <p>Mins</p>
            </div>
            }
          </div>
        </div>
        <button className="mt-3 bg-[#44924C] px-5 py-3 flex items-center rounded-[10px] gap-4">
          <img src={CharmCircleTick} alt="circle-tick" />
          <span className=" text-sm font-semibold leading-[18px] text-white font-poppins">
            Participate Now
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
