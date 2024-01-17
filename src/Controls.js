import "./App.css";
import Box from "@mui/joy/Box";
import { CssVarsProvider } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import ClearIcon from "@mui/icons-material/Clear";

function Controls({
  selected,
  goGenerate,
  modelValue,
  setModelValue,
  checked,
  setChecked,
}) {
  const [inputValue, setInputValue] = useState("");
  const [currentParam, setCurrentParam] = useState("");

  const handleChange = (event) => {
    setModelValue(event.target.value);
  };
  let open = false;
  let error = "";
  if (inputValue.length < 2) {
    error += "Впишите запрос на латинице. ";
  }
  if (!selected.genre) {
    error += "Выберете 1 жанр. ";
  }
  if (selected.style.length < 1) {
    error += "Выберете, как минимум, один стиль";
  }
  if (selected.genre && selected.style.length >= 1 && inputValue.length >= 2) {
    open = true;
  }

  useEffect(() => {
    const name = {
      style: ["Стили: ", "Стиль: "],
      setting: ["Сеттинги: ", "Сеттинг: "],
      artist: ["Художники: ", "Художник: "],
    };
    let val = "";

    for (const key in selected) {
      if (key == "genre") {
        val = "Жанр: " + selected[key] + "; ";
      } else {
        const newMass = [];
        selected[key].map((item) => {
          if (item != "") {
            newMass.push(item);
          }
        });
        selected[key].length &&
          (val +=
            (selected[key].length > 1 ? name[key][0] : name[key][1]) +
            newMass.join(", ") +
            "; ");
      }
    }
    setCurrentParam(val);
  }, [selected]);

  return (
    <div className="Controls">
      <CssVarsProvider>
        <Input
          placeholder="Describe the art you want to generate"
          value={inputValue}
          pattern="[A-Za-z]"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => e.keyCode == 13 && goGenerate(inputValue)}
          className="Controls-input"
          endDecorator={
            <ClearIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setInputValue("")}
            />
          }
        />
        {open ? (
          <Button
            className="ControlsBtn"
            onClick={() => goGenerate(inputValue)}
          >
            Generate
          </Button>
        ) : (
          <Button className="ControlsBtn" disabled>
            Generate
          </Button>
        )}
        {!checked && (
          <FormControl>
            <RadioGroup
              defaultValue="female"
              name="controlled-radio-buttons-group"
              value={modelValue}
              onChange={handleChange}
              sx={{ my: 1 }}
              row
            >
              <Radio value="protogen-3.4" label="protogen-3.4" />
              <Radio value="anything-v3" label="anything-v3" />
              <Radio value="vintedois-diffusion" label="vintedois-diffusion" />
            </RadioGroup>
          </FormControl>
        )}

        <Typography
          component="label"
          endDecorator={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          }
        >
          Включить рендер 3 изображений -
        </Typography>

        {!open ? (
          <div className="Controls-error">{error}</div>
        ) : (
          <div>{currentParam}</div>
        )}
      </CssVarsProvider>
    </div>
  );
}

export default Controls;
