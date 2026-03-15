import express from 'express';
import routerTareas from './tareas/infraestructure/rest/tareas.rest';
import routerUsuarios from './usuarios/infraestructure/rest/usuarios.rest';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";


const app = express();

const allowedOrigins = ["http://localhost:8080"];
const options: cors.CorsOptions = { origin: allowedOrigins };

app.use(express.json());
app.use(cors(options));

const api = "/api";
app.use(api + `/tareas`, routerTareas);
app.use(api + `/usuarios`, routerUsuarios);

const swaggerDocument = require("../doc/swagger.json");
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;