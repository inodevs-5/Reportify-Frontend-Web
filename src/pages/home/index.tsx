import { useAuth } from "../../contexts/auth";
import "../../styles/global.css";
// import { useState } from "react";


function Home() {

  const { signIn } = useAuth();

  return (
    <h1 className="from-red-800">
        Home
    </h1>
  );
};


export default Home
