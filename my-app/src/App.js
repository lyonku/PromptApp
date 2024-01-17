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
import ErrorIcon from "@mui/icons-material/Error";
import { Button } from "@mui/joy";

function App() {
  const [selected, setSelected] = useState({
    genre: "",
    style: [],
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
  const [error, setError] = useState(false);

  const [lastSrc, setLastSrc] = useState([]);

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
      setError(true);
    }
  }

  async function goGenerate(value) {
    setError(false);
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
        if (selected[key].length >= 1 && key != "artist") {
          for (let i = 0; i < selected[key].length; i++) {
            if (selected[key][i]) {
              totalTextPos += ", " + selected[key][i] + " " + key;
            }
          }
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

    if (modelValue == "anything-v3") {
      totalTextPos = "((masterpiece)), ((best quality)), " + totalTextPos;
      totalTextNeg +=
        "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name";
    }

    let totalTextPosMas = totalTextPos.split(", ");
    let totalTextNegMas = totalTextNeg.split(", ");
    let uniqueArrayPos = totalTextPosMas.filter(function (item, pos) {
      return totalTextPosMas.indexOf(item) == pos;
    });
    let uniqueArrayNeg = totalTextNegMas.filter(function (item, pos) {
      return totalTextNegMas.indexOf(item) == pos;
    });

    let uniqueArrayNeg2 = uniqueArrayNeg.reduce((acc, item) => {
      if (!uniqueArrayPos.includes(item)) {
        if (
          uniqueArrayPos[0].indexOf(item) != -1 ||
          uniqueArrayPos[2].indexOf(item) != -1
        ) {
        } else {
          acc.push(item);
        }
      }
      return acc;
    }, []);

    data.prompt = uniqueArrayPos.join(", ");
    data.negative_prompt = uniqueArrayNeg2.join(", ");

    if (checked) {
      let copy = Object.assign([], src);

      let values = ["anything-v3", "protogen-3.4", "vintedois-diffusion"];
      for (let i = 0; i < values.length; i++) {
        data.model_id = values[i];

        postData(url, data).then((data2) => {
          console.log(data2);
          copy.push(data2.output[0]);
          if (data.status == "failed") {
            setError(true);
          }
          if (copy.length == 3) {
            setSrc(copy);
            setLastSrc(copy);
          }
        });
      }
    } else {
      postData(url, data).then((data) => {
        if (data.status == "failed") {
          setError(true);
        }
        if (!data.meta) {
          setSeed(data?.firstResponse?.meta?.seed);
          setSrc(data.output?.slice(0, 1));
          setLastSrc(data.output?.slice(0, 1));
        } else {
          setSeed(data?.meta?.seed);
          setSrc(data.output);
          setLastSrc(data.output);
        }
      });
    }

    setFullImgName(
      "PROMPT: " + data.prompt + " NEGATIVE_PROMPT: " + data.negative_prompt
    );
    handleOpen();
  }
  return (
    <div className="App">
      <div className="app-wrap">
        <Controls
          selected={selected}
          goGenerate={goGenerate}
          genActive={genActive}
          setModelValue={setModelValue}
          modelValue={modelValue}
          setChecked={setChecked}
          checked={checked}
        />
        <CssVarsProvider>
          {lastSrc.length >= 1 ? (
            <Button
              type="button"
              onClick={() => {
                handleOpen();
                setSrc(lastSrc);
              }}
            >
              Показать последний запрос
            </Button>
          ) : (
            ""
          )}
        </CssVarsProvider>
      </div>

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
              ) : error ? (
                <div className="Error-text">
                  <ErrorIcon fontSize="large" />
                  Ошибка, попробуйте снова
                </div>
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
                {!openFullImgName ? "Показать запрос" : "Скрыть запрос"}
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
