import React from "react";
import "./MenuComponent.scss";

function MenuComponent({ activeIndex, changeMenuIndex, options }) {
  return (
    <div className="menu-component">
      {options.map((elem, index) => (
        <div
          className={`menu-item ${
            Number(activeIndex) === index ? "active-menu" : ""
          }`}
          onClick={() => changeMenuIndex(index)}
          key={index}
        >
          {elem}
        </div>
      ))}
    </div>
  );
}

export default MenuComponent;
