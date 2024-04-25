import React from "react"
import ReactDOM from "react-dom"
import Pexeso from "./Pexeso"
import * as serviceWorker from "./serviceWorker"

import { tryLoadAndStartRecorder } from "@alwaysmeticulous/recorder-loader"

async function startApp() {
  // Record all sessions on localhost, staging stacks and preview URLs
  if (!isProduction()) {
    // Start the Meticulous recorder before you initialise your app.
    // Note: all errors are caught and logged, so no need to surround with try/catch
    await tryLoadAndStartRecorder({
      projectId: "DHPKqhDlOctW8kHuOuFRkvymv2YXhIennj2zShO0",
      isProduction: false,
    })
  }

  ReactDOM.render(<Pexeso />, document.getElementById("root"))
}

function isProduction() {
  return false
  //   return window.location.hostname.indexOf("your-production-site.com") > -1
}

startApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
