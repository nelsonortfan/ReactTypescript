import React, { useState } from 'react';

interface FormData {
  nombre: string;
  cedula: string;
  edad: number;
}

const ActualizarFormulario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cedula: '',
    edad: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'edad' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:8080/api/employees/cedula/${formData.cedula}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        edad: formData.edad
      }),
    });

    if (response.ok) {
      console.log('Empleado actualizado correctamente');
    } else {
      console.error('Error al actualizar:', await response.text());
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="cedula">Cédula:</label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="edad">Edad:</label>
        <input
          type="number"
          id="edad"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ActualizarFormulario;