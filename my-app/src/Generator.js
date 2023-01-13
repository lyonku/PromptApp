import "./App.css";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useState, useEffect } from "react";
import newData from "./newData.json";
import newDataArtBy from "./newDataArtBy.json";

function Generator({}) {
  const [value, setValue] = useState("");
  const [num, setNum] = useState(5);

  const DoRandom = () => {
    let array = [];

    for (let i = 0; i < num - 1; i++) {
      let count = Math.floor(Math.random() * newData.length);
      array.push(newData[count]);
    }
    setValue(array.toString());
  };

  return (
    <>
      <div className="Generator">
        <div className="Generator-text">Кол-во тэгов:</div>
        <Input
          type={"number"}
          onChange={(e) => {
            setNum(e.target.value);
          }}
          value={num}
        ></Input>
        <Button onClick={DoRandom}>Сгенерировать</Button>
      </div>
      <div className="Generator-total">{value}</div>
    </>
  );
}

export default Generator;
