import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useEffect } from "react";
import { getAllJobs } from "../features/AllJobs/AllJobsSlice";
import PageBtnContainer from "./PageBtnContainer";


const JobsContainer = () => {
    const {
      isLoading,
      jobs,
      numOfPages,
      totalJobs,
      search,
      searchStatus,
      searchType,
      sort,
      page
    } = useSelector((store) => store.allJobsState);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllJobs())
  },[sort, searchStatus, searchType, search, page]) 
  if (isLoading) {
        return <Loading/>
    }
    if (jobs.length === 0) {
        return (
          <Wrapper>
            <h2>There are no jobs to display...</h2>
          </Wrapper>
        );
    }
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
export default JobsContainer