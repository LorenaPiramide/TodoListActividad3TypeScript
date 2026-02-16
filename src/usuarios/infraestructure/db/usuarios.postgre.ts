import executeQuery from "../../../context/postgres.connector";
import UsuarioRepository from "../../domain/usuarios.repository";
import Usuario from "../../domain/usuario";

export default class UsuariosRepositoryPostgres implements UsuarioRepository {
    async save(email: String, password: String): Promise<void> {
        const query = `INSERT INTO usuarios (correo, password) VALUES ('${email}', '${password}')`;
        const result = await executeQuery(query);
        if (!result) {
            throw new Error("Error guardando usuario.")
        }
    }

    async findByEmail(email: String): Promise<Usuario | null> {
        const query = `SELECT * FROM usuarios WHERE correo = '${email}'`;
        const result: any[] = await executeQuery(query);
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        return {
            email: user.correo,
            password: user.password,
        };
    }
}