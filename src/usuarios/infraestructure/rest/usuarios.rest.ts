import express, { Request, Response } from "express";

import UsuariosUseCases from "../../application/usuarios.usecases";
import UsuariosRepositoryPostgres from "../db/usuarios.postgre";
import Auth, { isAuth } from "../../../context/auth";

const router = express.Router();
const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(
    new UsuariosRepositoryPostgres()
);

router.post("/registro", async (req: Request, res: Response) => {
    try {
        await usuariosUseCases.save(req.body.email, req.body.password);
        res.status(201).send({ message: "Usuario creado" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
})

router.post("/entrar", async (req: Request, res: Response) => {
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