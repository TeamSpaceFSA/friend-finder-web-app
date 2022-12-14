import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div className="error">
        <img src="https://geek.hellyer.kiwi/files/2017/06/cat-404.jpg" alt="" style={{ height: "280px", width: "390px"}}/>
        <div></div>
        <button onClick={goBack}>Oh no!! Go back!</button>
        <div className="space"></div>
        </div>
    )

}

export default Error