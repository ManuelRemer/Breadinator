import { useState } from "react";

import "./selectButton.css";

const SelectButton = ({ name, onChange, value, hideInput, count }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="SelectButtonBackground">
      <div
        className={
          clicked ? "SelectButton--clicked SelectButton" : "SelectButton"
        }
      >
        <button
          key={name}
          onClick={(e) => {
            e.preventDefault();
            setClicked(!clicked);
            clicked ? hideInput(name) : count(true);
          }}
        >
          {name}
        </button>
        {clicked && (
          <div>
            <input type="text" onChange={onChange(name)} value={value} />
            {/* <button
              onClick={() => {
                setClicked(false);
              }}
            >
              x
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectButton;
