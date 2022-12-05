import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div>
        <img src="https://sitechecker.pro/wp-content/uploads/2017/12/404.png"/>
        <h1 onClick={goBack}>Go Back</h1>
        </div>
    )

}

export default Error