import Usuario from "../../usuarios/domain/usuario";
import Tarea from "./tareas";

export default interface TareasRepository {
    getByUser(usuario: Usuario): Promise<Tarea[]>;
    createTask(tarea: Tarea): Promise<Tarea>;
    //changeState(tarea: Tarea): Promise<Tarea>;
    //updateTask(tarea: Tarea): Promise<Tarea>;
    //assignTask(tarea: Tarea, usuario: Usuario): Promise<Tarea>;
    // Obtener todos los detalles de una tarea en específico
    //getAllTarea(tarea: Tarea): Promise<Tarea>;
}