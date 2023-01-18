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

function Controls({ selected, goGenerate, modelValue, setModelValue }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setModelValue(event.target.value);
  };
  let open = false;
  let error = "";
  if (inputValue.length < 2) {
    error += "Впишите запрос. ";
  }
  if (!selected.genre) {
    error += "Выберете жанр. ";
  }
  if (selected.styles.length < 1) {
    error += "Выберете как минимум один стиль";
  }
  if (selected.genre && selected.styles.length >= 1 && inputValue.length >= 2) {
    open = true;
  }

  return (
    <div className="Controls">
      <CssVarsProvider>
        <Input
          placeholder="Опишите арт, которы хотите создать"
          sx={{ width: "300px" }}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
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
        <FormControl>
          <RadioGroup
            defaultValue="female"
            name="controlled-radio-buttons-group"
            value={modelValue}
            onChange={handleChange}
            sx={{ my: 1 }}
            row
          >
            <Radio value="anything-v3" label="anything-v3" />
            <Radio value="protogen-3.4" label="protogen-3.4" />
            <Radio value="vintedois-diffusion" label="vintedois-diffusion" />
          </RadioGroup>
        </FormControl>
        {!open && <div className="Controls-error">{error}</div>}
      </CssVarsProvider>
    </div>
  );
}

export default Controls;
