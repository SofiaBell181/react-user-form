import React from "react";
import { useSelector } from "react-redux";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { selectStep } from "../store/rootSlice";

function Navigation() {
  const index = useSelector(selectStep);
  const step = ((index - 1) * 100) / 2;
  return (
    <>
      <ProgressBar percent={step}>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              <span className={Number(index) > 1 ? null : "point"}></span>
              <span
                className={Number(index) > 1 ? "line-confirm" : null}
              ></span>
              <span
                className={
                  accomplished ? "accomplishedSpan" : "notAccomplished"
                }
              >
                1
              </span>
            </div>
          )}
        </Step>

        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              <span className={Number(index) > 2 ? null : "point"}></span>
              <span
                className={Number(index) > 2 ? "line-confirm" : null}
              ></span>
              <span
                className={
                  accomplished ? "accomplishedSpan" : "notAccomplished"
                }
              >
                2
              </span>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              <span
                className={
                  accomplished ? "accomplishedSpan" : "notAccomplished"
                }
              >
                3
              </span>
            </div>
          )}
        </Step>
      </ProgressBar>
    </>
  );
}

export default Navigation;
