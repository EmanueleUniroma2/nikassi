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
    icon: "",
  },
  {
    path: "http://192.168.1.85/color.html",
    name: "Colorimeter",
    icon: "",
  },
  {
    path: "http://192.168.1.83/taste.html",
    name: "Tastemeter",
    icon: "",
  },
];

const AppButton = (props: {
  target: IAppButton;
  active: boolean;
  emit: () => void;
}) => {
  return (
    <div
      className={"app-button " + (props.active ? "app-button-selected" : "")}
      onClick={() => {
        props.emit();
      }}
    >
      {props.target.name}
    </div>
  );
};

function App() {
  const [openPage, setOpenPage] = useState<string>("");

  return (
    <div className="App">
      <div className="toolbar">
        <div
          className="toolbar-buttons-logo"
          onClick={() => {
            setOpenPage("");
          }}
        >
          Nikasi Logo
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
          <h2>Benvenuto in Nikasi</h2>
          <div>Sistema sviluppato da bla bla</div>
          <div>Copiright bla bla</div>
          <div>Copiright bla bla</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      )}
      {openPage !== "" && (
        <div>
          <iframe className="main-iframe" src={openPage} />
        </div>
      )}
    </div>
  );
}

export default App;
