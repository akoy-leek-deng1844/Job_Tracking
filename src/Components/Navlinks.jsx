import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Navlinks = ({togglesidebar}) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link"
            }}
            onClick={togglesidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
export default Navlinks