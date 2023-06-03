import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const EditarUsuario = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPerfil, setSelectedPerfil] = useState('admin');
  const [empresa, setEmpresa] = useState('');
  const [contato_empresa, setContato] = useState('');
  const id = match.params.id;
  const perfis = [
    { label: 'Administrador', value: 'administrador' },
    { label: 'Cliente', value: 'cliente' },
  ];
  const [selectedEmpresa, getSelectedEmpresa] = useState('empresa1');

  const editarUser = async () => {
    setLoading(true);
    try {
      const response = await api.put(`/usuario/${id}`, {
        nome,
        email,
        selectedPerfil,
        empresa,
        contato_empresa
      });
      alert(response.data.msg);
      history.push('/home');
    } catch (error) {
      alert(error.response.data.msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/usuario/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setSelectedPerfil(response.data.perfil);
        setEmpresa(response.data.empresa);
        setContato(response.data.contato_empresa);
        setLoading(false);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <>
      {!loading ? (
        <div className="container">
          <h1 className="title">Editar Usuário</h1>
          <div className="form-container">
            <div className="input-container">
              <label htmlFor="nome">Nome*</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="perfil">Perfil*</label>
              <select
                id="perfil"
                value={selectedPerfil}
                onChange={(e) => setSelectedPerfil(e.target.value)}
              >
                {perfis.map((perfil) => (
                  <option value={perfil.value} key={perfil.value}>
                    {perfil.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="empresa">Empresa*</label>
              <input
                type="text"
                id="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="contato_empresa">Contato da Empresa*</label>
              <input
                type="text"
                id="contato_empresa"
                value={contato_empresa}
                onChange={(e) => setContato(e.target.value)}
              />
            </div>
            <button className="button" onClick={editarUser}>
              Editar
            </button>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default EditarUsuario;
