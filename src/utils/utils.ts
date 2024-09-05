import { ChallengeStatus } from "../Types/types";

export const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomComponent}`;
  };
  

  export const CapitaliseFirstLetter = (sentence: string) => {
    const words = sentence.split(" ");
    const capitalisedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalisedWords.join(' ')
  }  


  export const getStatus = (now: Date, startDateString: string, endDateString: string): ChallengeStatus => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (now < startDate) {
      return "Upcoming";
    } else if (now >= startDate && now <= endDate) {
      return "Active";
    } else {
      return "Past";
    }
  };

  export const trimText = (text: string, length:number) => {
    const trimmedText = text.trim();
    return trimmedText.length > length ? `${trimmedText.slice(0, length)}...` : trimmedText;
  };
  