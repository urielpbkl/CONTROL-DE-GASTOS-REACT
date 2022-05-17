import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setProcentaje] = useState(0);

    useEffect(() => {
        //"reduce()" TOMA TODOS LOS ELEMENTOS DE UNA LISTA Y ACUMULA EL RESULTADO EN UN SOLO VALOR DE SALIDA, LO USAMOS PARA ACUMULAR(HACER UNA SUMATORIA) EL GASTO
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //CALCULAR EL PORCENTAJE GASTADO
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2) //REDONDEAMOS A DOS DÍGITOS

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => { //ACTUALIZAMOS EL PROCENTAJE 1 SEGUNDO DESUPUÉS DE QUE AGREGAMOS UN NUEVO GASTO
            setProcentaje(nuevoPorcentaje)
        }, 1000);

    }, [gastos]) //CADA QUE "gastos" CAMBIE, SE VA A EJECUTAR EL CÓDIGO DENTRO DE ESTE "useEffect"


    const formatearCantidad = (cantidad) => { //DAMOS FORMATO DE DINERO

        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })

    }

    //RESETEAMOS LOS DATOS DE LA APP
    const handleResetApp = () => {
        const resultado = confirm('Realmente quieres reiniciar tu presupuesto?') //MOSTRAMOS ANUNCIO DE CONFIRMACIÓN

        if (resultado) { //SI CONFIRMAMOS EL ANUNCIO DE CONFIRMACIÓN RESETEAMOS TODO
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }

    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Reiniciar Presupuesto
            </button>

            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? 'rgb(214 105 126)' : '#3CB371', // SI EL PORCENTAJE ES MAYOR AL 100% EL COLOR DE LA RUEDA SERÁ DE COLOR ROJO, SINO DE COLOR VERDE
                        trailColor: '#E5E7E9',
                        textColor: porcentaje > 100 ? 'rgb(214 105 126)' : '#3B82F6', // SI EL PORCENTAJE ES MAYOR AL 100% EL COLOR DEL TEXTO DENTRO DE LA RUEDA SERÁ DE COLOR ROJO, SINO DE COLOR AZUL
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>

                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : 'positivo'}`}> {/* SI HEMOS GASTADO MÁS DE LO QUE TENIAMOS COMO PRESUPUESTO, CAMBIAMOS LA CLASE PARA QUE CAMBIE EL COLOR */}
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>

            </div>

        </div>
    )
}
