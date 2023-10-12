import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showStats } from "../../features/AllJobs/AllJobsSlice";
import StatsContainer from "../../Components/StatsContainer";
import ChartsContainer from "../../Components/ChartsContainer";

const Stats = () => {
  const { monthlyApplications } = useSelector((store) => store.allJobsState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats())
  },[])
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}
export default Stats