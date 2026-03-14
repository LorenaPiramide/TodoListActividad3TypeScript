import express from 'express';
import routerTareas from './tareas/infraestructure/rest/tareas.rest';
import routerUsuarios from './usuarios/infraestructure/rest/usuarios.rest';
import cors from 'cors';

const app = express();

const allowedOrigins = ["http://localhost:8080"];
const options: cors.CorsOptions = { origin: allowedOrigins };

app.use(express.json());
app.use(cors(options));

const api = "/api";
app.use(api + `/tareas`, routerTareas);
app.use(api + `/usuarios`, routerUsuarios);

export default app;