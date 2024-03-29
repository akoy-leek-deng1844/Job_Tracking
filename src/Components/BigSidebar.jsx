import { useSelector } from "react-redux"
import Wrapper from "../assets/wrappers/BigSidebar"
import Logo from "./Logo"
import Navlinks from "./Navlinks";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.userState);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks/>
        </div>
      </div>
    </Wrapper>
  );
}
export default BigSidebar