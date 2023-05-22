import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { FaEyeSlash , FaEye } from 'react-icons/fa';
import "../../styles/global.css";
import "./style.css"
import { useState } from "react";
import Loader from "../../componenst/loader";


function Login() {

  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hidepass,setHidepass] = useState(false);


  async function entrar() {
    setLoading(true);
    try {
      await signIn(email, senha);
      <Link to="/home" />
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    setLoading(false);
  }
// const Forgotpassaword = () =>{
//     console.log("manda")
// }

const handleTogglePassword = () => {
  setHidepass(!hidepass);
};


  return (
    <div className="h-screen bg-gray-100 w-screen flex items-center justify-center">
      { !!errorMessage && <input style={{color: "red", fontSize: 15, marginBottom: 20}}>{ errorMessage }</input>}
      <div className="w-1/2 h-3/5 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl text-center font-black mb-8">Login</h2>
        <div className="grid gap-11">
          <div>
            <input
              className="bg-gray-200 p-2 pl-3 w-full outline-none shadow-md rounded-xl"
              type="email"
              placeholder='user@email.com.br'
              onChange={texto => setEmail(texto)}
            />
          </div>
          <div className="flex-row p-1 bg-gray-200 flex items-center  shadow-md rounded-xl justify-between">
            <input
              className="bg-gray-200 p-1 pl-3 outline-none w-4/5  rounded-xl"
              type={hidepass ? "text" : "password"}
              placeholder="Senha"
              onChange={(texto => setSenha(texto))}
            />
          <button onClick={handleTogglePassword} className="w-1/4 justify-end pr-3 flex outline-none">
          { hidepass ? 
          <FaEye size={25}/>
             
              :
              <FaEyeSlash size={25} /> 
             
          }


            
          </button>
          </div>
         {
          !loading ? 
         
         (<button className="bg-blue-600 ring-offset-0 font-black  ring ring-blue-700  p-2 text-white text-xl w-full rounded-xl cursor-pointer"
          onClick={entrar}
          >
            Entrar
          </button>)
        :(
          <div className="bg-blue-600 ring-offset-0 font-black flex justify-center p-2  items-center  ring ring-blue-700  text-white text-xl w-full rounded-xl ">
          <Loader/>
          </div>
        )

        }
          
            <a href="/">
            <p  className="text-blue-800 text-center cursor-pointer" >Esqueceu sua senha?</p>
           </a>
        </div>
        
      </div>
    </div>
  );
};


export default Login
