import React, { useState } from 'react';
import Modal from 'react-modal';

interface EmailModalProps {
  onClose: () => void;
  onSave: (email: string) => void;
}

export const EmailRedefinicao: React.FC<EmailModalProps> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(email);
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>Inserir Email</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={handleEmailChange} />
        <button type="submit">Salvar</button>
      </form>
    </Modal>
  );
};

