import React from "react";

const Navigation: React.FC = () => {

  const changeTabs = (event: React.MouseEvent<HTMLLIElement>) => {
    debugger
  };

  return (
    <div className="nav">
      <ul>
        <li onClick={event => { changeTabs(event) }}>Current weather</li>
        <li onClick={event => { changeTabs(event) }}>24 hours</li>
      </ul>
    </div>
  );
}

export default Navigation;