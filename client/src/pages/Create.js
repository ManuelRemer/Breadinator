//Styles
import { useReducer, useState } from "react";
import SelectButton from "../components/SelectButton";
import pipe from "../helpers/pipe";
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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(flourReducer, initialState);

  const onInput = (name) => (e) => {
    dispatch({ type: name, payload: e.target.value });
  };

  console.log({
    flours: Object.keys(state).map((item) => {
      return { name: item, relativeAmount: state[item] };
    }),
  });

  return (
    <Page data={data} scheme="Create" text="Create a new Recipe">
      {Object.keys(initialState).map((flour) => {
        console.log(initialState[flour]);
        return (
          <form>
            <SelectButton
              name={flour}
              onChange={onInput}
              key={flour}
              value={state[flour]}
            />
          </form>
        );
      })}
    </Page>
  );
};

export default Create;
