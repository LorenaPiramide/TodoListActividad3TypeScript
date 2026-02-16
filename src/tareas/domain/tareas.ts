import Prioridad from "../domain/prioridad";

export default interface Tarea {
    id?: number;
    texto: String;
    prioridad: Prioridad,
    fechaCreacion?: String,
    fechaFinal: String,
    estado: boolean,
    usuario: number,
}