import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
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
  const [hidepass, setHidepass] = useState(false);


  async function entrar() {
    setLoading(true);
    try {
      await signIn(email, senha);
      // <Link to="/home" />
      history.push("/home");
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
      {!!errorMessage && <input style={{ color: "red", fontSize: 15, marginBottom: 20 }}>{errorMessage}</input>}
      <div className="w-2/3 h-4/5 flex justify-center items-center flex-col p-8">
        <h1 className="text-blue-900  text-7xl font-black mb-4" >Reportify</h1>
        <h2 className="text-4xl text-center text-blue-900 font-bold mb-8">Login</h2>
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
              {hidepass ?
                <FaEye size={25} />

                :
                <FaEyeSlash size={25} />

              }
            </button>
          </div>
          <div className="flex flex-row items-center justify-around">
            <div>
              <button>
                <p className="text-blue-800 text-center cursor-pointer" >Esqueci a senha</p>
              </button>
            </div>
            {
              !loading ?

                (<button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
                  onClick={entrar}
                >
                  Entrar
                </button>)
                : (
                  <div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl ">
                    <Loader />
                  </div>
                )

            }

          </div>

        </div>

      </div>
    </div>
  );
};


export default Login
