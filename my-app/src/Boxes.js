import "./App.css";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { useState } from "react";
import data from "./data/data.json";

function Boxes({ selected, setSelected }) {
  return data.map((item, index) => {
    return (
      <Box key={index}>
        <Typography
          component={"span"}
          fontSize="lg"
          id={item.name}
          mb={2}
          className="title"
        >
          {item.name}
        </Typography>
        <RadioGroup
          name={item.name}
          aria-labelledby={item.name}
          row
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          {item.array.map((name) => {
            let checked = false;
            if (item.title == "genre") {
              checked = selected[item.title] === name;
            } else {
              checked = selected[item.title].includes(name);
            }
            return (
              <Chip
                key={name}
                variant={checked ? "soft" : "plain"}
                color={checked ? "primary" : "neutral"}
                startDecorator={
                  <img
                    className="BoxesTwo-img"
                    src="https://i.postimg.cc/L6zXkbjG/image.png"
                  ></img>
                }
                className={"Chip-two"}
              >
                <div className="BoxesTwo-wrap">
                  <Radio
                    variant="outlined"
                    color={checked ? "primary" : "neutral"}
                    disableIcon
                    overlay
                    label={name}
                    value={name}
                    checked={checked}
                    className={"Chip-Two-name"}
                    onClick={(event) => {
                      if (event.target.checked) {
                        let copy = Object.assign([], selected);
                        if (item.title == "genre") {
                          copy[item.title] = name;
                        } else {
                          copy[item.title].push(name);
                        }
                        setSelected(copy);
                      }
                      if (checked) {
                        let copy = Object.assign([], selected);
                        if (item.title == "genre") {
                          copy[item.title] = "";
                        } else {
                          let count = 0;
                          for (let i = 0; i < copy[item.title].length; i++) {
                            if (copy[item.title][i] == name) {
                              copy[item.title][i] = "";
                            }
                            if (!copy[item.title][i]) {
                              count++;
                            }
                          }
                          if (count == copy[item.title].length) {
                            copy[item.title] = [];
                          }
                        }
                        setSelected(copy);
                      }
                    }}
                  />
                  {checked && (
                    <CheckIcon
                      sx={{
                        zIndex: 1,
                        pointerEvents: "none",
                        padding: "5px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
              </Chip>
            );
          })}
        </RadioGroup>
      </Box>
    );
  });
}

export default Boxes;
