import { useState } from "react";
import Header from "../components/buisness/Header/Header";
import Layout from "../components/buisness/Layout/Layout";
import SingIn from "../components/buisness/SingIn/SingIn";
import SingUp from "../components/buisness/SingUp/SingUp";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";

function App() {
  const [currPage, setCurrPage] = useState(false)
  return (
    <div className={styles.app__container}>
      <Header currPage={currPage} setCurrPage = {setCurrPage}/>
      <Routes>
        <Route path="/" element={<Layout currPage ={currPage} />} />
        <Route path="/registration" element={<SingUp />} />
        <Route path="/login" element={<SingIn />} />
      </Routes>
    </div>
  );
}

export default App;
