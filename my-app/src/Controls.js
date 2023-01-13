import "./App.css";
import Box from "@mui/joy/Box";
import { CssVarsProvider } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useState, useEffect } from "react";
function Controls({ selected, goGenerate, selectedTwo, genActive }) {
  const [inputValue, setInputValue] = useState("");
  let open = false;
  if (genActive) {
    open = true;
  } else {
    open = false;
  }

  for (let i = 0; i < selected.length; i++) {
    if (selected[i]?.length > 0 && inputValue.length >= 2) {
      open = true;
    }
  }

  for (let i = 0; i < selectedTwo.length; i++) {
    if (selectedTwo[i]?.length > 0 && inputValue.length >= 2) {
      open = true;
    }
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
        {!open && (
          <div className="Controls-error">
            Выберите хотя бы один стиль, и впишите описание
          </div>
        )}
      </CssVarsProvider>
    </div>
  );
}

export default Controls;
