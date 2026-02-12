import TareasRepository from "../../domain/tareas.repository";
import Tarea from "../../domain/tareas";
import Usuario from "../../../usuarios/domain/usuario";
import executeQuery from "../../../context/postgres.connector";
import Prioridad from "../../domain/prioridad";

export default class TareasRepositoryPostgres implements TareasRepository {
    async getByUser(usuario: Usuario): Promise<Tarea[]> {
        const query = `SELECT * FROM tareas WHERE usuario = '${usuario.email}'`;
        const result: any[] = await executeQuery(query);

        return result.map((tarea) => {
            return {
                id: tarea.id,
                texto: tarea.texto,
                prioridad: tarea.Prioridad,
                fechaCreacion: tarea.fechaCreacion,
                fechaFinal: tarea.fechaFinal,
                estado: tarea.estado,
                usuario: {
                    email: tarea.usuario,
                }
            }
        })
    }

    async createTask(tarea: Tarea): Promise<Tarea> {
        const query = `INSERT INTO tareas (usuario_id, texto, prioridad, fecha_creacion, fecha_finalizacion, estado) VALUES ('${tarea.usuario.id}', '${tarea.texto}', '${tarea.prioridad}', now(), '${tarea.fecha_finalizacion}', '${tarea.estado}'`;
        const results: any = await executeQuery(query);
        tarea.id = results[0].id;
        tarea.fechaCreacion = results[0].fecha_creacion;
        return tarea;
    }

    async changeState(tarea: Tarea): Promise<Tarea> {
        const query = `UPDATE tareas SET estado = '${tarea.estado}' WHERE id = '${tarea.id}'`;
        await executeQuery(query);
        return tarea;
    }

    async updateTask(tarea: Tarea): Promise<Tarea> {
        const query = `UPDATE tareas SET (texto, prioridad, estado) values ('${tarea.texto}', '${tarea.prioridad}', '${tarea.estado}') WHERE id = '${tarea.id}'`;
        await executeQuery(query);
        return tarea;
    }

    async assignTask(tarea: Tarea, asignado: Usuario): Promise<Tarea> {
        const query = `INSERT INTO tareas ()`
    }
}