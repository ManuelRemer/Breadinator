import { useState } from "react";

import "./selectButton.css";

const SelectButton = ({ name, onChange }) => {
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
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          {name}
        </button>
        {clicked && (
          <div>
            <input type="text" defaultValue={0} onChange={onChange(name)} />
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
