import { useEffect, useState } from "react";

export const Lista = () => {

    const [myValue, setMyValue] = useState("")
    const [listaDeTareas, setListaDeTareas] = useState([])
    const [contadorDeTareas, setContadorDeTareas] = useState(0)

    const getTareas = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/mariogr12")

        if (!response.ok) {
            crarUsuario()
            return
        }

        const data = await response.json()

        setListaDeTareas(data.todos)
        setContadorDeTareas(data.todos.length)
    }

    const crarUsuario = async () => {
        await fetch("https://playground.4geeks.com/todo/users/mariogr12", {
            method: "POST"
        })
    }

    const borrarTarea = async (id) => {
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
        getTareas()
        
    }

    const borrarTodasTareas = async () => {
        await fetch("https://playground.4geeks.com/todo/users/mariogr12", {
            method: "DELETE"
        })

        await crarUsuario()
        await getTareas()
    }

    const crearTarea = async () => {
        const nuevaTarea = {
            label: myValue,
            done: false
        };

        await fetch("https://playground.4geeks.com/todo/todos/mariogr12", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        })

        getTareas()
    }

    useEffect(() => {
        getTareas()
    }, [])


    const anadirNuevaTarea = (event) => {
        if (event.code === "Enter") {
            crearTarea()
            setContadorDeTareas(contadorDeTareas + 1)
            setMyValue("")
        }
    }

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
                            <div className="d-flex align-items-center" style={{ fontSize: "20px", fontFamily: "Comic Relief" }}>{tarea.label}</div>
                            <button
                                className="borrar-boton btn bg-transparent text-danger border-0"
                                onClick={() => borrarTarea(tarea.id)}
                                style={{ fontSize: "20px", padding: "0px" }}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    ))}

                    <div className="d-flex justify-content-between">
                        <p
                            className="d-flex align-items-center ps-3 py-2 m-0"
                            style={{ fontSize: "12px", color: "grey", fontFamily: "Comic Relief" }}
                        >{contadorDeTareas === 0
                            ? 'No hay ninguna tarea, añade una ahora'
                            : contadorDeTareas === 1
                                ? "Queda 1 tarea"
                                : `Quedan ${contadorDeTareas} tareas `}
                        </p>
                        <button className="btn bg-transparent text-danger " onClick={() => { borrarTodasTareas() }}>Borrar Todo</button>
                    </div>
                </div>
            </div>
        </>
    )
}
