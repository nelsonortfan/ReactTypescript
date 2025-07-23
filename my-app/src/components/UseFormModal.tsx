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
    const countries = ['Colombia', 'Peru', 'Mexico', 'Argentina', 'España', 'Chile'];


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
        })
        .catch((err) => {
          console.error('Error al cargar info:', err);
        });
    }
  }, [isOpen, elementoId]);

  /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Nombre: ${name}, Pais: ${country}`);
        onClose(); // cierra el modal
    };

    return (
        <Modal
            isOpen = {isOpen}
            onRequest = {onClose}
            contentLabel = "Formulario del Usuario de Nelson"
            style = {{
                content:{
                    width: '300px',
                    margin: 'auto',
                    padding: '20px'
                },
            }
            }
        >
            <h2>Vamos a crear un formulario de Usuario</h2>
            <form  onSubmit={handleSubmit} >        
                <label>
                    Nombre: 
                    <input
                        type="text"
                        value={name}
                        onChange={ (e) => setName(e.target.value) }
                        required
                    />
                </label>
                <br />
                <label>
                    Pais:
                    <select
                        value={country}
                        onChange={ (e) => setCountry(e.target.value) }
                        required
                    >
                        <option value="">Selecciona un Pais</option>
                        {
                            countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            )
                        )
                        }
                    </select>
                </label>
                <br/>
                <button type="submit" >Enviar</button>
                <button type="button" onClick={onClose}>Cerrar</button>
            </form>
        </Modal>
    );

    */

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedInfo = {
      name,
      country,
    };

    fetch(`http://localhost:8080/info/1`, {
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
        onClose();
      })
      .catch((err) => {
        console.error('Error al actualizar info:', err);
      });
  };

  return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Formulario de Usuario"
    style={{ content: { width: '300px', margin: 'auto', padding: '20px' } }}
  >
    <h2>Editar Información</h2>
    <form onSubmit={handleSubmit}>
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