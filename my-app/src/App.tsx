import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";

interface IAppButton {
  path: string;
  name: string;
  icon: string;
}

const routes: IAppButton[] = [
  {
    path: "http://192.168.1.91/olfact.html",
    name: "Olfactometer",
    icon: "./beer-sniff.jpeg",
  },
  {
    path: "http://192.168.1.85/color.html",
    name: "Colorimeter",
    icon: "./beer-color-meter.jpeg",
  },
  {
    path: "http://192.168.1.83/taste.html",
    name: "Tastemeter",
    icon: "./taste-beer.jpeg",
  },
];

const AppButton = (props: {
  target: IAppButton;
  active: boolean;
  isBig?: boolean;
  emit: () => void;
}) => {
  return (
    <div
      style={
        props.isBig ? { backgroundImage: "url(" + props.target.icon + ")" } : {}
      }
      className={
        props.isBig
          ? "app-button-big"
          : "app-button " + (props.active ? "app-button-selected" : "")
      }
      onClick={() => {
        props.emit();
      }}
    >
      <span>{props.target.name}</span>
    </div>
  );
};

function App() {
  const [openPage, setOpenPage] = useState<string>("");

  return (
    <div className="App" style={{ backgroundImage: "url('./bar.png')" }}>
      <div className="toolbar">
        <div
          className="toolbar-buttons-logo"
          onClick={() => {
            setOpenPage("");
          }}
        >
          <img style={{ height: "4em" }} src="./solidale.jpg" />
        </div>
        <div className="toolbar-buttons">
          {routes.map((x: IAppButton, i: number) => {
            return (
              <AppButton
                active={openPage === x.path}
                emit={() => {
                  setOpenPage(x.path);
                }}
                key={i}
                target={x}
              />
            );
          })}
        </div>
      </div>
      {openPage === "" && (
        <div className="intro-text">
          <div className="intro-text-wrap">
            <h2>Benvenuto in Nikasi</h2>
            <div>Powered By IES Team s.r.l.</div>
          </div>
          <div className="toolbar-buttons-big">
            {routes.map((x: IAppButton, i: number) => {
              return (
                <AppButton
                  isBig
                  active={openPage === x.path}
                  emit={() => {
                    setOpenPage(x.path);
                  }}
                  key={i}
                  target={x}
                />
              );
            })}
          </div>
        </div>
      )}
      {openPage !== "" && (
        <div className="iframe-container">
          <iframe className="main-iframe" src={openPage} />
        </div>
      )}
    </div>
  );
}

export default App;
