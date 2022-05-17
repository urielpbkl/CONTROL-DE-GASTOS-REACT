import React from 'react'
import { Gasto } from './Gasto'

export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
    return (
        <div className='listado-gastos contenedor'>
            {/* SI HAY GASTOS MOSTRAMOS "Gastos" SINO, SEÑALAMOS QUE NO HAY QUE MOSTRAR */}
            {filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay registros para mostrar'}</h2>
                    {gastosFiltrados.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No hay registros para mostrar'}</h2>
                    {gastos.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>

            )}



        </div>
    )
}
