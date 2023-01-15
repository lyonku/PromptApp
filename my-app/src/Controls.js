import "./App.css";
import Box from "@mui/joy/Box";
import { CssVarsProvider } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useState, useEffect } from "react";
function Controls({ selected, goGenerate }) {
  const [inputValue, setInputValue] = useState("");
  let open = false;
  let error = "";
  if (!selected.genre) {
    error += "Выберете жанр. ";
  }
  if (selected.styles.length < 1 || selected.tags.length < 1) {
    error += "Выберете как минимум один тэг и стиль";
  }
  if (
    selected.genre &&
    selected.styles.length >= 1 &&
    selected.tags.length >= 1
  ) {
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
        {!open && <div className="Controls-error">{error}</div>}
      </CssVarsProvider>
    </div>
  );
}

export default Controls;
