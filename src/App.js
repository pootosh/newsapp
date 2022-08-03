import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  let API_KEY = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  let pageSize = 10;

  return (
    <div>
      <Router>
        <LoadingBar color="#f11946" progress={progress} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="home"
                pageSize={pageSize}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="business"
                pageSize={pageSize}
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="entertainment"
                pageSize={pageSize}
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="health"
                pageSize={pageSize}
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="science"
                pageSize={pageSize}
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="sports"
                pageSize={pageSize}
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={API_KEY}
                key="technology"
                pageSize={pageSize}
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
