//Styles
import { useState } from "react";
import SelectButton from "../components/SelectButton";
import "./Create.css";
//Components
import Page from "./Page";

const Create = ({ data }) => {
  const [amounts, setAmounts] = useState([]);
  console.log({ amounts });
  const flours = [
    "Wheat Flour 550",
    "Wholemeal Wheat Flour",
    "Spelt Flour 630",
    "Wholemeal Spelt Flour",
    "Rye Flour 1150",
    "Wholemeal Rye Flour",
  ];

  const onInput = (flour) => (e) => {
    const result = amounts.find((item) =>
      Object.keys(item).find((key) => key === flour)
    );

    const newArray = amounts.map((item) =>
      Object.keys(item).includes(flour) ? { [item]: e.target.value } : item
    );

    result
      ? setAmounts(newArray)
      : setAmounts([...amounts, { [flour]: e.target.value }]);
  };
  return (
    <Page data={data} scheme="Create" text="Create a new Recipe">
      {flours.map((flour) => {
        return <SelectButton name={flour} onChange={onInput} />;
      })}
    </Page>
  );
};

export default Create;
