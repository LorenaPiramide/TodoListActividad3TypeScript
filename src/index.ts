import express from 'express';
import Tarea from './tareas/domain/tareas';
import Prioridad from './tareas/domain/prioridad';
import TareasRepository from './tareas/domain/tareas.repository';

import dotenv from "dotenv";
import cors from "cors";
import * as https from "https";
import * as fs from "fs";
import Usuario from './usuarios/domain/usuario';
import TareasRepositoryPostgres from './tareas/infraestructure/db/tareas.postgre';

const app = express()

app.listen(8080, () => {
    console.log('ya tira');

    const usuario1: Usuario = {
        email: "u@u"
    }

    const tarea1: Tarea = {
        texto: "texto",
        prioridad: Prioridad.alta,
        fechaFinal: new Date(2026, 4, 15),
        estado: true,
        usuario: usuario1
    }

    const tareaRepo = new TareasRepositoryPostgres();
    tareaRepo.createTask(tarea1);

})