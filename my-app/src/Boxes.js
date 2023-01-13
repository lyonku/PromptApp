import "./App.css";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { useState } from "react";
import data from "./data.json";

function Boxes({ selected, setSelected }) {
  const changeSelected = (index, name) => {
    let copy = Object.assign([], selected);
    copy[index] = name;
    setSelected(copy);
  };

  return data.map((item, index) => {
    return (
      <Box key={index}>
        <Typography component={"span"} fontSize="lg" id={item.name} mb={2}>
          {item.name}
        </Typography>
        <RadioGroup
          name={item.name}
          aria-labelledby={item.name}
          row
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          {item.array.map((name) => {
            const checked = selected[index] === name;
            return (
              <Chip
                key={name}
                variant={checked ? "soft" : "plain"}
                color={checked ? "primary" : "neutral"}
                startDecorator={
                  checked && (
                    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
                  )
                }
              >
                <Radio
                  variant="outlined"
                  color={checked ? "primary" : "neutral"}
                  disableIcon
                  overlay
                  label={name}
                  value={name}
                  checked={checked}
                  onClick={() => {
                    if (selected[index] == name) {
                      setSelected([
                        ...selected.slice(0, index),
                        "",
                        ...selected.slice(index + 1),
                      ]);
                    }
                  }}
                  onChange={(event) => {
                    if (event.target.checked) {
                      changeSelected(index, name);
                      // setSelected([
                      //   ...selected.slice(0, index),
                      //   name,
                      //   ...selected.slice(index + 1),
                      // ]);
                    }
                  }}
                />
              </Chip>
            );
          })}
        </RadioGroup>
      </Box>
    );
  });
}

export default Boxes;
