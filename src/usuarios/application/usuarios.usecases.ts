import bcrypt, { compare } from "bcrypt";

import Usuario from "../domain/usuario";
import UsuariosRepository from "../domain/usuarios.repository";
import Auth, { createToken } from "../../context/auth";

export default class UsuariosUseCases {
    constructor(private repository: UsuariosRepository) {}

    async save(email: String, password: String): Promise<void> {
        if (await this.repository.findByEmail(email)) {
            throw new Error("El email ya existe.");
        }
        // Se pueden poner más comprobaciones.
        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        await this.repository.save(email, hashedPassword);
    }

    async findByEmail(email: String): Promise<Usuario | null> {
        return this.repository.findByEmail(email);
    }

    async login(email: String, password: String): Promise<Auth | false> {
        const user = await this.repository.findByEmail(email);
        if (user && user.password && 
            (await compare(password.toString(), user.password.toString()))
        ) {
            const token = createToken(user);
            return { user: { email: user.email }, token};
        }
        return false;
    }
}