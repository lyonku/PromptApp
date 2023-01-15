import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Boxes from "./Boxes";
import Controls from "./Controls";
import Modal from "@mui/material/Modal";

import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function App() {
  const [selected, setSelected] = useState({
    genre: "",
    styles: [],
    setting: [],
    tags: [],
    artist: [],
  });
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

  async function goGenerate(value) {
    handleOpen();
    let total = "";

    for (const key in selected) {
      if (key == "genre") {
        total = selected[key] + ", " + value + ",";
      } else {
        selected[key].map((item) => {
          if (key == "artist" && item) {
            total += " by " + item + ",";
          } else {
            if (item) {
              total += " " + item + ",";
            }
          }
        });
      }
    }

    if (total[total.length - 1] == ",") {
      total = total.slice(0, -1);
    }

    const response = await openai
      .createImage({
        prompt: total,
        n: 1,
        size: "1024x1024",
      })
      .then((data) => {
        setSrc(data.data.data[0].url);
        setFullImgName(total);
      });
  }

  return (
    <div className="App">
      <Controls
        selected={selected}
        goGenerate={goGenerate}
        genActive={genActive}
      />
      <Box sx={{ width: "90%" }}>
        <Boxes selected={selected} setSelected={setSelected} />
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
