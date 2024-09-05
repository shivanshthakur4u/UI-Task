import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "./ConfirmationPopup";

interface TabsProps {
  challengeId:string;
}

const Tabs: React.FC <TabsProps>= ({challengeId}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [openConfirmation, setOpenConfirmation]=useState(false)
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="flex flex-col gap-8 pb-14">
            <p>
            Butterflies are the adult flying stage of certain insects belonging
            to an order or group called Lepidoptera. The word "Lepidoptera"
            means "scaly wings" in Greek. This name perfectly suits the insects
            in this group because their wings are covered with thousands of tiny
            scales overlapping in rows. 
          </p>
          <p>
            An agency of the Governmental Wildlife
            Conservation is planning to implement an automated system based on
            computer vision so that it can identify butterflies based on
            captured images. As a consultant for this project, you are
            responsible for developing an efficient model. 
          </p>
          <p>
            Your Task is to build
            an Image Classification Model using CNN that classifies to which
            class of weather each image belongs to.
          </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
   <>
    <div className="flex flex-col gap-11">
      <div
        className="flex justify-between bg-white border border-[#DDE6ED] 
      shadow-md shadow-[#DDE6ED] px-[119px] h-[66px]"
      >
        <div className=" flex items-end">
          <div className="pt-4">
            <ul className="flex">
              <li
                className={`cursor-pointer px-6 border-b-[4px] pb-2.5 font-inter text-lg 
            tracking-wider shadow-none rounded-none
                        ${
                          activeTab === "overview"
                            ? "border-[#44924C] font-bold"
                            : "text-gray-600"
                        }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-2.5 items-center">
          <button
            className=" border-[1.2px]  bg-[#44924C] rounded-[10px]
           px-6 h-[37px] text-white text-sm font-medium font-poppins w-[91px] "
           onClick={()=>navigate(`/challenge-edit/${challengeId}`)}
          >
            Edit
          </button>
          <button
            className=" border-[1.6px]  border-[#DC1414] rounded-[10px]
           px-6 h-[37px] text-[#DC1414] text-sm font-medium font-poppins w-[91px]"
           onClick={()=>setOpenConfirmation(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {/* content */}
      <p className="pl-[120px] text-[#64607D] font-poppins font-medium text-base tracking-[-2%] max-w-[1100px]">
        {renderContent()}
      </p>
    </div>
      <ConfirmationPopup 
      isOpen={openConfirmation}
      setOpen={setOpenConfirmation}
      deleteChallengeId={challengeId}
        />
   </>
  );
};

export default Tabs;
