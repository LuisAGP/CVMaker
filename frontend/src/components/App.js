
import React from 'react'
import { render } from "react-dom";
import Main from './Main.jsx';

export default function App() {

  return (
    <Main />
  );
  
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);