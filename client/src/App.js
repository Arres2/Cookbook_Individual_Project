import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./views/Home/Home";
// import DietsView from "./views/Diets/Diets";
import Detail from "./views/Detail/Detail";
import Landing from "./views/Landing/Landing";
import Create from "./views/Create/Create";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/recipes" element={<Home />} />
        <Route path="/recipes/:recipeId" element={<Detail />} />
        {/* <Route path="/diets" element={<DietsView />} /> */}
        <Route path="/create" element={<Create />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
