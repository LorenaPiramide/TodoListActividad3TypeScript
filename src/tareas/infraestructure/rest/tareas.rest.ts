import express, { Request, Response} from "express";

import TareasUseCases from "../../application/tareas.usecases";
import TareasRepositoryPostgres from "../db/tareas.postgre";
import Tarea from "../../domain/tareas";
import { isAuth } from "../../../context/auth";

const routerTareas = express.Router();

const tareaUseCases: TareasUseCases = new TareasUseCases(
    new TareasRepositoryPostgres()
)
// TODO: Falta probar
routerTareas.get("/", isAuth, async (req: Request, res: Response) => {
    try {
        const tareas = await tareaUseCases.getByUser(req.body.auth);
        res.status(200).send(tareas);
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
})

routerTareas.post(
    "/",
     async (req: Request, res: Response) => {
        try {
            const tarea: Tarea = {
                texto: req.body.texto,
                prioridad: req.body.prioridad,
                fechaFinal: req.body.fechaFinal,
                estado: req.body.estado,
                usuario: req.body.usuario
            }
            const tareaResult =  await tareaUseCases.createTask(tarea)            
            res.send(tareaResult)
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
)

export default routerTareas;