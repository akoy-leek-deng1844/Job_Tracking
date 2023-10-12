import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../features/AllJobs/AllJobsSlice";

const PageBtnContainer = () => {
    const { page, numOfPages } = useSelector((store) => store.allJobsState);
    const dispatch = useDispatch();
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    })
    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = 1
        }
        dispatch(changePage(newPage))
    }
    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1) {
            newPage = numOfPages
        }
        dispatch(changePage(newPage))
    }
    return (
      <Wrapper>
        <button type="button" onClick={prevPage} className="prev-btn">
          <HiChevronDoubleLeft />
        </button>
        <div className="btn-container">
          {pages.map((pageNumber) => {
            return (
              <button
                type="button"
                    key={pageNumber}
                    onClick={()=>{dispatch(changePage(pageNumber))}}
                className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button type="button" onClick={nextPage} className="next-btn">
          <HiChevronDoubleRight />
        </button>
      </Wrapper>
    );
};
export default PageBtnContainer;
