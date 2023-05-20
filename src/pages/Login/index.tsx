import { useAuth } from "../../contexts/auth";
import "../../styles/global.css";
import { useState } from "react";


function Login() {

  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


async function login() {
    // setLoading(true);
    // try {
    //   await signIn(email, senha);
    //   navigation.navigate('Home')
    // } catch (response) {
    //   setErrorMessage(response.data.msg);
    // }
    // setLoading(false);
  } 

// const Forgotpassaword = () =>{
//     console.log("manda")
// }


  return (
    <div className="h-screen bg-gray-100 w-screen flex items-center justify-center">
      <div className="w-1/2 h-3/5 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl text-center font-black mb-8">Login</h2>
        <form className="grid gap-11">
          <div>
            <input
              className="bg-gray-200 p-1 pl-1.5 w-full outline-none shadow-md rounded-xl"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="bg-gray-200 p-1 pl-1.5 outline-none w-full shadow-md rounded-xl"
              type="password"
              placeholder="Senha"
            />
          </div>
          <button className="bg-blue-600 ring-offset-0 font-black  ring ring-blue-700  p-1 text-white text-xl w-full rounded-xl cursor-pointer">
            Entrar
          </button>
          
            <a href="/">
            <p  className="text-blue-800 text-center cursor-pointer" >Esqueceu sua senha?</p>
           </a>
        </form>
      </div>
    </div>
  );
};


export default Login
