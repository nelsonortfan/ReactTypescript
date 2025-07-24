import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface Props{
    isOpen: boolean;
    onClose: () => void;
    elementoId: number;
}



const UserFormModal: React.FC<Props> = ({ isOpen, onClose, elementoId}) => {
    const [name, setName] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [email, setEmail] = React.useState('');
    const countries = ['Colombia', 'Peru', 'Mexico', 'Argentina', 'España', 'Chile'];
    const [error, setError] = React.useState<string | null>(null);


    React.useEffect(() => {
    if (isOpen) {
      fetch(`http://localhost:8080/info/${elementoId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar");
          return res.json();
        })
        .then((data) => {
          setName(data.name || '');
          setCountry(data.country || '');
          setEmail(data.email || '');
          setError(null);
        })
        .catch((err) => {
          console.error('Error al cargar info:', err);
          setError('No se pudo cargar la información. Verifica tu conexión o intenta más tarde.');
        });
    }
  }, [isOpen, elementoId]);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedInfo = {
      name,
      country,
    };

    fetch(`http://localhost:8080/info/${elementoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al actualizar');
        return res.json();
      })
      .then((data) => {
        console.log('Actualización exitosa:', data);
        setError(null);
        onClose();
      })
      .catch((err) => {
        console.error('Error al actualizar info:', err);
        setError('No se pudo actualizar la información. Intenta de nuevo más tarde.');
      });
  };

  return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Formulario de Usuario"
    style={{ content: { width: '300px', margin: 'auto',  height: '350px', maxHeight: '80vh', padding: '20px', overflow: 'auto' } }}
  >
    <h2>Editar Información</h2>

    {error && (
    <div style={{ color: 'red', marginBottom: '10px' }}>
      {error}
    </div>
    )}


    <form onSubmit={handleSubmit}>
      <label>
        Email: <p>{email}</p>
      </label>
      <br/>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        País:
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">Selecciona un país</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onClose}>Cerrar</button>
    </form>
  </Modal>
);

}

export default UserFormModal;