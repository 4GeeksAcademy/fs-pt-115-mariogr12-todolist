import { useState } from "react";
import { Tarea } from "./Tarea"

export const Lista = () => {

    const [myValue, setMyValue] = useState("")
    const [listaDeTareas, setListaDeTareas] = useState([])
    const [contadorDeTareas, setContadorDeTareas] = useState(0)

    const anadirNuevaTarea = (event) => {
        if (event.code === "Enter") {
            setListaDeTareas((prev) => [...prev, myValue])
            setContadorDeTareas(contadorDeTareas + 1)
            setMyValue("")
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
            <h4 className="text-center mt-4" style={{ fontSize: "100px", fontFamily: "Comic Relief", color: "#1b4aaedd" }}>Tareas</h4>

            <div className="mt-4 mb-2" style={{ position: "relative", width: "600px", margin: "80px auto" }}>
                <div className="border" style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    width: "568px",
                    height: "100%",
                    backgroundColor: "#ffffffff",
                    zIndex: 0,
                    boxShadow: "-6px 0 8px rgba(0, 0, 0, 0.08), 6px 0 8px rgba(0, 0, 0, 0.08)"
                }}></div>

                <div className="border" style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    width: "584px",
                    height: "100%",
                    backgroundColor: "#ffffffff",
                    zIndex: 1,
                    boxShadow: "-6px 0 8px rgba(0, 0, 0, 0.08), 6px 0 8px rgba(0, 0, 0, 0.08)"
                }}></div>

                <div className="border" style={{
                    position: "relative",
                    backgroundColor: "white",
                    zIndex: 2,
                    boxShadow: "-6px 0 8px rgba(0, 0, 0, 0.08), 6px 0 8px rgba(0, 0, 0, 0.08)"
                }}>
                    <input
                        style={{ fontSize: "20px", fontFamily: "Comic Relief" }}
                        type="text"
                        className="form-control p-3 ps-5 rounded-0 border-0 border-bottom"
                        placeholder="Introduzca una nueva tarea"
                        onKeyUp={anadirNuevaTarea}
                        onChange={(e) => { setMyValue(e.target.value) }}
                        value={myValue}
                    />

                    {listaDeTareas.map((tarea, index) => (
                        <div key={index} className="tarea-container d-flex justify-content-between p-3 ps-5 border-bottom">
                            <div className="d-flex align-items-center" style={{ fontSize: "20px", fontFamily: "Comic Relief"}}>{tarea}</div>
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
                        style={{ fontSize: "12px", color: "grey", fontFamily: "Comic Relief" }}
                    >{contadorDeTareas === 0
                        ? 'No hay ninguna tarea, añade una ahora'
                        : contadorDeTareas === 1
                            ? "Queda 1 tarea"
                            : `Quedan ${contadorDeTareas} tareas `}
                    </p>
                </div>
            </div>
        </>
    )
}
