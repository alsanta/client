import './App.css';
import React, { useState} from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  // Link
} from "react-router-dom"
import Products from './components/Products';
import ProductList from './components/ProductList';
import Edit from './components/Edit';

function App() {
  const [formInfo, setFormInfo] = useState({
    title: null,
    price: null,
    description: null
  })

  const [addClicked,setAddClicked] = useState(false)

  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo, [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/products", formInfo)
      .then(res=>{
        setAddClicked(!addClicked)
      })
      .catch(err => console.log(err))
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <h1>Product Manager</h1>
            <form onSubmit={(e) => submitHandler(e)} className="formInfo d-flex flex-column" action="">
              <input onChange={(e) => changeHandler(e)} className="mb-3" placeholder="Title" type="text" name="title" />
              <input onChange={(e) => changeHandler(e)} className="mb-3" placeholder="Price" type="number" name="price" />
              <input onChange={(e) => changeHandler(e)} className="mb-3" placeholder="Description" type="text" name="description" id="" />
              <input className="btn btn-success" type="submit" value="Add" />
            </form>
          </div>
          <hr />
          <ProductList addClicked={addClicked}></ProductList>
        </Route>
        <Route exact path="/:id">
          <Products></Products>
        </Route>
        <Route exact path="/edit/:id">
          <Edit></Edit>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
