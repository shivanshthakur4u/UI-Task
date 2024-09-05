import React from "react";
import { useChallengeContext } from "../context/ChallengeContext";
import { useNavigate } from "react-router-dom";

interface ConfirmationPopupProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteChallengeId: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  setOpen,
  deleteChallengeId,
}) => {
  const { deleteChallenge } = useChallengeContext();
  const navigate=useNavigate()
  const handleDelete = () => {
    deleteChallenge(deleteChallengeId);
    navigate("/")
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold font-poppins">
          Are you sure you want to delete?
        </h3>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 text-gray-500 bg-white border border-gray-500 hover:bg-gray-100  rounded-md  font-inter"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#DC1414] text-white rounded-md font-inter"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
