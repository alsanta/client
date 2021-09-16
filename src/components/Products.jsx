import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Products = (props) => {
    const {id} = useParams();
    const [item,setItem] = useState({});
    const history = useHistory();

        useEffect(()=>{
            axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res=>{
                // console.log(res.data.result);
                setItem(res.data.result[0]);
            })
            .catch(err=>console.log("error",err))
        },[id]);

        const deleteHandler=(e,id)=>{
            axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res=>{
                history.push("/")
            })
            .catch(err=>{
                console.log("error",err);
            })
    }

    return (
        <div className="displayInfo">
            <h4>{item.title}</h4>
            <h6>Price:</h6>
            <p>{item.price}</p>
            <h6>Description:</h6>
            <p>{item.description}</p>
            <button onClick={(e)=>deleteHandler(e,item._id)} className="btn btn-danger">Delete</button>
        </div>
    );
}

export default Products;