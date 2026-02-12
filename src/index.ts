import express from 'express';
import Tarea from './tareas/domain/tareas';
import Prioridad from './tareas/domain/prioridad';
import TareasRepository from './tareas/domain/tareas.repository';
import router from './tareas/infraestructure/rest/tareas.rest';

import dotenv from "dotenv";
import cors from "cors";
import * as https from "https";
import * as fs from "fs";
import Usuario from './usuarios/domain/usuario';
import TareasRepositoryPostgres from './tareas/infraestructure/db/tareas.postgre';

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
app.use(api + `/tareas`, router)

app.listen(8080, () => {
    console.log('ya tira');
})