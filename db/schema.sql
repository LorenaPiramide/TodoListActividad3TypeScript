CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL
);

CREATE TYPE prioridad_enum AS ENUM ('baja', 'media', 'alta');

CREATE TYPE estado_enum AS ENUM ('pendiente', 'completado');

CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    prioridad prioridad_enum NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion TIMESTAMP,
    estado estado_enum DEFAULT 'pendiente',

    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);