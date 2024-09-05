import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Challenge, ChallengeStatus } from "../Types/types";
import Image1 from "../assets/Images/Group 1000002771.png";
import Image2 from "../assets/Images/Group 1000002766.png";
import Image3 from "../assets/Images/Group 1000002767.png";
import Image4 from "../assets/Images/Group 1000002772.png";
import Image5 from "../assets/Images/Group 1000002773.png";
import Image6 from "../assets/Images/Group 1000002466.png";
import { getStatus } from "../utils/utils";
// Define the shape of context type
interface ChallengeContextType {
  challenges: Challenge[];
  addChallenge: (challenge: Challenge) => void;
  editChallenge: (id: string, updatedChallenge: Partial<Challenge>) => void;
  deleteChallenge: (id: string) => void;
  getChallenges: (
    query?: string,
    status?: string[],
    level?: string[]
  ) => Challenge[];
  getChallengesById: (id: string) => Challenge | undefined;
}

// Create a default context value
const defaultChallengeContext: ChallengeContextType = {
  challenges: [],
  addChallenge: () => {},
  editChallenge: () => {},
  deleteChallenge: () => {},
  getChallenges: () => [],
  getChallengesById: (id: string) => {
    return undefined;
  },
};

const defaultChallenges: Challenge[] = [
  {
    id: "1725533097624-894",
    challenge_name: "Data Science Bootcamp - Graded Datathon",
    challenge_startDate: "2024-09-16T22:30",
    challenge_endDate: "2024-09-20T17:00",
    challenge_description: `Identify the class to which each butterfly belongs to`,
    image: Image1,
    level_type: "Easy",
    status: "Upcoming",
  },
  {
    id: "1725533697624-894",
    challenge_name: "Data Sprint 72 - Butterfly Identification",
    challenge_startDate: "2024-09-08T03:00",
    challenge_endDate: "2024-09-20T03:00",
    challenge_description: `Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera.`,
    image: Image2,
    level_type: "Medium",
    status: "Upcoming",
  },
  {
    id: "1775533097624-894",
    challenge_name: "Data Sprint 71 - Weather Recognition",
    challenge_startDate: "2024-09-10T09:00",
    challenge_endDate: "2024-09-20T17:00",
    challenge_description: ` This name perfectly suits the insects in this group because their wings are covered.`,
    image: Image3,
    level_type: "Easy",
    status: "Active",
  },
  {
    id: "1727533097654-894",
    challenge_name: "Data Sprint 70-Airline Passenger Satisfaction",
    challenge_startDate: "2024-09-05T09:00",
    challenge_endDate: "2024-09-22T14:05",
    challenge_description: `Your Task is to build an Image Classification Model using CNN that classifies to which class of weather  each image belongs to.`,
    image: Image4,
    level_type: "Hard",
    status: "Active",
  },
  {
    id: "1725534097824-897",
    challenge_name: "Engineering Graduates Employment Outcomes",
    challenge_startDate: "2024-09-01T09:00",
    challenge_endDate: "2024-09-04T17:00",
    challenge_description: `As a consultant for this project, you are responsible for developing an efficient model..`,
    image: Image5,
    level_type: "Medium",
    status: "Past",
  },
  {
    id: "17267533097674-894",
    challenge_name: "Travel Insurance Claim Prediction",
    challenge_startDate: "2024-08-01T09:00",
    challenge_endDate: "2024-09-01T12:00",
    challenge_description: ` The word "Lepidoptera" means "scaly wings" in Greek. `,
    image: Image6,
    level_type: "Hard",
    status: "Past",
  },
];

// Create the context
const ChallengeContext = createContext<ChallengeContextType>(
  defaultChallengeContext
);

// Create a provider component
export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    // checking stored challenges on localstorage
    const storedChallenges = localStorage.getItem("challenges");
    return storedChallenges ? JSON.parse(storedChallenges) : defaultChallenges;
  });

  // Check every minute
  useEffect(() => {
    const timer = setInterval(() => {
      updateChallengeStatuses();
    }, 60000);
    return () => clearInterval(timer);
  }, [challenges]);

  const updateChallengeStatuses = () => {
    const now = new Date();
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        const newStatus = getStatus(
          now,
          challenge.challenge_startDate,
          challenge.challenge_endDate
        );
        if (newStatus !== challenge.status) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  // Add  new challenge
  const addChallenge = (challenge: Challenge) => {
    console.log(
      "Challenge received in context:",
      JSON.stringify(challenge, null, 2)
    );
    console.log(
      "Image data received:",
      challenge.image.substring(0, 50) + "..."
    );

    // Create a new challenge object without modifying the original
    const newChallenge: Challenge = {
      ...challenge,
      image: challenge.image,
    };

    setChallenges((prevChallenges) => [...prevChallenges, newChallenge]);
  };

  // Edit an challenge
  const editChallenge = (id: string, updatedChallenge: Partial<Challenge>) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === id ? { ...challenge, ...updatedChallenge } : challenge
      )
    );
  };

  // Delete a challenge
  const deleteChallenge = (id: string) => {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== id)
    );
  };

  // get challenges by Id

  const getChallengesById = (id: string): Challenge | undefined => {
    return challenges.find((challenge) => challenge.id === id);
  };

  const getChallenges = (
    query?: string,
    status?: string[],
    level?: string[]
  ) => {
    return challenges
      .filter((challenge) => {
        const statusMatches =
          !status ||
          status.includes("All") ||
          status.includes(challenge.status);
        const levelMatches = !level || level.includes(challenge.level_type);
        const queryMatches =
          !query ||
          challenge.challenge_name.toLowerCase().includes(query.toLowerCase());
        return statusMatches && levelMatches && queryMatches;
      })
      .sort((a, b) => {
        const statusOrder: Record<ChallengeStatus, number> = {
          Upcoming: 1,
          Active: 2,
          Past: 3,
        };
        return (
          statusOrder[a.status as ChallengeStatus] -
          statusOrder[b.status as ChallengeStatus]
        );
      });
  };

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        addChallenge,
        editChallenge,
        deleteChallenge,
        getChallenges,
        getChallengesById,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

// Custom hook to use the ChallengeContext
export const useChallengeContext = () => useContext(ChallengeContext);
