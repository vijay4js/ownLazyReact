import React from "react";
import "./styles.css";
const RemoteComponent = ownLazy(() => import("./Suspense"));

function ownLazy(fn) {
  let state = "LOADING";
  let result = null;
  const pr = fn();
  pr.then((module) => {
    state = "RESOLVED";
    result = <module.default />;
  }).catch((e) => {
    state = "REJECTED";
    result = <div>Error</div>;
  });

  if (state === "PENDING") {
    return pr;
  } else {
    return result;
  }
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <React.Suspense fallback="Loading">
        <RemoteComponent />
      </React.Suspense>
    </div>
  );
}
