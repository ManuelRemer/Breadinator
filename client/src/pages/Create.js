//Styles
import { useReducer, useEffect, useState } from "react";
import SelectButton from "../components/SelectButton";
import sumArray from "../helpers/sumArray";
import "./Create.css";
//Components
import Page from "./Page";

const Create = ({ data }) => {
  const initialState = {
    "Wheat Flour 550": 0,
    "Wholemeal Wheat Flour": 0,
    "Spelt Flour 630": 0,
    "Wholemeal Spelt Flour": 0,
    "Rye Flour 1150": 0,
    "Wholemeal Rye Flour": 0,
  };

  const flourReducer = (state, action) => {
    switch (action.type) {
      case action.type:
        return { ...state, [action.type]: action.payload };
      case "CLEAR":
        return { ...initialState };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(flourReducer, initialState);
  const [floursClicked, setFloursClicked] = useState(0);
  const [message, setMessage] = useState("");

  const countFloursClicked = (bool) => {
    console.log(bool);
    bool === true
      ? setFloursClicked((prev) => prev + 1)
      : setFloursClicked((prev) => prev - 1);
  };
  useEffect(() => {
    const totalFlours = sumArray(Object.values(state));

    if (floursClicked > 0) {
      totalFlours === 100 && setMessage("");
      totalFlours > 100 && setMessage("too much");
      totalFlours < 100 && setMessage("fill up to 100%");
    } else {
      setMessage("select at least one flour");
    }
  }, [state, floursClicked]);

  const onChange = (name) => (e) => {
    !isNaN(e.target.value) &&
      dispatch({ type: name, payload: e.target.value * 1 });
  };

  const hideInput = (name) => {
    dispatch({ type: name, payload: 0 });
    countFloursClicked(false);
  };

  return (
    <Page data={data} scheme="Create" text="Create a new Recipe">
      <form>
        {Object.keys(initialState).map((flour) => {
          return (
            <SelectButton
              name={flour}
              onChange={onChange}
              hideInput={hideInput}
              count={countFloursClicked}
              key={flour}
              value={state[flour]}
            />
          );
        })}
        {message ? (
          <p>{message}</p>
        ) : (
          <div className="SelectButtonBackground ">
            <div className="SelectButton ">
              <input type="text" placeholder="enter a name" />
              <button>save</button>
            </div>
          </div>
        )}
      </form>
    </Page>
  );
};

export default Create;
