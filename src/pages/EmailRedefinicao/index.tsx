import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import Loader from "../../components/loader";



function emailRedefinicao() {

  const { usuario, signOut } = useAuth();
  const [ email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  return (
    <div className="p-10 flex items-center flex-col">
      <div className="p-10 flex items-center flex-col">
        <h1 className="text-xl text-black  font-semibold">Redefinição de Senha</h1>
        <h2>Preencha seu e-mail para enviar um link de redefinição de senha.</h2>
      </div>

      <div className="p-10 flex items-center flex-col">
        <label htmlFor="email" className="block text-gray-700 font-bold">
          E-mail:
        </label>
        <input className="p-5 ml-10 items-center bg-blue-300 ml-4 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-black  p-1 text-white text-xl  rounded-xl cursor-pointer" type="email" value={usuario.email}  />
          {
            !loading ?

              (<button className="bg-blue-300 ml-4 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
              >
                Enviar
              </button>)
              : (
                <div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl ">
                  <Loader />
                </div>
              )

          }      
      </div>
    </div>
  );
};

export default emailRedefinicao 