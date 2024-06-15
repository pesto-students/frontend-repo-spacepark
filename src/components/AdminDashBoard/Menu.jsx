import React from 'react';

function MenuComponent({ activeIndex, changeMenuIndex, options }) {
  // const options = ;

  return (
    <>
      {options.map((elem, index) => (
        <div
          className={`f-20 p-3 menu-opt ${Number(activeIndex) === index ? 'active-menu' : ''}`}
          onClick={() => changeMenuIndex(index)}
          key={index}
        >
          {elem}
        </div>
      ))}
    </>
  );
}

export default MenuComponent;
