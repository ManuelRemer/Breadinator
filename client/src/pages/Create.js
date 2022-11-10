//Styles
import SelectButton from "../components/SelectButton";
import "./Create.css";
//Components
import Page from "./Page";

const Create = ({ data }) => {
  const flours = [
    "Wheat Flour 550",
    "Wholemeal Wheat Flour",
    "Spelt Flour 630",
    "Wholemeal Spelt Flour",
    "Rye Flour 1150",
    "Wholemeal Rye Flour",
  ];
  return (
    <Page data={data} scheme="Create" text="Create a new Recipe">
      {flours.map((flour) => {
        return <SelectButton name={flour} />;
      })}
    </Page>
  );
};

export default Create;
