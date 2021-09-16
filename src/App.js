import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Products from './Products';

function App() {
  const [formInfo,setFormInfo] =useState({
    title:null,
    price:null,
    description:null
  })

  const changeHandler=(e)=>{
    setFormInfo({...formInfo,[e.target.name]:e.target.value
  })
}

  const submitHandler=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/api/products",formInfo)
    .then(res=>{
      res.json(res)
    })
    .catch(err=>console.log(err))
  }

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Product Manager</h1>
        <form onSubmit={(e)=>submitHandler(e)} className="formInfo d-flex flex-column" action="">
          <input onChange={(e)=>changeHandler(e)} className="mb-3" placeholder="Title" type="text" name="title"/>
          <input onChange={(e)=>changeHandler(e)} className="mb-3" placeholder="Price" type="number" name="price"/>
          <input onChange={(e)=>changeHandler(e)} className="mb-3" placeholder="Description" type="text" name="description" id="" />
          <input className="btn btn-success" type="submit" value="Add" />
        </form>
      </div>
      <Switch>
        <Route exact path="/route1">

        </Route>
        <Route exact path="/route2">

        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
