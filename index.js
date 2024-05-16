const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

//Es la llave que me permite desencriptar mi token para acceder a los demas endpoints
const TOKEN_KEY = "UjGyNtU5gtHR";

// es la parte del codigo usada para la verificacion del token ante una solicitud a los demas tokens
const verificarToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    //en dado casoque en la solicitud no haya token
    if(token==null)
        return res.status(401).send("Token requerido");
    jwt.verify(token, TOKEN_KEY,(err, user)=>{
        if(err) return res.status(403).send("Token invalido");
        console.log(user);
        req.user = user;
        next();
    });
}

// Función para obtener usuarios aleatorios
function obtenerUsuariosAleatorios(usuarios, cantidad) {
    const usuariosAleatorios = [];
    const copiaUsuarios = usuarios.slice(); // Hacemos una copia para no modificar el array original
    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * copiaUsuarios.length);
        usuariosAleatorios.push(copiaUsuarios.splice(indiceAleatorio, 1)[0]);
    }
    return usuariosAleatorios;
}

// endpoint /Login
app.post("/login",(req,res)=>{
    
    const email = req.body.email;
    const password = req.body.password;
    if (Email == 'admin@admin.com' && Contraseña == 'admin'){
        const datos = {
            id: "1",
            nombre: "Pepito Julian",
            Apellido: "Perez Gonzalez",
            email: "admin@admin.com",
            Fecha_de_nacimiento: "2000-09-10"
        };
        const token = jwt.sign(
            {userId:datos.id, email: datos.email},
            TOKEN_KEY,
            {expiresIn:"3h"}
        );
        res.status(200).json(token);
    }else{
        res.status(400).send("Credenciales incorrectas o incompletas.");
    }
});

app.get('/', (req, res) => {
    res.send('debes inicar sesión');
  });


  app.get("/",verificarToken,(req,res)=>{
    const datos = {
        id: "1",
        nombre: "Pepito Julian",
        Apellido: "Perez Gonzalez",
        email: "admin@admin.com",
        Fecha_de_nacimiento: "2000-09-10"
    };
    res.status(200).json(datos);
});
//endpoint /profile
app.get("/profile",verificarToken,(req,res)=>{
    const datos = {
        id: "1",
        nombre: "Pepito Julian",
        Apellido: "Perez Gonzalez",
        email: "admin@admin.com",
        Fecha_de_nacimiento: "2000-09-10"
    };
    res.status(200).json(datos);
});
//endpoint /form
app.post("/form",  (req, res) => {
    const {text} = req.body;
    if (!text) {
        return res.status(400).send("El cuerpo de la solicitud no tiene la propiedad text");
    }
    res.status(200).json({ text });
});


// endpoint /contacts
app.get('/contacts',verificarToken, (req, res) => {
    const usuarios = [
        {nombre: "Pepito Julian",Apellido: "Perez Gonzalez",email: "pepitoperez@gmail.com"},
        {nombre: "María",Apellido: "García López",email: "maria.garcia@gmail.com"},
        {nombre: "Juan",Apellido: "Martínez Rodríguez",email: "juan.martinez@gmail.com"},
        {nombre: "Ana",Apellido: "Fernández Pérez",email: "anafernandez@gmail.com"},
        {nombre: "Carlos",Apellido: "Sánchez Gómez",email: "carlossanchez@gmail.com"},
        {nombre: "Luisa",Apellido: "Díaz Martínez",email: "luisadm@gmail.com"},
        {nombre: "David",Apellido: "Rodríguez Hernández",email: "david.r@gmail.com"},
        {nombre: "Sara",Apellido: "López García",email: "sara.lopez@gmail.com"},
        {nombre: "Pedro",Apellido: "Pérez Rodríguez",email: "pedroperez@gmail.com"},
        {nombre: "Lucía",Apellido: "Gómez Sánchez",email: "luciags@gmail.com"},
        {nombre: "Eduardo",Apellido: "Martín Pérez",email: "eduardomartin@gmail.com"},
        {nombre: "Laura",Apellido: "Hernández González",email: "laura.hernandez@gmail.com"},
        {nombre: "Diego",Apellido: "García Martínez",email: "diego.garcia@gmail.com"},
        {nombre: "Marta",Apellido: "Fernández López",email: "martaf@gmail.com"},
        {nombre: "Javier",Apellido: "Sánchez Martínez",email: "javier.sm@gmail.com"},
        {nombre: "Carmen",Apellido: "Pérez García",email: "carmenpg@gmail.com"},
        {nombre: "Alberto",Apellido: "Díaz López",email: "albertod@gmail.com"},
        {nombre: "Rocío",Apellido: "Martínez Sánchez",email: "rocio.m@gmail.com"},
        {nombre: "Manuel",Apellido: "González Pérez",email: "manuelgp@gmail.com"},
        {nombre: "Elena",Apellido: "Sánchez Martínez",email: "elenasm@gmail.com"}
    ];
    const usuariosAleatorios = obtenerUsuariosAleatorios(usuarios, 5);
    res.status(200).json(usuariosAleatorios);
});



app.listen(4000, ()=>{
    console.log("Servidor iniciado en el puerto 4000");
})