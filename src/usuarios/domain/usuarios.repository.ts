import Usuario from "./usuario";

export default interface UsuarioRepository {
    save(email: String, password: String): Promise<void>;
    login(email: String, password: String): Promise<Usuario | null>;
}