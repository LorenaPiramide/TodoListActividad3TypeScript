import TareasRepository from "../../domain/tareas.repository";
import Tarea from "../../domain/tareas";
import Usuario from "../../../usuarios/domain/usuario";
import executeQuery from "../../../context/postgres.connector";

export default class TareasRepositoryPostgres implements TareasRepository {
    async getByUser(usuario: Usuario): Promise<Tarea[]> {
        const query = `SELECT t.* FROM tareas t INNER JOIN usuarios u ON t.creador = u.id WHERE u.correo = '${usuario.email}'`;
        const result: any[] = await executeQuery(query);

        return result.map((tarea) => {
            return {
                id: tarea.id,
                texto: tarea.texto,
                prioridad: tarea.Prioridad,
                fechaCreacion: tarea.fechaCreacion,
                fechaFinal: tarea.fechaFinal,
                estado: tarea.estado,
                email: tarea.email
            }
        })
    }

    async createTask(tarea: Tarea): Promise<Tarea> {
        const query = `INSERT INTO tareas (texto, prioridad, fecha_finalizacion, estado, creador) VALUES ('${tarea.texto}', '${tarea.prioridad}', '${tarea.fechaFinal}', '${tarea.estado}', (SELECT id FROM usuarios WHERE correo = '${tarea.email}')) returning *`;
        const results: any = await executeQuery(query);
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
        const query = `INSERT INTO tareas_usuarios (tarea_id, usuario_id) VALUES ('${tarea.id}', '${asignado}')`; // Creo que no va porque necesito el id
        await executeQuery(query);
        return tarea;
    }
}