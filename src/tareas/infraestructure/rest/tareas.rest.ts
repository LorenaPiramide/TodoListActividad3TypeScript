import express, { Request, Response} from "express";

import TareasUseCases from "../../application/tareas.usecases";
import TareasRepositoryPostgres from "../db/tareas.postgre";
import Tarea from "../../domain/tareas";
import { isAuth } from "../../../context/auth";
import Usuario from "../../../usuarios/domain/usuario";

const routerTareas = express.Router();

const tareaUseCases: TareasUseCases = new TareasUseCases(
    new TareasRepositoryPostgres()
)

routerTareas.get(
    "/", isAuth, async (req: Request, res: Response) => {
        try {
            const tareas = await tareaUseCases.getByUser(req.body.auth);
            res.status(200).send(tareas);
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    })

routerTareas.post(
    "/", isAuth, async (req: Request, res: Response) => {
        try {
            const tarea: Tarea = {
                texto: req.body.texto,
                prioridad: req.body.prioridad,
                fechaFinal: req.body.fechaFinal,
                estado: req.body.estado,
                email: req.body.auth.email
            }
            const tareaResult =  await tareaUseCases.createTask(tarea)            
            res.send(tareaResult)
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
)

routerTareas.put(
    "/:id", isAuth, async (req: Request, res: Response) => {
        try {
            const tarea : Tarea =  {
                id: Number(req.params.id) // El :id
            }
            const usuario : Usuario = {
                id: Number(req.body.usuario) // Lo que pasamos en el body, el usuario entero
            }
            const tareaUsuarioResult = await tareaUseCases.assignTask(tarea, usuario)
            res.send(tareaUsuarioResult)
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
)

routerTareas.put(
    "/:id/estado", isAuth, async (req: Request, res: Response) => {
        try {
            const tarea: Tarea = {
                id: Number(req.params.id),
                estado: Boolean(req.body.estado)
            }
            const tareaResult = await tareaUseCases.changeState(tarea);
            res.send(tareaResult);
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }
)

routerTareas.put(
    "/:id/datos", isAuth, async (req: Request, res: Response) => {
        try {
            const tarea: Tarea = {
                id: Number(req.params.id),
                texto: String(req.body.texto),
                prioridad: req.body.prioridad,
                estado: Boolean(req.body.estado)
            }
            const tareaResult = await tareaUseCases.updateTask(tarea);
            res.send(tareaResult);
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }
)

routerTareas.get(
    "/:id", isAuth, async (req: Request, res: Response) => {
        try {
            const tarea: Tarea = {
                id: Number(req.params.id)
            }
            const tareaResult = await tareaUseCases.getAllTarea(tarea);
            res.send(tareaResult);
        } catch (error: any) {
            res.status(400).send({ message: error.mensaje });
        }
    }
)

export default routerTareas;