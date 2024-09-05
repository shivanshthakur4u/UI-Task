import { useState } from "react";
import ChallengesList from "../components/ChallengesList";
import ExploreChallenges from "../components/ExploreChallenges";
import HeroSection from "../components/HeroSection";
import WhyAIChallenges from "../components/WhyAIChallenges";
import { useChallengeContext } from "../context/ChallengeContext";

const HomePage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const statusFilter = selectedFilters.filter((filter) =>
    ["All", "Upcoming", "Active", "Past"].includes(filter)
  );
  const levelFilters = selectedFilters.filter((filter) =>
    ["Easy", "Medium", "Hard"].includes(filter)
  );

  const { getChallenges } = useChallengeContext();

  const challenges = getChallenges(
    query,
    statusFilter.length > 0 ? statusFilter : undefined,
    levelFilters.length > 0 ? levelFilters : undefined
  );

  console.log("challenges:", challenges)
  return (
    <div>
      <HeroSection />
      <WhyAIChallenges />
      <ExploreChallenges
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        setQuery={setQuery}
        query={query}
      />
      <ChallengesList challenges={challenges} />
    </div>
  );
};

export default HomePage;
