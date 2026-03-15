import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "TodoList API",
        description: "Documentación de la API TodoList",
    },
    host: "localhost:8080",
}

const outputFile = "../doc/swagger.json";
const routes = ["./app.ts"] // Creo que puede ser app.ts o server.ts, es dónde están definidas las rutas

swaggerAutogen()(outputFile, routes, doc);