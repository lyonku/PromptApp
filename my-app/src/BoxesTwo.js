import "./App.css";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Radio from "@mui/joy/Radio";
import { CssVarsProvider } from "@mui/joy/styles";
import RadioGroup from "@mui/joy/RadioGroup";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import dataTwo from "./dataTwo.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function BoxesTwo({ selected, setSelected }) {
  const changeSelected = (index, name) => {
    let copy = Object.assign([], selected);

    for (let i = 0; i < copy.length; i++) {
      console.log(copy[i]);
      console.log(name);
      if (copy[i] != name || copy.length == 0) {
        copy.push(name);
      } else {
        copy[i] = "";
      }
    }
    console.log(copy);
    setSelected(copy);
  };

  return dataTwo.map((item, index) => {
    return (
      <Box key={index} sx={{ width: "100%" }}>
        <Typography
          component={"span"}
          fontSize="lg"
          id={item.main_cat}
          mb={2}
          sx={{ fontSize: "20pt" }}
        >
          {item.main_cat}
        </Typography>
        {item.main_cat_array.map((item, index) => {
          return (
            <Accordion
              key={item.sub_cat}
              TransitionProps={{ unmountOnExit: true }}
              className={"Accordion"}
              sx={{ width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  component={"span"}
                  fontSize="lg"
                  id={item.sub_cat}
                  mb={2}
                  sx={{
                    fontSize: "14pt",
                    marginLeft: "50px",
                    marginTop: "20px",
                  }}
                  className={"Typography-zag"}
                >
                  {item.sub_cat}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CssVarsProvider>
                  <RadioGroup
                    name={item.sub_cat}
                    aria-labelledby={item.sub_cat}
                    row
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                      marginLeft: "60px",
                    }}
                    className={"Radiogrup"}
                  >
                    {item.sub_cat_array.map((item) => {
                      const checked = selected.indexOf(item.sub_sub_cat) != -1;

                      return (
                        <Chip
                          key={item.sub_sub_cat}
                          variant={checked ? "soft" : "plain"}
                          color={checked ? "primary" : "neutral"}
                          sx={{ backgroundColor: {} }}
                          className={"Chip-two"}
                          startDecorator={
                            <img
                              src={item.land_scape_link_to_img}
                              className="BoxesTwo-img"
                            />
                          }
                        >
                          <div className="BoxesTwo-wrap">
                            <Radio
                              variant="outlined"
                              color={checked ? "primary" : "neutral"}
                              disableIcon
                              overlay
                              label={item.sub_sub_cat}
                              value={item.sub_sub_cat}
                              checked={checked}
                              className={"Chip-Two-name"}
                              onClick={(event) => {
                                if (event.target.checked) {
                                  setSelected([...selected, item.sub_sub_cat]);
                                }
                                if (checked) {
                                  let copy = Object.assign([], selected);
                                  copy[copy.indexOf(item.sub_sub_cat)] = "";
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
                </CssVarsProvider>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    );
  });
}

export default BoxesTwo;
