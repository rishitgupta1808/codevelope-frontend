
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const HomePage =()=> {

    const history = useHistory()

    useEffect(()=>{
        if(localStorage.getItem('wallet_id'))
        history.push('/user/')
    },[])
  
  return (
    <div>
      
    </div>
  )
}

export default HomePage
