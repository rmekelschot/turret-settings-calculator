import { useState } from "react";
import doel1 from "./assets/doel1.png";
import hit from "./assets/hit.png";

import "./style.css";

function App() {
  const [x, setX] = useState(70);
  const [y, setY] = useState(70);
  const [afstand, setAfstand] = useState(100);
  const [elevation, setElevation] = useState(0);
  const [windage, setWindage] = useState(0);

  const sizeMultiplier = 2;
  const hitPixelSize = 8;

  const updateAfstand = (e) => {
    setAfstand(e.target.value);
  };

  const getDirection = ({ elevation, windage }) => {
    if (elevation != null) {
      if (elevation == 0) {
        return;
      } else if (elevation > 0) {
        return "omhoog";
      } else {
        return "omlaag";
      }
    }

    if (windage != null) {
      if (windage == 0) {
        return;
      } else if (windage > 0) {
        return "links";
      } else {
        return "rechts";
      }
    }

    return "";
  };

  const getWindage = () => {
    return windage > 0 ? windage.toFixed() : windage.toFixed() * -1;
  };

  const getElevation = () => {
    return elevation > 0 ? elevation.toFixed() : elevation.toFixed() * -1;
  };

  const berekenen = () => {
    let _x = (parseInt(x) - 70) / 10;
    let _y = (parseInt(y) - 70) / 10;

    // MRAD
    // 1 miliradiaal is 10cm op 100m
    // 0.1 miliradiaal per click met een 1/10 MRAD richtkijker

    // eerst naar 100 meter rekenen
    // daarna delen door de afstand
    _y = _y * 0.1; // 10 clicks per miliradiaal
    _y = (_y * 1000) / afstand; // 1000 cm is 100 meter

    // ook voor de x-as
    _x = _x * 0.1;
    _x = (_x * 1000) / afstand;

    setWindage(_x);
    setElevation(_y);
  };

  return (
    <div className="App">
      <div className="form">
        <div
          className="form-group flex"
          style={{ justifyContent: "space-evenly" }}
        >
          <p>
            E: {getElevation()} clicks{" "}
            {getDirection({ elevation: elevation.toFixed() })}
          </p>
          <p>
            W: {getWindage()} clicks{" "}
            {getDirection({ windage: windage.toFixed() })}
          </p>
        </div>
        <div className="flex">
          <div style={{ position: "relative" }}>
            <img
              src={doel1}
              style={{
                width: 140 * sizeMultiplier,
                height: 140 * sizeMultiplier,
              }}
            />
            <img
              src={hit}
              style={{
                position: "absolute",
                width: hitPixelSize,
                height: hitPixelSize,
                top: y * sizeMultiplier - hitPixelSize / 2,
                left: x * sizeMultiplier - hitPixelSize / 2,
                zIndex: 1,
              }}
            />
          </div>
        </div>
        <div className="form-group text-center">
          <p>Afwijking op de x-as: {x - 70}</p>
          <p>Afwijking op de y-as: {y - 70}</p>
        </div>
        <div className="form-group w-100">
          <div className="flex">
            <input
              type="button"
              value="omhoog"
              onClick={() => {
                if (y > 0) {
                  setY(y - 1);
                }
              }}
            />
          </div>
          <div className="flex">
            <input
              type="button"
              value="links"
              onClick={() => {
                if (x > 0) {
                  setX(x - 1);
                }
              }}
            />
            <span>raakpunt</span>
            <input
              type="button"
              value="rechts"
              onClick={() => {
                if (x < 140) {
                  setX(x + 1);
                }
              }}
            />
          </div>
          <div className="flex">
            <input
              type="button"
              value="omlaag"
              onClick={() => {
                if (y < 140) {
                  setY(y + 1);
                }
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <p>Afstand (in meter)</p>
          <input
            className="w-100"
            type="number"
            placeholder="afstand"
            onChange={updateAfstand}
            value={afstand}
          />
        </div>
        <div className="form-group">
          <p>Type richtkijker</p>
          <select className="w-100">
            <option value="mrad">1/10 MRAD</option>
            {/* <option value="moa" disabled>
              1/4 MOA (w.i.p.)
            </option> */}
          </select>
        </div>
        <div className="form-group">
          <button className="w-100" onClick={() => berekenen()}>
            Berekenen
          </button>
        </div>
        <p className="w-100 text-center text-soft pt">made by mitchell</p>
      </div>
    </div>
  );
}

export default App;
