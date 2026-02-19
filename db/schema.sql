
CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    password VARCHAR(255),
    correo VARCHAR(50) UNIQUE
);

CREATE TABLE tareas(
    SERIAL PRIMARY KEY,
    texto VARCHAR(100),
    prioridad VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion TIMESTAMP NULL,
    estado BOOLEAN DEFAULT FALSE,
    creador INT,
    CONSTRAINT fk_creador FOREIGN KEY (creador) REFERENCES usuarios(id) ON DELETE CASCADE
);
CREATE TABLE tareas_usuarios (
    tarea_id INT REFERENCES tareas(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    PRIMARY KEY (tarea_id, usuario_id)
);