import Usuario from "../../usuarios/domain/usuario";
import Tarea from "../domain/tareas";
import TareasRepository from "../domain/tareas.repository";

export default class TareasUseCases {
    constructor(private tareasRepository: TareasRepository) {}

    async getByUser(usuario: Usuario): Promise<Tarea[]> {
        return this.tareasRepository.getByUser(usuario);
    }

    async createTask(tarea: Tarea): Promise<Tarea> {
        return this.tareasRepository.createTask(tarea);
    }

    async changeState(tarea: Tarea): Promise<Tarea> {
        return this.tareasRepository.changeState(tarea);
    }

    async updateTask(tarea: Tarea): Promise<Tarea> {
        return this.tareasRepository.updateTask(tarea);
    }

    // async assignTask(tarea: Tarea, usuario: Usuario): Promise<Tarea> {
    //     return this.tareasRepository.assignTask(tarea, usuario);
    // }

    // async getAllTarea(tarea: Tarea): Promise<Tarea> {
    //     return this.tareasRepository.getAllTarea(tarea);
    // }
}