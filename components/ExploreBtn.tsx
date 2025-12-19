'use client'
import React from 'react'

const ExploreBtn = () => {
    return (
        <button onClick={()=>console.log("hey")} className="bg-red-500 px-3 font-semibold rounded-xl border-2 border-gray-500 transition-all duration-750 hover:bg-red-700">ExploreBtn</button>
    )
}
export default ExploreBtn
