import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "@components/Header/Header";
import styles from "./Home.style";

const Home = () => {
  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <Header title={"Home"} />
    </>
  );
};

export default Home;
