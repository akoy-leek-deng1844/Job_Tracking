import { useDispatch, useSelector } from 'react-redux';
import FormRow  from '../Components/FormRow';
import FormRowSelect from '../Components/FormRowSelect';
import Wrapper from '../assets/wrappers/SearchContainer';
import { clearFilters, handleChange } from '../features/AllJobs/AllJobsSlice';
import { useState, useMemo } from 'react';
const FilterContainer = () => {
  const [localSearch, setLocalSearch] = useState('');

  const {search, searchStatus, searchType, sort, sortOptions, isLoading } = useSelector((store) => store.allJobsState);
  const { statusOptions, jobTypeOptions } = useSelector(
    (store) => store.jobState
  );
  const dispatch = useDispatch();

 const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  
  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearInterval(timeoutId) 
     timeoutId = setTimeout(() => {
            dispatch(
              handleChange({ name: e.target.name, value: e.target.value })
            );

      },1000)
    }
  }
const optimizedDebounce = useMemo(()=>debounce(),[])
 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('')
    dispatch(clearFilters())
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            name="search"
            type="text"
            handleChange={optimizedDebounce}
            value={localSearch}
          />
          <FormRowSelect
            name="searchStatus"
            labelText="status"
            value={searchStatus}
            list={["all", ...statusOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="searchType"
            labelText="status"
            value={searchType}
            list={["all", ...jobTypeOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSearchSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default FilterContainer