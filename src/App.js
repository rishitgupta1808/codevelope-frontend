import React from "react";
import './App.css';
import Home from "./pages";
import Categories from "./pages/create/categories";
import Currency from "./pages/create/currency";
import { Switch,Route } from "react-router-dom";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
    <TopBar>
    <Switch>
    <Route exact path='/' component = {Home}/>
    <Route exact path='/create/categories' component = {Categories}/>
    <Route exact path = '/craete/currrency' component={Currency}/>
    </Switch>
    </TopBar>
    </>
  );
}

export default App;
