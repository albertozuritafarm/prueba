  const express = require('express');
  const app = express();
  const mysql = require('mysql');
  const bodyParser = require('body-parser');
  const cors = require('cors');

  const db = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cruddatabase',
  });

  app.use(bodyParser.urlencoded({extended:true}))
  app.use(cors());
  app.use(express.json());


  app.get("/api/get", (req, res)=>{
    const sqlSelect = "SELECT * from TBL_USUARIO"; 
    db.query(sqlSelect, (err, result) => {
        //console.log(result);
        res.send(result);
  });
});
  app.post ("/api/insert", (req, res)=>{
      const nombre_usuario = req.body.nombreUsuario;
      const cedula_usuario = req.body.cedulaUsuario;
      const telefono_usuario = req.body.telefonoUsuario;
      const mail_usuario = req.body.mailUsuario;
      
      const sqlInsert = "INSERT INTO TBL_USUARIO(nombre_usuario,cedula_usuario,telefono_usuario, mail_usuario) VALUES(?,?,?,?)"; 
      db.query(sqlInsert,[nombre_usuario, cedula_usuario,telefono_usuario, mail_usuario ], (err, result) => {
          console.log(result);

    }) ;
  });

  app.delete ("/api/delete/:nombreUsuario", (req, res)=>{
        const nombre_usuario = req.params.nombreUsuario;
        console.log(nombre_usuario);
        //const nombre_usuario = 'rene';
        const sqlDelete = "DELETE FROM TBL_USUARIO WHERE nombre_usuario = ?";
        db.query(sqlDelete,nombre_usuario, (err, result) => {
        if(err) console.log(err)
    });
  });

  app.put ("/api/update",(req, res)=>{
    const new_usuario = req.body.nombreUsuario;
    const old_usuario = req.body.oldUsuario;
    const cedula_usuario = req.body.cedulaUsuario;
    console.log(new_usuario);
    //const nombre_usuario = 'rene';
    const sqlUpdate = "UPDATE TBL_USUARIO  SET nombre_usuario = ? WHERE nombre_usuario = ?";
    db.query(sqlUpdate,[new_usuario, old_usuario], (err, result) => {
    if(err) console.log(err)
});
});

  app.listen(3001, () => {
      console.log('running on port 3001');
  }
  )