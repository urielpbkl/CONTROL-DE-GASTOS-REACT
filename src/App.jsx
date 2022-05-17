import { useEffect, useState } from 'react'
import { Filtros } from './components/Filtros';
import { Header } from './components/header'
import { ListadoGastos } from './components/ListadoGastos';
import { Modal } from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  //DEFINIMOS AQUÍ ESTE STATE PORQUE VA A PASAR POR MÁS DE UN COMPONENTE
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem('presupuesto') ?? 0 //SI YA HAY DATOS EN EL "localstorage" ESE SERÁ SU VALOR INICIAL CUANDO CARGUEMOS LA APP, SINO HAY NADA, SE INICIARÁ COMO CERO
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false); //PARA QUE NO SE MUESTRE DESDE EL INICIO LA VENTANA MODAL DEL FORMULARIO
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  ); //ESTE ARREGLO VA A GUARDAR LOS REGISTROS DE GASTOS QUE CREEMOS

  const [gastoEditar, setGastoEditar] = useState({}); //INICIA COMO UN ARREGLO VACÍO PORQUE CADA REGISTRO ES UN ARREGLO

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {  //SI EL OBJETO NO TIENE "id" ENTONCES ES UN NUEVO REGISTRO POR LO QUE SE VA A EJECUTAR EL SIGUIENTE BLOQUE DE CÓDIGO
      handleEditarGasto(); //SI SE CUMPLE LA CONDICIÓN DE ARRIBA, EJECUTAMOS ESTA FUNCIÓN QUE ABRE EL "MODAL" CON LOS DATOS DEL REGISTRO QUE QUEREMOS EDITAR CARGADOS
    }
  }, [gastoEditar])


  //GUARDAR NUEVO PRESUPUESTO EN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]) //SE VA A EJECUTAR CADA QUE CAMBIE EL STATE DE "presupuesto"

  //GUARDAR NUEVO GASTO EN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) //COMO "local storage" NO PUEDE ALMACENAR ARREGLOS, USAMOS " JSON.stringify()" PARA GUARDAR EL ARREGLO DE "gastos"
  }, [gastos]) //SE VA A EJECUTAR CADA QUE CAMBIE EL STATE DE "presupuesto"

  //APLICAR EL FILTRO A LOS GASTOS
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( (gasto) => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)      
    }
  }, [filtro])



  useEffect(() => {
    const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto')) ?? 0 //TRAEMOS EL PRESUPUESTO DE "localstorage" SINO, QUE SEA CERO
    if (presupuestoLocalStorage > 0) { //SI YA TENEMOS UN "presupuesto" YA NO MOSTRAMOS EL TEMPLATE PARA INGRESAR NUEVO PRESUPUESTO
      setIsValidPresupuesto(true)
    }
  }, [])



  const handleNuevoGasto = () => {
    setModal(true)

    setGastoEditar({}); //REINICIAMOS COMO UN OBJETO VACÍO EL GASTO, CUANDO PRESIONAMOS EL BOTÓN DE AGREGAR REGISTRO, PARA QUE NO SE QUEDEN LOS DATOS DEL ÚLTIMO REGISTRO EDITADO EN EL FORMULARIO

    setTimeout(() => { //DESUPUÉS DE 3 SEGUNDOS, MOSTRAMOS EL CONTENIDO DE "MODAL"
      setAnimarModal(true)
    }, 500);
  }


  const handleEditarGasto = () => {

    setModal(true)

    setTimeout(() => { //DESUPUÉS DE 3 SEGUNDOS, MOSTRAMOS EL CONTENIDO DE "MODAL"
      setAnimarModal(true)
    }, 500);

  }


  const guardarGasto = (gasto) => {

    if (gasto.id) {
      //EDITAR REGISTRO EXISTENTE
      const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState) //BUSCAMOS POR EL "id" UN REGISTRO CON EL MISMO "id" SI LO HAY, SI ENCUENTRA ALGUNO, LO ACTUALIZA Y SINO, LO REGRESA TAL CUAL
      setGastos(gastosActualizados); //ACTUALIZAMOS EL REGISTRO EDITADO
      setGastoEditar({}) //REINICIAMOS EL OBJETO CON LOS DATOS DEL REGISTRO A EDITAR
    } else {
      //AÑADIR NUEVO REGISTRO
      gasto.id = generarId(); //AGREGAMOS "id" A CADA REGISTRO NUEVO
      gasto.fecha = Date.now(); //AGREGAMOS LA "fecha" EN LA QUE SE GENERA CADA REGISTRO NUEVO
      setGastos([...gastos, gasto]) //COPIAMOS EL ARREGLO "gastos" Y A ESE AREGLO NUEVO, AGREGAMOS EL NUEVO REGISTRO
    }

    //----------------------UNA VEZ QUE AGREGAMOS UN NUEVO REGISTRO, SE CIERRA EL FORMULARIO----------------

    setAnimarModal(false) //INSTANTANEAMENTE DESUPÉS DE DAR CLICK A CERRAR, QUITAMOS EL "MODAL"
    setTimeout(() => { //DESUPUÉS DE 3 SEGUNDOS, QUITAMOS EL CONTENIDO DE "MODAL"
      setModal(false)
    }, 500);

  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id )
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}> {/* SI EL MODAL ESTÁ ACTIVO QUE LE AGREGUE LA CLASE "fijar" SINO NINGUNA CLASE */}
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={Number(presupuesto)}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>

            <img
              src={IconoNuevoGasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />

          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}



    </div>

  )
}

export default App
