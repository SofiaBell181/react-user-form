import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Steps from "./Steps";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="create/*" element={<Steps />}>
            <Route path="" element={<Step1 />} />
            <Route path="step2" element={<Step2 />} />
            <Route path="step2/step3" element={<Step3 />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
