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

function Controls({
  selected,
  goGenerate,
  modelValue,
  setModelValue,
  checked,
  setChecked,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setModelValue(event.target.value);
  };
  let open = false;
  let error = "";

  if (inputValue.length < 2) {
    error += "Впишите запрос на латинице. ";
  }
  if (!selected.genre) {
    error += "Выберете жанр. ";
  }
  if (selected.styles.length < 1) {
    error += "Выберете, как минимум, один стиль";
  }
  if (selected.genre && selected.styles.length >= 1 && inputValue.length >= 2) {
    open = true;
  }

  return (
    <div className="Controls">
      <CssVarsProvider>
        <Input
          placeholder="Describe the art you want to generate"
          sx={{ width: "300px" }}
          value={inputValue}
          pattern="[A-Za-z]"
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

        {!open && <div className="Controls-error">{error}</div>}
      </CssVarsProvider>
    </div>
  );
}

export default Controls;
