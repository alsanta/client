import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Products from './Products';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [formInfo, setFormInfo] = useState({
    title: null,
    price: null,
    description: null
  })

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(res => {
        // console.log(res);
        setAllProducts(res.data.results);
      })
      .catch()
  }, []);

  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo, [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/products", formInfo)
      .then(res => {
        res.json(res);
      })
      .catch(err => console.log(err))
    setFormInfo({
      title: null,
      price: null,
      description: null
    })
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
          <div>
            {
              allProducts.map((products, idx) => {
                return <ul key={idx} className="formInfo">
                  <li><Link to={`/${products._id}`} >{products.title}</Link></li>
                </ul>
              })
            }
          </div>
        </Route>
        <Route exact path="/:id">
          <Products></Products>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
