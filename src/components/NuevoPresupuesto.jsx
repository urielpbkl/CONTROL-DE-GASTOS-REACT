import React, { useState } from 'react'
import { Mensaje } from './Mensaje';

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) { //SI NO HAY NADA EN EL INPUT DEL FORMULARIO O ES MENOR A CERO

            setMensaje('El presupuesto debe ser mayor a cero')

            return //EL "return" AQUÍ HACE QUE CUANDO SE CUMPLA LA CONDICIÓN DE ARRIBA, YA NO SE EJECUTEN LAS LÍNEAS DE CÓDIGO DE ABAJO 
        }

        setMensaje('')  //EN CASO DE QUE NO SE CUMPLA LA CONDICIÓN DE ARRIBA O SEA QUE EL INPUT PASE LA VALIDACIÓN, DEJAMOS VACÍO EL MENSAJE

        setIsValidPresupuesto(true) //EN CASO DE QUE PASE LA VALIDACIÓN EL INPUT, ESTE STATE LO VAMOS A USAR EN EL COMPONENTE "header" PARA MOSTRAR EL CONTENIDO DEL COMPONENTE "ControlPresupuesto.jsx"
    }


    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label>Añadir Presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type='number'
                        placeholder='Agrega una cantidad'
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))} //CUANDO CAMBIE EL "input" ACTUALIZAMOS EL ESTADO "presupuesto" CON EL VALOR QUE OBTENGAMOS DEL "input"
                    />

                </div>

                <button type='submit'>
                    Añadir
                </button>

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            </form>
        </div>
    )
}
