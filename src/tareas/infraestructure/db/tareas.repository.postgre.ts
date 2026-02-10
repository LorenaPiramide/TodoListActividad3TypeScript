import TareasRepository from "../../domain/tareas.repository";
import Tarea from "../../domain/tareas";
import Usuario from "../../../usuarios/domain/usuario";
import executeQuery from "../../../context/postgres.connector";

export default class TareasRepositoryPostgres implements TareasRepository {
    async getByUser(usuario: Usuario): Promise<Tarea[]> {
        const query = `SELECT * FROM tareas WHERE usuario = '${usuario.email}'`;
        const result: any[] = await executeQuery(query);
    }
}