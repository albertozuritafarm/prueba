import './App.css';
import React, {useState,useEffect} from "react";
import Axios from 'axios';

function App() {

  const[nombreUsuario, setNombreUsuario] = useState("");
  const[cedulaUsuario, setCedulaUsuario] = useState("");
  const[telefonoUsuario, setTelefonoUsuario] = useState("");
  const[mailUsuario, setMailUsuario] = useState("");
  const[usuariosList, setUsuariosList] = useState([]);
  const[newUsuario, setNewUsuario] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      //console.log(response);
      setUsuariosList(response.data);

    })
    return () => {
      
    }
  }, [])

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert",{
      nombreUsuario: nombreUsuario,
      cedulaUsuario: cedulaUsuario,
      telefonoUsuario: telefonoUsuario,
      mailUsuario: mailUsuario

    }).then(()=>{
      alert("succesful insert!");
    });
 };

 const deleteUsuario = (usuario) => {
   
   console.log(usuario);
  Axios.delete(`http://localhost:3001/api/delete/${usuario}`);
  
  };

  const updateUsuario = (usuario) => {
  console.log(usuario);
  Axios.put("http://localhost:3001/api/update",{
    nombreUsuario: newUsuario,
    oldUsuario: usuario,
    cedulaUsuario: cedulaUsuario

   });
   setNewUsuario("");
   
   };

  return (
    <div className="App">
        <h1>CRUD APPLICATION</h1> 
        <label>Movie Name</label>
        <div className ="form">
           nombre: <input type="text" name="nombreUsuario" onChange={(e)=> {
              setNombreUsuario(e.target.value)
            }} />
           cedula: <input type="text" name="cedulaUsuario" onChange={(e)=> {
              setCedulaUsuario(e.target.value)
            }}/>
           telefono: <input type="text" name="telefonoUsuario" onChange={(e)=> {
              setTelefonoUsuario(e.target.value)
            }}/>
           mail: <input type="text" name="mailUsuario" onChange={(e)=> {
              setMailUsuario(e.target.value)
            }}/>
            <button onClick={submitReview} >Submit</button>
            
        </div>
        {usuariosList.map((val)=>{
              return <><div className="card"> <h1>{val.nombre_usuario}</h1>
                <p>{val.cedula_usuario}</p>
                <p>{val.telefono_usuario}</p>
                <button onClick={()=>{deleteUsuario(val.nombre_usuario)}}>delete</button>
                
                <input type="text" id="updateInput" onChange={(e)=>{
                  setNewUsuario(e.target.value);

                }} /> 
                <button onClick={()=>{updateUsuario(val.nombre_usuario)}}>update</button>
              </div></>
            })}
    </div> 
  );
}

export default App;
