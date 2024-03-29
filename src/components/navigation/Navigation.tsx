import React from "react";
import './navigation.sass'
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useApp";

const Navigation: React.FC = () => {
  const state = useAppSelector(state => state.forecast);
  const hourlyUrl = `/hourly?lon=${ state.data.lon }&lat=${ state.data.lat }`;

  return (
    <ul className="nav">
      <li className={ window.location.pathname === "/" ? "hidden" : "" }>
        <Link to="/">Current weather</Link>
      </li>
      <li className={ window.location.pathname === "/hourly" ? "hidden" : "" }>
        <Link to={ hourlyUrl }>24 hours</Link>
      </li>
    </ul>
  );
}

export default Navigation;
