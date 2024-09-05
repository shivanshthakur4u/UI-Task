import { format } from "date-fns";
import { useRef, useState } from "react";
import calendarIcon from "../assets/icons/uil_calender.svg";
import UploadIcon from "../assets/icons/bxs_cloud-upload.svg";
import ImageIcon from "../assets/icons/bi_image-fill.svg";
import RightArrowIcon from "../assets/icons/Right_arrow.svg";
import { Challenge } from "../Types/types";
import { useChallengeContext } from "../context/ChallengeContext";
import { useNavigate, useParams } from "react-router-dom";
import { generateUniqueId, getStatus } from "../utils/utils";

interface ChallengeFormProps {
  isEditMode: boolean;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({ isEditMode }) => {
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
 
  const params = useParams<{ id: string }>();
  const { getChallengesById } = useChallengeContext();
  const editData = params.id ? getChallengesById(params.id) : undefined;
  const [challengeData, setChallengeData] = useState<
    Omit<Challenge, "id" | "status">
  >({
    challenge_name: isEditMode ? editData?.challenge_name || "" : "",
    challenge_startDate: isEditMode ? editData?.challenge_startDate || "" : "",
    challenge_endDate: isEditMode ? editData?.challenge_endDate || "" : "",
    challenge_description: isEditMode
      ? editData?.challenge_description || ""
      : "",
    level_type: isEditMode ? editData?.level_type || "" : "Easy",
    image: isEditMode ? editData?.image || "" : "",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(challengeData.image);
  // tracking error in form
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const ImageRef = useRef<HTMLInputElement | null>(null);
  const { addChallenge, editChallenge } = useChallengeContext();
  const navigate = useNavigate();

  // image input click
  const handleClick = () => {
    ImageRef.current?.click();
  };

  // handle date change and set it
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      const date = new Date(selectedValue);
      const formattedDate = format(date, "do MMM''yy hh:mm a");
      setter(formattedDate);
    } else {
      setter("");
    }
  };

  // handle image change

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setChallengeData((prevData) => ({
          ...prevData,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // form data change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setChallengeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // form validation check

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!challengeData.challenge_name)
      newErrors.challenge_name = "Challenge Name is required.";
    if (!challengeData.challenge_startDate)
      newErrors.challenge_startDate = "Start Date is required.";
    if (!challengeData.challenge_endDate)
      newErrors.challenge_endDate = "End Date is required.";
    if (!challengeData.challenge_description)
      newErrors.challenge_description = "Description is required.";
    if (!challengeData.level_type)
      newErrors.level_type = "Level Type is required.";
    if (!selectedImage) newErrors.image = "Image is required.";
    if (
      new Date(challengeData.challenge_startDate) >
      new Date(challengeData.challenge_endDate)
    ) {
      newErrors.challenge_endDate = "End Date must be after Start Date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", challengeData);
      const now = new Date();
      if (!isEditMode && selectedImage) {
        const newChallenge: Challenge = {
          id: generateUniqueId(),
          status: getStatus(
            now,
            challengeData.challenge_startDate,
            challengeData.challenge_endDate
          ),
          ...challengeData,
        };
        addChallenge(newChallenge);
        navigate("/");
      } else {
        if(params.id){
          editChallenge(params.id, challengeData);
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-[#F8F9FD] py-9 px-[89px] ">
        <h6 className="text-2xl font-bold font-inter leading-7">
          Challenge Details
        </h6>
      </div>
      {/* form */}
      <form
        className="space-y-[34px] px-[89px] pb-[89px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <label className="text-base font-medium leading-5 text-[#333333] font-inter">
            Challenge Name
          </label>
          <input
            className="border border-[#B7B7B7] w-[453px] rounded-md h-10
             text-[#444444] text-base font-medium font-inter leading-5 focus:outline-none px-4"
            name="challenge_name"
            onChange={handleChange}
            value={challengeData.challenge_name}
          />
          {errors.challenge_name && (
            <p className="text-red-500 text-sm">{errors.challenge_name}</p>
          )}
        </div>
        {/* start date */}
        <div className="flex flex-col gap-5 w-[453px]">
          <label className="text-base font-medium leading-5 text-[#333333] font-inter">
            Start Date
          </label>
          <div className="relative">
            <input
              className="border border-[#B7B7B7] w-[453px] rounded-md h-10 
                text-[#444444] text-base font-medium font-inter leading-5 focus:outline-none px-4"
              type="text"
              value={isEditMode ? format(challengeData.challenge_startDate, "do MMM''yy hh:mm a") : startDateTime}
              readOnly
              placeholder="Add start date"
            />
            <input
              className="absolute inset-0 opacity-0 pr-6"
              type="datetime-local"
              onChange={(e) => {
                handleDateChange(e, setStartDateTime);
                handleChange(e);
              }}
              style={{ zIndex: 1 }}
              value={challengeData.challenge_startDate}
              name="challenge_startDate"
            />
            <span className="absolute top-[7px] right-6 w-6 h-6 bg-white">
              <button type="button">
                <img src={calendarIcon} alt="icon-image" />
              </button>
            </span>
          </div>
          {errors.challenge_startDate && (
            <p className="text-red-500 text-sm">{errors.challenge_startDate}</p>
          )}
        </div>
        {/* end date */}
        <div className="flex flex-col gap-5 w-[453px]">
          <label className="text-base font-medium leading-5 text-[#333333] font-inter">
            End Date
          </label>
          <div className="relative">
            <input
              className="border border-[#B7B7B7] w-[453px] rounded-md h-10 
                text-[#444444] text-base font-medium font-inter leading-5 focus:outline-none px-4"
              type="text"
           
              readOnly
              placeholder="Add end date"
              value={isEditMode ? format(challengeData.challenge_endDate, "do MMM''yy hh:mm a") : endDateTime}
            />
            <input
              className="absolute inset-0 opacity-0 pr-6"
              type="datetime-local"
              name="challenge_endDate"
              onChange={(e) => {
                handleDateChange(e, setEndDateTime);
                handleChange(e);
              }}
              value={challengeData.challenge_endDate}
              style={{ zIndex: 3 }}
            />
            <span className="absolute top-[7px] right-6 w-6 h-6 bg-white">
              <button type="button">
                <img src={calendarIcon} alt="icon-image" />
              </button>
            </span>
          </div>
          {errors.challenge_endDate && (
            <p className="text-red-500 text-sm">{errors.challenge_endDate}</p>
          )}
        </div>
        {/* description */}
        <div className="flex flex-col gap-5">
          <label className="text-base font-medium leading-5 text-[#333333] font-inter">
            Description
          </label>
          <textarea
            className="border border-[#B7B7B7] rounded-md
             text-[#444444] text-base font-medium font-inter resize-none leading-5 focus:outline-none
              px-5 py-5 h-[252px] w-[817px]"
            name="challenge_description"
            onChange={handleChange}
            value={challengeData.challenge_description}
          />
          {errors.challenge_description && (
            <p className="text-red-500 text-sm">
              {errors.challenge_description}
            </p>
          )}
        </div>
        {/* image select */}
        <div className="flex flex-col gap-5">
          <label className="text-base font-medium leading-5 text-[#333333] font-inter">
            Image
          </label>
          <input
            className="hidden "
            type="file"
            ref={ImageRef}
            onChange={(e) => {
              handleImageChange(e);
              handleChange(e);
            }}
            accept="image/*"
            name="image"
           
          />
          {!selectedImage && (
            <button
              type="button"
              className="border flex items-center border-[#D9D9D9] bg-[#F4F4F4] rounded-md px-[73px] py-3 w-fit 
         h-12 text-lg font-medium text-[#666666] font-inter"
              onClick={handleClick}
            >
              Upload
              <img src={UploadIcon} alt="upload-icon" className="pl-1" />
            </button>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
          {selectedImage && (
            <div className=" border border-[#F8F9FD] p-5 rounded-[10px] bg-[#F8F9FD] flex flex-col gap-7 w-fit">
              <img
                src={selectedImage}
                alt="selected-image"
                className=" w-[249px] h-[123px] rounded-2xl"
              />
              <div className="flex gap-1.5 items-center pb-2">
                <img src={ImageIcon} alt="image-icon" />
                <div
                  className="text-[#44924C] text-sm font-medium gap-1
                flex font-inter items-center cursor-pointer"
                  onClick={handleClick}
                >
                  <span> Change image</span>
                  <img
                    src={RightArrowIcon}
                    alt="rightArrow-icon"
                    className=" w-2.5 h-2.5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/*  level select */}
        <div className="flex flex-col gap-5 pb-5">
          <label className="text-base font-medium leading-5 text-[#333333] font-inter">
            Level Type
          </label>
          <select
            className="border border-[#B7B7B7] w-[236px] rounded-md px-5 py-2.5 
         focus:outline-none text-sm font-medium font-inter text-[#333333]  custom-select"
            name="level_type"
            onChange={handleChange}
            value={challengeData.level_type}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.level_type && (
            <p className="text-red-500 text-sm">{errors.level_type}</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-[10px]  bg-[#44924C] px-[18px] text-lg font-inter  leading-6 text-white h-[46px] w-[214px]"
        >
          {isEditMode ? "Save Changes" : "Create Challenge"}
        </button>
      </form>
    </div>
  );
};

export default ChallengeForm;
