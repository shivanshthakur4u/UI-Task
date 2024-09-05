import { Challenge } from "../Types/types";
import ChallengeCard from "./ChallengeCard";

interface ChallengesListProps {
  challenges: Challenge[];
}

const ChallengesList: React.FC<ChallengesListProps> = ({ challenges }) => {
  return (
    <div className="py-[75px] flex items-center justify-center bg-primary">
      {challenges && challenges.length > 0 ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 gap-x-6 lg:gap-y-[50px] gap-y-8">
          {challenges &&
            challenges?.map((challenge: Challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
      ) : (
        <div className=" font-poppins text-lg text-white text-center">
          No Challeneges found!
        </div>
      )}
    </div>
  );
};

export default ChallengesList;
