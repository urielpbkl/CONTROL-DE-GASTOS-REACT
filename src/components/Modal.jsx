import React, { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import { Mensaje } from './Mensaje';

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');


    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {  //SI EL OBJETO NO TIENE "id" ENTONCES ES UN NUEVO REGISTRO POR LO QUE SE VA A EJECUTAR EL SIGUIENTE BLOQUE DE CÓDIGO

            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }

    }, [gastoEditar])


    const OcultarModal = () => {
        setGastoEditar({}) //REINICIAMOS EL OBJETO CON LOS DATOS DEL REGISTRO A EDITAR CUANDO TERMINAMOS DE EDITAR
        setAnimarModal(false) //INSTANTANEAMENTE DESUPÉS DE DAR CLICK A CERRAR, QUITAMOS EL "MODAL"
        setTimeout(() => { //DESUPUÉS DE 3 SEGUNDOS, QUITAMOS EL CONTENIDO DE "MODAL"
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) { //SI ALGUNO DE LOS CAMPOS TIENE UN STRING VACIO

            setMensaje('Todos los campos son obligatorios') //SI HAY ALGÚN CAMPO VACÍO MANDAMOS ESTE MENSAJE
            setTimeout(() => { //DESPUÉS DE 3 SEGUNDOS, SE QUITA EL MENSAJE
                setMensaje('')
            }, 3000);

            return //EL "return" AQUÍ HACE QUE CUANDO SE CUMPLA LA CONDICIÓN DE ARRIBA, YA NO SE EJECUTEN LAS LÍNEAS DE CÓDIGO DE ABAJO  
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha }) //AGREGAMOS LOS VALORES QUE VIENEN DEL FORMULARIO

    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBtn}
                    onClick={OcultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}> {/* SI "animarModal" ES "true" LE AGREGAMOS LA CLASE "animar" SINO "cerrar" */}
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Agregar nuevo gasto'}</legend> {/* SI HAY UN REGISTRO EN gastoEditar */}

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>} {/* SI HAY ALG´´UN MENSAJE, LO MOSTRAMOS */}

                <div className='campo'>
                    <label htmlFor='nombre'>Concepto</label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='Añadir concepto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Añade una cantidad:  ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoría</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value=''>--Seleccionar--</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='varios'>Gastos Varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>

                    <button type='submit' value='Añadir Gasto'>
                        {gastoEditar.nombre ? 'Editar' : 'Añadir'} {/* SI HAY UN REGISTRO EN gastoEditar */}
                    </button>

                </div>
            </form>
        </div>
    )
}
