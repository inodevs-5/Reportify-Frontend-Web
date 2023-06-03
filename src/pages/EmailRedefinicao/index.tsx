import { useState } from "react";
import Loader from "../../components/loader";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function emailRedefinicao() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  
  const enviarEmail = async() => {
    setLoading(true);
      try {
        const response = await api.post('/usuario/emailRedefinicao', { email });

        navigate('/login')
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    setLoading(false);
  };

  return (
    <div className="p-10 flex items-center flex-col">
      <div className="p-10 flex items-center flex-col">
        <h1 className="text-blue-900  text-5xl font-black mb-4" >Reportify</h1>
        <h2 className="mt-5 text-4xl text-center text-blue-900 font-bold mb-8">Redefinição de senha</h2>
        <h2>Preencha seu e-mail para enviar um link de redefinição de senha.</h2>
      </div>
      {errorMessage && <p className="mb-5 text-red-600">{errorMessage}</p>}
      <div className="flex items-center flex-col">
        <label htmlFor="email" className="block text-gray-700 font-bold">
          E-mail:
        </label>
        <input className="p-2 mt-2 w-full ml-10 items-center bg-blue-300 ml-4 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black ring ring-black  p-1 text-white text-md rounded-xl" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
          {
            !loading ?
              (
                <button className="mt-5 bg-blue-300 ml-4 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer" onClick={enviarEmail}>
                  Enviar
                </button>
              )
              : 
              (
                <div className="mt-5 bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl ">
                  <Loader />
                </div>
              )
          }   
          <button className="outline-none">
            <Link to="/" >
              <p className="mt-5 text-blue-800 text-center cursor-pointer" >Voltar para página inicial</p>
            </Link>
          </button>   
      </div>
    </div>
  );
};

export default emailRedefinicao 