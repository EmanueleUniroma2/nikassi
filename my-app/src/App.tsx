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
      <div>
        <iframe className="main-iframe" src={openPage} />
      </div>
    </div>
  );
}

export default App;
