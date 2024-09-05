import React, { SetStateAction, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon.svg";
import SearchIcon from "../assets/icons/carbon_search.svg";
import DownArrow from "../assets/icons/Caret.svg";

interface ExploreChallengesProps {
  setSelectedFilters: React.Dispatch<SetStateAction<string[]>>;
  selectedFilters: string[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
}

const ExploreChallenges: React.FC<ExploreChallengesProps> = ({
  setSelectedFilters,
  selectedFilters,
  setQuery,
  query,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // console.log("query:", e.target.value);
  };

  return (
    <section className="bg-secondary flex flex-col gap-16 py-[75px] items-center justify-center w-full">
      <h2 className="text-[28px] font-poppins font-semibold leading-10 text-center text-white">
        Explore Challenges
      </h2>
      {/* Searchbar and Filter */}
      <div className="flex flex-col gap-4 relative w-full  max-w-[964px]">
        <div className="flex gap-6 flex-col lg:flex-row max-lg:px-6">
          <label className="w-full bg-white flex rounded-xl h-12 items-center px-9 gap-3 lg:min-w-[829px]">
            <img
              src={SearchIcon}
              alt="search-icon"
              className="w-4 h-4 cursor-pointer"
            />
            <input
              className="placeholder:text-[#858585] placeholder:font-inter
              placeholder:leading-5 placeholder:font-light w-full focus:outline-none"
              placeholder="Search"
              onChange={handleChange}
            />
          </label>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={open ? handleClose : handleOpen}
              className={`font-inter flex items-center justify-between 
                h-12 relative z-50  bg-white text-black rounded-xl text-lg font-normal pl-5 pr-2 border border-[#EAEAEA] ${
                  open
                    ? "rounded-t-[10px] w-72 rounded-b-none pt-3 pr-4"
                    : "rounded-xl w-28"
                }`}
            >
              Filter
              <img
                src={DownArrow}
                alt="arrow-icon"
                className={`pr-2 transform transition-transform duration-300 ${open ? "rotate-180 pr-2" : "rotate-0"}`}
              />
            </button>

            {/* Filter Dropdown */}
            {open && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={handleClose}
                ></div>

                {/* Dropdown Menu */}
                <div className="absolute sm:right-0 max-lg:left-0 top-[98%] bg-white z-50 px-3 pb-5 rounded-b-[10px] shadow-lg w-72">
                  <div className="bg-[#ECECEC] w-full h-[1px] mt-3" />
                  <div className="mt-4 px-3">
                    <h4 className="text-[#666666] font-inter text-base leading-5">
                      Status
                    </h4>
                    <ul className="mt-3.5 space-y-2">
                      {["All", "Active", "Upcoming", "Past"].map((status) => (
                        <li key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            id={status.toLowerCase()}
                            checked={selectedFilters.includes(status)}
                            onChange={() => toggleFilter(status)}
                            className="border border-[#003145] h-[15px] w-[15px]"
                          />
                          <label
                            htmlFor={status.toLowerCase()}
                            className="ml-2.5 text-[#858585] text-sm font-inter leading-6"
                          >
                            {status}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-[#ECECEC] w-full h-[1px] mt-3.5" />
                    <h4 className="text-[#666666] font-inter text-base leading-5 mt-4">
                      Level
                    </h4>
                    <ul className="mt-3.5 space-y-2">
                      {["Easy", "Medium", "Hard"].map((level) => (
                        <li key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            id={level.toLowerCase()}
                            checked={selectedFilters.includes(level)}
                            onChange={() => toggleFilter(level)}
                            className="border border-[#003145] h-[15px] w-[15px]"
                          />
                          <label
                            htmlFor={level.toLowerCase()}
                            className="ml-2.5 text-[#858585] text-sm font-inter leading-6"
                          >
                            {level}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Selected Filters */}
        <div className="flex flex-wrap gap-7 px-6">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center bg-[#F8F9FD7D] font-medium font-poppins py-2.5 px-5 rounded-full text-white"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-2 hover:text-red-600"
              >
                <img src={CloseIcon} alt="close-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreChallenges;
