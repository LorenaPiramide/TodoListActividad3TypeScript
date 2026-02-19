import express from 'express';
import routerTareas from './tareas/infraestructure/rest/tareas.rest';
import routerUsuarios from './usuarios/infraestructure/rest/usuarios.rest';

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:8080"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express()
app.use(express.json());
app.use(cors(options));

const api = "/api";
app.use(api + `/tareas`, routerTareas)
app.use(api + `/usuarios`, routerUsuarios)

app.listen(8080, () => {
    console.log('ya tira');
})