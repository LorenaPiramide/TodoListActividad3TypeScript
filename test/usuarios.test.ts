import request from "supertest";
import app from "../src/app";

// Agrupamos test de usuarios en "describe"
describe("API E2E Test Usuarios", () => {
    // Usuario de prueba para usar en los test
    const testUsuario = { email: "test@test.com", password: "1234" };

    // Función auxiliar → Ayuda a que el código no se repita. Petición POST a la ruta enviando un JSON como body.
    const post = (url: string, body: any) => 
        request(app) // De supertest
            .post(url)
            .send(body)
            .set("Content-Type", "application/json");

    it("Registrar un usuario nuevo", async () => {
        const res = await post("/api/usuarios/registro", testUsuario);
        expect(res.status).toBe(201); // Esperamos 201 → correcto
        expect(res.body).toHaveProperty("message", "Usuario creado"); // Mensaje que debe coincidir con usuarios.rest.ts
    });

    it("Fallar si el email ya está registrado", async () => {
        const res = await post("/api/usuarios/registro", testUsuario);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message", "El email ya existe."); // Mensaje que debe coincidir con usuarios.usecases.ts
    });

    it("Login con credenciales correctas", async () => {
        const res = await post("/api/usuarios/login", testUsuario);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Credenciales correctas");
        expect(res.body.result).toHaveProperty("token"); // Porque si hacemos login, debe devolver el token
        expect(res.body.result.user).toEqual({ email: testUsuario.email }); // También debe devolver la información del usuario
    });

    it("Login con contraseña incorrecta", async () => {
        const res = await post("/api/usuarios/login", { email: testUsuario.email, password: "mal" });
        expect(res.status).toBe(401); // 401 → No autorizado
        expect(res.body).toHaveProperty("message", "Credenciales inválidas"); // usuarios.rest.ts
    });

});