import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Boxes from "./Boxes";
import Controls from "./Controls";
import Modal from "@mui/material/Modal";
import bigData from "./data/data.json";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function App() {
  const [selected, setSelected] = useState({
    genre: "",
    styles: [],
    setting: [],
    artist: [],
  });
  const [genActive, setGenActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [modelValue, setModelValue] = useState("vintedois-diffusion");
  const [fullImgName, setFullImgName] = useState("");
  const [openFullImgName, setOpenFullImgName] = useState(false);
  const [src, setSrc] = useState([]);
  const [seed, setSeed] = useState();
  const url = "https://eo6n4spi6rkan06.m.pipedream.net";
  const [checked, setChecked] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSrc("");
  };

  async function postData(url = "", data = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch {
      setOpen(false);
    }
  }

  async function goGenerate(value) {
    let totalTextPos = "";
    let totalTextNeg = "";
    let data = {
      key: "J5e6ryPxKnOCHdITBr7M5hnvSX6nYpHvbFTSiO4i9yThzB3pBTRfeF9Zk6CG",
      model_id: modelValue,
      prompt: "",
      negative_prompt: "",
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      safety_checker: "yes",
      seed: null,
      guidance_scale: 7.5,
      webhook: null,
      track_id: null,
    };

    for (const key in selected) {
      if (key == "genre") {
        totalTextPos =
          "(" + selected.genre + ")" + " of " + "((" + value + "))";
      } else {
        if (selected[key].length >= 1) {
          totalTextPos += ", " + selected[key].join(", ");
        }
      }
    }
    let currentData = {};

    for (const key in selected) {
      for (let i = 0; i < bigData.length; i++) {
        if (bigData[i].title == key) {
          currentData = bigData[i];
        }
      }

      if (key == "genre") {
        for (let i = 0; i < currentData.array.length; i++) {
          if (currentData.array[i].sub_name == selected[key]) {
            totalTextNeg += currentData.array[i].negativePrompt;
            totalTextPos += ", " + currentData.array[i].positivePrompt;
          }
        }
      }
      if (selected[key].length >= 1 && key != "genre") {
        for (let i = 0; i < selected[key].length; i++) {
          for (let j = 0; j < currentData.array.length; j++) {
            if (currentData.array[j].sub_name == selected[key][i]) {
              totalTextNeg += ", " + currentData.array[i].negativePrompt;
              totalTextPos += ", " + currentData.array[j].positivePrompt;
            }
          }
        }
      }
    }

    let totalTextPosMas = totalTextPos.split(", ");
    let totalTextNegMas = totalTextNeg.split(", ");
    let uniqueArrayNeg = totalTextNegMas.filter(function (item, pos) {
      return totalTextNegMas.indexOf(item) == pos;
    });
    let uniqueArrayPos = totalTextPosMas.filter(function (item, pos) {
      return totalTextPosMas.indexOf(item) == pos;
    });

    data.prompt = uniqueArrayPos.join(", ");
    data.negative_prompt = uniqueArrayNeg.join(", ");

    if (checked) {
      let copy = Object.assign([], src);

      let values = ["anything-v3", "protogen-3.4", "vintedois-diffusion"];
      for (let i = 0; i < values.length; i++) {
        data.model_id = values[i];

        postData(url, data).then((data) => {
          copy.push(data.output[0]);
          if (copy.length == 3) {
            setSrc(copy);
          }
        });
      }
    } else {
      postData(url, data).then((data) => {
        console.log(data);
        setSeed(data.meta.seed);
        setSrc(data.output);
      });
    }

    setFullImgName(
      "PROMPT: " + data.prompt + " NEGATIVE_PROMPT: " + data.negative_prompt
    );
    handleOpen();
  }
  return (
    <div className="App">
      <Controls
        selected={selected}
        goGenerate={goGenerate}
        genActive={genActive}
        setModelValue={setModelValue}
        modelValue={modelValue}
        setChecked={setChecked}
        checked={checked}
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
            <div className="main-image-wrap">
              {src.length >= 1 ? (
                src.map((src, index) => {
                  return <img src={src} key={index} className="image" />;
                })
              ) : (
                <div className="loader-wrap">
                  <span className="loader"></span>
                </div>
              )}
            </div>

            {src.length >= 1 && (
              <div
                onClick={() => setOpenFullImgName(!openFullImgName)}
                className="showPrompt"
              >
                {!openFullImgName ? "???????????????? ????????????" : "???????????? ????????????"}
              </div>
            )}

            {src && openFullImgName && (
              <>
                <div className="imgName">{fullImgName}</div>
                <div className="imgName">{seed}</div>
              </>
            )}
          </div>
        </>
      </Modal>
    </div>
  );
}

export default App;
