import React from 'react'
import { BounceLoader } from 'react-spinners'
import "../../styles/global.css";

function Loader_preto() {
  return (
    <div>
      <BounceLoader  size={150}  color="black" />
    </div>
  )
}

export default Loader_preto
