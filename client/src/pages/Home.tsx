/* eslint-disable no-constant-condition */
import React, { useState } from "react";
import Hero from "./Hero";
import BlogList from "../features/blog/BlogList";
const Home = () => {
  return (
    <>
      <Hero />
      <BlogList />
    </>
  );
};

export default Home;
