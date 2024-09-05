
  
export interface Challenge {
  id: string;
  challenge_name: string;
  challenge_startDate: string;
  challenge_endDate: string;
  challenge_description: string;
  image: string;
  level_type: string;
  status:string;
}

export type ChallengeStatus = "Upcoming" | "Active" | "Past";