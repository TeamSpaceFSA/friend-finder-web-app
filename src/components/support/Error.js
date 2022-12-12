import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div className="error">
        <img src="https://sitechecker.pro/wp-content/uploads/2017/12/404.png" alt=""/>
        <h2 onClick={goBack}>Go Back</h2>
        </div>
    )

}

export default Error