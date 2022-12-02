import React from "react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate()
    return(
        <div>
          <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
          FAQ  
        </div> 
    )

}

export default Help