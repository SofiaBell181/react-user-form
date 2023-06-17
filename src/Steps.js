import React from "react";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStep } from "./store/rootSlice";

function Steps() {
  const step = useSelector(selectStep);

  return (
    <>
      <div
        className={
          step === 3
            ? "container-step step-3"
            : step === 2
            ? "container-step step-2"
            : "container-step step"
        }
      >
        <div className="block">
          <Navigation />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Steps;
