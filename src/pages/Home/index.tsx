import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "../../styles/global.css";
import { FaComment, FaBell } from 'react-icons/fa';
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
// import { useState } from "react";


function Home() {

  const { usuario, signOut } = useAuth();
  // const {height} = Dimensions.get('screen')
  const [usuarios, setUsuarios] = useState()
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');
  const [ros, setRos] = useState();
  const [myRos, setMyRos] = useState();
  const [allRos, setAllRos] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
         if (usuario.perfil == "admin") {
          const response = await api.get('/ro/atribuido/' + usuario._id);
          setMyRos(response.data);
        setLoading(false);
      }else{
        const response2 = await api.get('/ro/relator/' + usuario._id);
        console.log(response2.data[0].relator.id._id)
        setRos(response2.data);
      }
      setLoading(false);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    
  })();
  }, []);


  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1 ">
        <div className="p-10 flex items-center flex-col">
        <h1>{usuario.perfil}</h1>
        </div>
    </div>
    </div>
  );
};


export default Home