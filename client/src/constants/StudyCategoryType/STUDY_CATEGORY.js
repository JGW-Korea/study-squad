import {
  FaChartLine,
  FaLanguage,
  FaAddressCard,
  FaMusic,
  FaFootball,
  FaComputer,
} from "react-icons/fa6";

export const STUDY_CATEGORY = [
  {
    url: "경제%2F재테크",
    title: "경제/재테크",
    icon: (
      <FaChartLine size={60} color="#c38e67" style={{ marginBottom: "15px" }} />
    ),
  },
  {
    url: "어학%2F외국어",
    title: "어학/외국어",
    icon: (
      <FaLanguage size={60} color="#7ea7d0" style={{ marginBottom: "15px" }} />
    ),
  },
  {
    url: "취업%2F자격증",
    title: "취업/자격증",
    icon: (
      <FaAddressCard
        size={60}
        color="#37d6ac"
        style={{ marginBottom: "15px" }}
      />
    ),
  },
  {
    url: "음악",
    title: "음악",
    icon: (
      <FaMusic size={60} color="#57beea" style={{ marginBottom: "15px" }} />
    ),
  },
  {
    url: "스포츠",
    title: "스포츠",
    icon: (
      <FaFootball size={60} color="#feba50" style={{ marginBottom: "15px" }} />
    ),
  },
  {
    url: "IT%2F컴퓨터",
    title: "IT/컴퓨터",
    icon: (
      <FaComputer size={60} color="#e8543b" style={{ marginBottom: "15px" }} />
    ),
  },
];
