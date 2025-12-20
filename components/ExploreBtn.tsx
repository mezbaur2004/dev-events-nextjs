'use client'
import React from 'react'
import Image from "next/image";

const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn" onClick={()=>console.log("hey")} >
        <a href="#events">Explore Events <Image src="/icons/arrow-down.svg" alt="image not found" width={24} height={24}/></a></button>
    )
}
export default ExploreBtn;
