import { useState } from "react"
import Wrapper from "../assets/wrappers/ChartsContainer"
import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
    const [BarChart, setBarChart] = useState(true);
    const { monthlyApplications:data } = useSelector((store) => store.allJobsState);
  return (
    <Wrapper>
      <h5>Monthly Applications</h5>
      <button type="button" onClick={() => setBarChart(!BarChart)}>
        {BarChart ? "Area chart" : "Bar chart"}
      </button>
      {BarChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
}
export default ChartsContainer