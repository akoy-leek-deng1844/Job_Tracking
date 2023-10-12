import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { FormRow } from '../../Components/FormRow';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow } from '../../Components';
import FormRowSelect from '../../Components/FormRowSelect';
import { clearValues, createJob, editJob, handleJobInputs } from '../../features/AddJob/AddJobSlice';
import { useEffect } from 'react';


const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((state) => state.jobState);
  const { user } = useSelector((store) => store.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditing) {
        dispatch(handleJobInputs({ name: "jobLocation", value: user.location }));
    }
},[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobLocation || !company || !position) {
      toast.error('Please fill out all fields')
      return;
    }
    if (isEditing) {
      dispatch(editJob({ jobId: editJobId, job: { company, jobType, jobLocation, position, status } }))
      return;
    }
    dispatch(createJob({jobLocation, company, position, status, jobType}))

  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobInputs({name, value}))
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center" style={{ padding: "1rem" }}>
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job location"
            value={jobLocation}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          {/* JOB STATUS */}
          <FormRowSelect
            list={statusOptions}
            name="status"
            value={status}
            handleChange={handleChange}
          />
          {/* INTERVIEW STATUS */}

          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleChange}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting.." : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
export default AddJob