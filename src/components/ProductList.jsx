import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [deleteClicked, setDeleteClicked] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                // console.log(res);
                setAllProducts(res.data.results);
            })
            .catch()
    }, [deleteClicked,props.addClicked]);

    const deleteHandler=(e,id)=>{
        axios.delete(`http://localhost:8000/api/products/${id}`)
        .then(res=>{
            setDeleteClicked(!deleteClicked)
        })
        .catch(err=>{
            console.log("error",err);
        })
}

    return (
        <div>
            {
                allProducts.map((products, idx) => {
                    return <ul key={idx} className="formInfo">
                        <li className="mb-3"><Link to={`/${products._id}`} >{products.title}</Link> | 
                        <button onClick={(e)=>deleteHandler(e,products._id)} className="btn btn-danger">Delete</button> | 
                        <Link to={`/edit/${products._id}`} className="btn btn-primary">Edit</Link>
                        </li>
                    </ul>
                })
            }
        </div>
    );
}

export default ProductList;