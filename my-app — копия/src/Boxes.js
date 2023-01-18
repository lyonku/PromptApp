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
  return data.map((mainItem, index) => {
    return (
      <Box key={index}>
        <Typography
          component={"span"}
          fontSize="lg"
          id={mainItem.name}
          mb={2}
          className="title"
        >
          {mainItem.name}
        </Typography>
        <RadioGroup
          name={mainItem.name}
          aria-labelledby={mainItem.name}
          row
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          {mainItem.array.map((item) => {
            let checked = false;
            if (item.title == "genre") {
              checked = selected[mainItem.title] === item.sub_name;
            } else {
              checked = selected[mainItem.title].includes(item.sub_name);
            }
            return (
              <Chip
                key={item.sub_name}
                variant={checked ? "soft" : "plain"}
                color={checked ? "primary" : "neutral"}
                startDecorator={
                  <img className="BoxesTwo-img" src={item.url}></img>
                }
                className={"Chip-two"}
              >
                <div className="BoxesTwo-wrap">
                  <Radio
                    variant="outlined"
                    color={checked ? "primary" : "neutral"}
                    disableIcon
                    overlay
                    label={item.sub_name}
                    value={item.sub_name}
                    checked={checked}
                    className={"Chip-Two-name"}
                    onClick={(event) => {
                      if (event.target.checked) {
                        let copy = Object.assign([], selected);
                        if (mainItem.title == "genre") {
                          copy[mainItem.title] = item.sub_name;
                        } else {
                          copy[mainItem.title].push(item.sub_name);
                        }
                        setSelected(copy);
                      }
                      if (checked) {
                        let copy = Object.assign([], selected);
                        if (mainItem.title == "genre") {
                          copy[mainItem.title] = "";
                        } else {
                          let count = 0;
                          for (
                            let i = 0;
                            i < copy[mainItem.title].length;
                            i++
                          ) {
                            if (copy[mainItem.title][i] == item.sub_name) {
                              copy[mainItem.title][i] = "";
                            }
                            if (!copy[mainItem.title][i]) {
                              count++;
                            }
                          }
                          if (count == copy[mainItem.title].length) {
                            copy[mainItem.title] = [];
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
