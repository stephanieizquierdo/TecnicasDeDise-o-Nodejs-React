import { NavLink } from "react-router-dom";


export default function Navbar() {
  return (
    <div style={{ flex: 1, flexDirection: "row"}}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => localStorage.clear()}
          >
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
