import React from "react";
import { render } from 'react-dom';
import App from "./app.jsx"
import i18n from './i18n.jsx'

setTimeout(function(){ render(<App i18n={i18n}/>, document.getElementById("content")); }, 1000);