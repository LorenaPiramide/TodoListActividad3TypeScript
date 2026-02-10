import Usuario from "../../usuarios/domain/usuario";
import Prioridad from "../domain/prioridad";

export default interface Tarea {
    id: number;
    texto: String;
    prioridad: Prioridad,
    fechaCreacion: Date,
    fechaFinal: Date,
    estado: boolean,
    usuario: Usuario,
    usuariosAsignados: Array<Usuario>
}