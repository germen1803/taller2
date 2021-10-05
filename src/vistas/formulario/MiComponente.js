import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable";

const MiComponente = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])
    const [idpersona, setID] = useState("")

    const handleInputChangeNombre = (event) => {
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        setApellido(event.target.value)
    }

    const enviarDatos = () => {
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

        guardarPersona();
        // let nuevo = {
        //     name: nombre,
        //     last: apellido
        // }
        // setPersonas(personas => [...personas, nuevo])
        // setNombre("")
        // setApellido("")
    }

    useEffect( () => {
        getPersonas()
    },[])

    async function getPersonas() {
        try {
            const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=8');
            if(response.status == 200)
            {
                setPersonas(response.data.persona)
                console.log(response.data);
            }
        } catch (error) {
        console.error(error);
        }
    }

    function peticionPut() {
            axios.put(`http://192.99.144.232:5000/api/personas/${idpersona}`, {
            nombre: nombre,
            apellido: apellido
        })
        .then(function (response){
            if(response.status == 200)
            {
                alert("Modificacion correcta")
                getPersonas()
                setNombre("")
                setApellido("")
            }else{
                alert("Error al modificar")
            }
        })
    }

    function guardarPersona()
    {
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo:8
        })
        .then(function (response) {

            if(response.status==200)
            {
                alert("Registro correcto")
                getPersonas()
            }else{
                alert("Error al guardar")
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const columns = [
        {
            name: "Nombre",
            field: "nombre",
            options: {
            filter: true,
            sort: true,
            }
        },
        {
            name: "Apellido",
            field: "apellido",
            options: {
            filter: true,
            sort: false,
            }
        }
    ];

    const data = [
        {nombre: "Nombre", apellido: "Apellido"},
    ];

    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData.nombre)
        setNombre(rowData.nombre)
        setApellido(rowData.apellido)
        setID(rowData._id)
        console.log(idpersona)
    };

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected:true,
        onRowClick: handleRowClick
    };

    return (
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre} ></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido} value={apellido}></input>
                </div>
                <button onClick={enviarDatos}>Enviar</button>
                <button onClick={peticionPut}>Modificar</button>
                {/* <div className="users">
                    {personas.map((persona) => (
                    <li>{persona.nombre} {persona.apellido}</li>
                    ))}
                </div> */}
            </div>
            <MaterialDatatable
                title={"Lista Grupo 8"}
                data={personas}
                columns={columns}
                options={options}
            />

        </Fragment>

    )
}
export default MiComponente