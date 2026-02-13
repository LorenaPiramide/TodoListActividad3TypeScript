import executeQuery from "../../../context/postgres.connector";
import UsuarioRepository from "../../domain/usuarios.repository";
import Usuario from "../../domain/usuario";

export default class UsuariosRepositoryPostgres implements UsuarioRepository {
    async save(email: String, password: String): Promise<void> {
        
    }

    async login(email: String, password: String): Promise<Usuario | null> {
        
        // TODO: arreglar
        const query = `INSERT INTO usuarios (correo, password) VALUES ('${email}', '${password}')`;
        const result = await executeQuery(query);
        if (result.length === 0) return null;

        const user = result[0];
        return {
            email: user.email,
            password: user.password
        };
    }
}