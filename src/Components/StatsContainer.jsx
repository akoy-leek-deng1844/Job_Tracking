import { useSelector } from "react-redux"
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = () => {
    const { stats } = useSelector((store) => store.allJobsState);
    const defaultStats = [
      {
        count: stats.pending || 0,
        title: "Jobs pending",
        icon: <FaSuitcaseRolling />,
        color: "#e9b949",
        bgc: "#fcefc7",
      },
      {
        count: stats.interview || 0,
        title: "Interviews scheduled",
        icon: <FaCalendarCheck />,
        color: "#647acb",
        bgc: "#e0e8f9",
      },
      {
        count: stats.declined || 0,
        title: "Jobs declined",
        icon: <FaBug />,
        color: "#d66a6a",
        bgc: "#ffeeee",
      },
    ];
  return (
      <Wrapper>
          {defaultStats.map((item, index) => {
              return <StatItem key={index} {...item} />
          })}
    </Wrapper>
  )
}
export default StatsContainer