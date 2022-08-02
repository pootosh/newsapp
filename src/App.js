import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress:0
  }

  setProgress = (progress) =>{
    this.setState({progress: progress})
  } 
  pageSize = 4;
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Navbar />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="home" pageSize={this.pageSize} category="general" />} />
            <Route
              exact
              path="/business"
              element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment" />}
            />
            <Route
              exact
              path="/health"
              element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
