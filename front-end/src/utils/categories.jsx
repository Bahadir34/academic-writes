import { PiSigmaThin } from "react-icons/pi";
import { TfiText } from "react-icons/tfi";
import { MdOutlineBiotech } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { GiChemicalDrop } from "react-icons/gi";
import { TfiThought } from "react-icons/tfi";
import { PiBooks } from "react-icons/pi";
import { MdHistoryEdu } from "react-icons/md";
import { CiMountain1 } from "react-icons/ci";
import { IoCodeSlash } from "react-icons/io5";

export const categoriesList = [
  { name: "Math", icon: <PiSigmaThin className="size-10" /> },
  { name: "Literature", icon: <TfiText className="size-10" /> },
  { name: "Biology", icon: <MdOutlineBiotech className="size-10" /> },
  { name: "Physic", icon: <BsGear className="size-10" /> },
  { name: "Chemistry", icon: <GiChemicalDrop className="size-10" /> },
  { name: "Philosophy", icon: <TfiThought className="size-10" /> },
  { name: "Religion", icon: <PiBooks className="size-10" /> },
  { name: "History", icon: <MdHistoryEdu className="size-10" /> },
  { name: "Geography", icon: <CiMountain1 className="size-10" /> },
  { name: "Software", icon: <IoCodeSlash className="size-10" /> },
];
