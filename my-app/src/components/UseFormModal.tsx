import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

const countries = ['Colombia', 'Peru', 'Mexico', 'Argentina', 'España', 'Chile'];

const UserFormModal: React.FC<Props> = ({ isOpen, onClose}) => {
    const [name, setName] = React.useState('');
    const [country, setCountry] = React.useState('');

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

}

export default UserFormModal;