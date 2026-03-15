import express, { Request, Response } from "express";

import UsuariosUseCases from "../../application/usuarios.usecases";
import UsuariosRepositoryPostgres from "../db/usuarios.postgre";
import Auth from "../../../context/auth";

const routerUsuarios = express.Router();
const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(
    new UsuariosRepositoryPostgres()
);

/**
 * @swagger
 * /api/usuarios/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un usuario con email y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: El email ya existe o hay algún error
 */
routerUsuarios.post("/registro", async (req: Request, res: Response) => {
    try {
        await usuariosUseCases.save(req.body.email, req.body.password);
        res.status(201).send({ message: "Usuario creado" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
})

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login de usuario
 *     description: Devuelve token si las credenciales son correctas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Credenciales correctas
 *       401:
 *         description: Credenciales inválidas
 */
routerUsuarios.post("/login", async (req: Request, res: Response) => {
  try {
    const result: Auth | false = await usuariosUseCases.login(
      req.body.email,
      req.body.password
    );
    if (result) {
      res.status(200).send({
        message: "Credenciales correctas",
        result,
      });
    } else {
      const result: Auth | false = await usuariosUseCases.login(
        req.body.email,
        req.body.password
      );
      if (result) {
        res.status(200).send({
          message: "Credenciales correctas",
          result,
        });
      } else {
        res.status(401).send({ message: "Credenciales inválidas" });
      }
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default routerUsuarios;