import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Edit = (props) => {
    const{id} = useParams();
    const history = useHistory();
    const [item,setItem] = useState({});

    const changeHandler = (e) => {
        setItem({
            ...item, [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res=>{
            // console.log(res.data.result);
            setItem(res.data.result[0]);
        })
        .catch(err=>console.log("error",err))
    },[id]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${id}`, item)
            .then(res => {
                history.push("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="App">
            <h1>Edit</h1>
            <form onSubmit={(e) => submitHandler(e)} className="formInfo d-flex flex-column" action="">
                <input onChange={(e) => changeHandler(e)} className="mb-3" placeholder="Title" type="text" name="title" value={item.title}/>
                <input onChange={(e) => changeHandler(e)} className="mb-3" placeholder="Price" type="number" name="price" value={item.price}/>
                <input onChange={(e) => changeHandler(e)} className="mb-3" placeholder="Description" type="text" name="description" id="" value={item.description}/>
                <input className="btn btn-success" type="submit" value="Edit" />
            </form>
        </div>
    );
}

export default Edit;