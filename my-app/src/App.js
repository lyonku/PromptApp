import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Boxes from "./Boxes";
import BoxesTwo from "./BoxesTwo";
import Controls from "./Controls";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Generator from "./Generator";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/joy/Typography";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [selected, setSelected] = useState([]);
  const [selectedTwo, setSelectedTwo] = useState([]);
  const [genActive, setGenActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [fullImgName, setFullImgName] = useState("");
  const [src, setSrc] = useState("");
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSrc("");
  };
  const handleChange = (event, newValue) => {
    if (newValue == 2) {
      setGenActive(true);
    } else {
      setGenActive(false);
    }
    setValue(newValue);
  };
  async function goGenerate(value) {
    handleOpen();
    let fullSelected = "";
    selected.map((item) => {
      if (item) {
        fullSelected += " " + item;
      }
    });
    selectedTwo.map((item) => {
      if (item) {
        fullSelected += " " + item;
      }
    });
    const response = await openai
      .createImage({
        prompt: value + fullSelected,
        n: 1,
        size: "1024x1024",
      })
      .then((data) => {
        setSrc(data.data.data[0].url);
        setFullImgName(value + fullSelected);
      });
  }

  return (
    <div className="App">
      <Controls
        selected={selected}
        goGenerate={goGenerate}
        selectedTwo={selectedTwo}
        genActive={genActive}
      />
      <Box sx={{ width: "90%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="первый набор стилей" {...a11yProps(0)} />
            <Tab label="второй набор стилей" {...a11yProps(1)} />
            <Tab label="генератор" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CssVarsProvider>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Boxes selected={selected} setSelected={setSelected} />
            </Box>
          </CssVarsProvider>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <CssVarsProvider> */}
          <Box
            sx={{
              display: "flex",
              gap: 5,
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <BoxesTwo selected={selectedTwo} setSelected={setSelectedTwo} />
          </Box>
          {/* </CssVarsProvider> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CssVarsProvider>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Generator setGenActive={setGenActive} />
            </Box>
          </CssVarsProvider>
        </TabPanel>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <IconButton aria-label="delete" className="btn" onClick={handleClose}>
            <ClearIcon />
          </IconButton>

          <div
            className="main-image"
            id="main-image"
            onClick={(event) => {
              if (event.target.id == "main-image") {
                handleClose();
              }
            }}
          >
            {src && <div className="imgName">{fullImgName}</div>}
            {src ? (
              <img src={src} className="image" />
            ) : (
              <div className="loader-wrap">
                <span className="loader"></span>
              </div>
            )}
          </div>
        </>
      </Modal>
    </div>
  );
}

export default App;
