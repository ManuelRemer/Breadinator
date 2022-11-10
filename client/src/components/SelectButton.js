import { useState } from "react";

const SelectButton = ({ name }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <button
        key={name}
        onClick={() => {
          setClicked(true);
        }}
      >
        {name}
      </button>
      {clicked && (
        <>
          <input type="text" />
          <button
            onClick={() => {
              setClicked(false);
            }}
          >
            x
          </button>
        </>
      )}
    </>
  );
};

export default SelectButton;
