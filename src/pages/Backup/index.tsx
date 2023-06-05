import Menu from "../../components/menus";
import api from "../../services/api";
import "../../styles/global.css";
import { useEffect } from "react";

function Backup() {
  // useEffect(() => {
  //   const enviarRequisicao = async (url) => {
  //     try {
  //       const response = await fetch(url, {
  //         method: 'POST', // ou 'GET' dependendo da sua API
  //         // outras opções de configuração, como cabeçalhos, podem ser adicionadas aqui
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('Resposta do backend:', data);
  //         // faça algo com os dados recebidos do backend
  //       } else {
  //         console.error('Erro ao chamar a função do backend:', response.status);
  //         // lide com o erro adequadamente
  //       }
  //     } catch (error) {
  //       console.error('Erro ao chamar a função do backend:', error);
  //       // lide com o erro adequadamente
  //     }
  //   };

  //   const handleBackupClick = () => {
  //     alert('Seu backup será iniciado!')
  //     enviarRequisicao('http://localhost:3001/forceBackup'); // Substitua com o endpoint correto do seu backend para o backup
  //   };

  //   const handleRestoreClick = () => {
  //     alert('Seus dados foram restaurados!')
  //     enviarRequisicao('http://localhost:3001/forceRestore'); // Substitua com o endpoint correto do seu backend para a restauração
  //   };

  //   document.getElementById('botao_backup').addEventListener('click', handleBackupClick);
  //   document.getElementById('botao_restore').addEventListener('click', handleRestoreClick);

  //   return () => {
  //     document.getElementById('botao_backup').removeEventListener('click', handleBackupClick);
  //     document.getElementById('botao_restore').removeEventListener('click', handleRestoreClick);
  //   };
  // }, []);

  async function forceBackup() {
    try {
      alert('Backup Iniciado!!');
      const response = await api.post('/forceBackup');

    } catch (response) {
      console.log(response.data.msg);
    }
  }

  async function forceRestore() {

    try {
      alert('Restauração Iniciada!!');

      const response = await api.post('/forceRestore');

    } catch (response) {
      alert(response.data.msg);
    }
    }

  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1 ">
        <div className="p-10 flex items-center flex-col">
          <h1 className="text-2xl">Este site foi desenvolvido para criar o backup do banco de dados de mês em mês automaticamente.</h1>
          <h1 className="text-2xl">Porém, o botão abaixo força a criação de um arquivo de backup do banco de dados atual.</h1>
          <button onClick={forceBackup} className='w-40 py-3 rounded-xl text-center  mb-10 mt-5 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl' id='botao_backup'>Forçar Backup</button>
          
          <h1 className="text-2xl">O botão abaixo proporciona a opção de restauração do banco de dados utilizando </h1>
          <h1 className="text-2xl">o último arquivo de backup criado.</h1>
          <button onClick={forceRestore} className='w-40 py-3 rounded-xl text-center  mb-10 mt-5 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl' id='botao_restore'>Restaurar Backup</button>

          <h1 className="text-2xl">Tratando-se de segurança de dados dos usuários, nossa empresa se responsabiliza pela utilização</h1>
          <h1 className="text-2xl">de tais, tendo portanto um arquivo com termos de compromisso que temos aos nossos clientes</h1>
          <button className='w-40 py-3 rounded-xl text-center  mb-10 mt-5 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl' id='botao_termos'><a href="https://docs.google.com/document/d/e/2PACX-1vS95FEPOWKp-Kp2GidnxjKPfdNse9LGssZFxurbmqgSw09eIIfwxXjvZUmzr0UwWLLt5XviUjmHXQE8/pub"> Termos de Compromisso</a></button>
        </div>
      </div>
    </div>
  );
}

export default Backup;
