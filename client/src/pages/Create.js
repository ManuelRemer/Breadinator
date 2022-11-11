//Styles
import { useState } from "react";
import SelectButton from "../components/SelectButton";
import pipe from "../helpers/pipe";
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
    // some
    const result = amounts.find((item) =>
      Object.keys(item).find((key) => key === flour)
    );

    //__________

    // const ArrOfObjsIncludeKey = (arr) => (keyToCheck) => {
    //   return arr.some((item) =>
    //     Object.keys(item).some((key) => key === keyToCheck)
    //   );
    // };

    // const amountsIncludesFlour = ArrOfObjsIncludeKey(amounts)(flour);

    // const buildNewArray = (arr) => (keyToCheck) => (amountsIncludesFlour) => {
    //   return amountsIncludesFlour
    //     ? arr.map((item) =>
    //         Object.keys(item).includes(keyToCheck)
    //           ? { [keyToCheck]: e.target.value }
    //           : item
    //       )
    //     : [...arr, { [keyToCheck]: e.target.value }];
    // };

    // const buildNewAmounts = buildNewArray(amounts)(flour);

    // console.log(buildNewAmounts(amountsIncludesFlour));

    // const task = pipe(ArrOfObjsIncludeKey, buildNewAmounts, setAmounts);

    // task(amounts, flour);

    //___________

    const newArray = result
      ? amounts.map((item) =>
          Object.keys(item).includes(flour) ? { [flour]: e.target.value } : item
        )
      : [...amounts, { [flour]: e.target.value }];

    setAmounts(newArray);
  };
  return (
    <Page data={data} scheme="Create" text="Create a new Recipe">
      {flours.map((flour) => {
        return <SelectButton name={flour} onChange={onInput} key={flour} />;
      })}
    </Page>
  );
};

export default Create;
