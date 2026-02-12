import express, { Request, Response} from "express";

import TareasUseCases from "../../application/tareas.usecases";
import TareasRepositoryPostgres from "../db/tareas.postgre";
import Tarea from "../../domain/tareas";

const router = express.Router();

const tareaUseCases: TareasUseCases = new TareasUseCases(
    new TareasRepositoryPostgres()
)

router.post(
    "/",
    async (req: Request, res: Response) => {
        console.log("dfsgd");
        try {
            const tarea: Tarea = {
                texto: req.body.texto,
                prioridad: req.body.prioridad,
                fechaFinal: req.body.fechaFinal,
                estado: req.body.estado,
                usuario: req.body.usuario
            }
            tareaUseCases.createTask(tarea)
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
)

export default router;