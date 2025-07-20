import { useState } from "react";
import { Tarea } from "./Tarea"

export const Lista = () => {

    const [myValue, setMyValue] = useState("")
    const [listaDeTareas, setListaDeTareas] = useState([])
    const [contadorDeTareas, setContadorDeTareas] = useState(0)

    const anadirNuevaTarea = (event) => {
        if (event.code === "Enter") {
            setMyValue(event.target.value)
            setListaDeTareas((prev) => [...prev, myValue])
            setContadorDeTareas(contadorDeTareas + 1)
            setMyValue("")
            console.log(contadorDeTareas);
            console.log(listaDeTareas);
        }
    }

    const borrarTarea = (indexParaEliminar) => (
        setListaDeTareas(listaDeTareas.filter((tarea, indiceActual) => {
            return indiceActual !== indexParaEliminar
        })),
        setContadorDeTareas(contadorDeTareas - 1)
    )

    return (
        <>
            <h4 className="text-center" style={{ fontSize: "100px" }}>Tareas</h4>
            <div className="border shadow">
                <input
                    style={{ fontSize: "20px" }}
                    type="text"
                    className="form-control p-3 ps-5 rounded-0 border-0 border-bottom"
                    placeholder="Introduzca una nueva tarea"
                    onKeyUp={anadirNuevaTarea}
                    onChange={(e) => { setMyValue(e.target.value) }}
                    value={myValue}
                />

                {listaDeTareas.map((tarea, index) => (
                    <div key={index} className="tarea-container d-flex justify-content-between p-3 ps-5 border-bottom">
                        <div className="d-flex align-items-center" style={{ fontSize: "20px" }}>{tarea}</div>
                        <button
                            className="borrar-boton btn bg-transparent text-danger border-0"
                            onClick={() => borrarTarea(index)}
                            style={{ fontSize: "20px", padding: "0px" }}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                ))}

                <p
                    className="ps-3 py-2 m-0"
                    style={{ fontSize: "12px", color: "grey" }}
                >{contadorDeTareas === 0
                    ? 'No hay ninguna tarea, añade una ahora'
                    : contadorDeTareas === 1
                        ? "Queda 1 tarea"
                        : `Quedan ${contadorDeTareas} tareas `}
                </p>
            </div>
        </>

    )
}