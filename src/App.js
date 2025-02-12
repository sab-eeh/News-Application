import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import NewsFile from "./Components/NewsFile";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () =>{
  const[progress , setprogress] = useState(10)
  
  const setProgress = (progress) => {
    setprogress(progress)
  }

    let pagesize = 5
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact  path="/" element={<NewsFile  setProgress = {setProgress}  key="general" pageSize={pagesize} category="general" />} />
            <Route exact  path="/business" element={<NewsFile  setProgress = {setProgress}  key="business" pageSize={pagesize} category="business" />} />
            <Route exact  path="/entertainment" element={<NewsFile  setProgress = {setProgress}  key="entertainment" pageSize={pagesize} category="entertainment" />} />
            <Route exact  path="/general" element={<NewsFile  setProgress = {setProgress}  key="general"  pageSize={pagesize} category="general" />} />
            <Route exact  path="/health" element={<NewsFile  setProgress = {setProgress}  key="health" pageSize={pagesize} category="health" />} />
            <Route exact  path="/science" element={<NewsFile  setProgress = {setProgress}  key="science" pageSize={pagesize} category="science" />} />
            <Route exact  path="/sports" element={<NewsFile  setProgress = {setProgress}  key="sports" pageSize={pagesize} category="sports" />} />
            <Route exact  path="/technology" element={<NewsFile  setProgress = {setProgress}  key="technology" pageSize={pagesize} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App



