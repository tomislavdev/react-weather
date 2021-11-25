import React from "react";
import './navigation.sass'
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <ul className="nav">
      <li className={ window.location.pathname === "/" ? "hidden" : "" }>
        <Link to="/">Current weather</Link>
      </li>
      <li className={ window.location.pathname === "/hourly" ? "hidden" : "" }>
        <Link to="/hourly">24 hours</Link>
      </li>
    </ul>
  );
}

export default Navigation;