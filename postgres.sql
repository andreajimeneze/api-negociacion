CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  contrasenia VARCHAR(255) NOT NULL,
  rol VARCHAR(255) NOT NULL
);

CREATE TABLE noticias (
  id SERIAL PRIMARY KEY,
  url_imagen VARCHAR(255),
  fecha_publicacion DATE NOT NULL,
  resumen VARCHAR(350) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  texto TEXT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  fecha_edicion DATE
);

CREATE TABLE miembros_equipo (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  experiencia VARCHAR(400),
  nombre VARCHAR(255) NOT NULL,
  foto VARCHAR(255),
  profesion VARCHAR(255) NOT NULL,
  estado VARCHAR(255) NOT NULL DEFAULT 'activo',
  apellido VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  actividad_economica VARCHAR(255),
  email VARCHAR(255),
  locality VARCHAR(255),
  logo VARCHAR(255),
  nombre VARCHAR(255),
  telefono VARCHAR(255),
  direccion VARCHAR(255) NOT NULL,
  numero_miembros INTEGER,
  testimonio VARCHAR(500)
);

CREATE TABLE negociacion_colectiva (
  id BIGSERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  trabajadores_cubiertos INTEGER,
  fecha_negociacion DATE,
  CONSTRAINT fk_negociacion_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id)
);

CREATE TABLE negociaciones_realizadas (
  id SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  cliente_id INTEGER NOT NULL,
  CONSTRAINT fk_negociaciones_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id)
);


INSERT INTO usuarios (
  email, nombre, contrasenia, rol
) VALUES
('andreacjimenez@gmail.com', 'Andrea Jiménez', '1234', 'admin'),
('siemach@gmail.com', 'Pablo Méndez', '1234', 'user'),
('sofita@gmail.com', 'Sofía Andrea Jiménez Espinoza', '$2b$10$h3a3v8abjmpylsu5cRcIIOeWmVXIjOCOSMsTIsBcbHgomtmoD0Vl2', 'user');


INSERT INTO clientes (
  actividad_economica, email, locality, logo, nombre, telefono, direccion, numero_miembros, testimonio
) VALUES
('Industrial', 'sindicato@gmail.com', 'Concón, Valparaíso', 'images/clients/image1.jpg', 'Sindicato Profesionales Refinería', '322222222', 'Galos 645 , Cerro Alegre, Valparaíso', 100, 'Fue una experiencia muy enriquecedora. Trabajar con Gesynco, nos ha permitido lograr nuestros objetivos. Nuestros trabajadores están muy contentos.'),
('Transporte', 'metro@gmail.com', 'Providencia, Santiago', 'images/clients/image2.jpg', 'Sindicato Profesionales Metro', '26959593934', 'Rio Bueno 256', 150, 'Estamos muy conformes con el servicio de Gesynco. Gracias a ellos, hemos podido mejorar las condiciones de nuestros asociados. Muy recomendados.'),
('Minería', 'teniente@email.com', 'Rancagua', 'images/clients/mineral-el-teniente.jpg', 'Mineral El Teniente', '3223423000', 'Rancagua', 1400, 'Muy profesionales.'),
('Construcción', 'camachile@gmail.com', 'Santiago Centro', NULL, 'Sindicato Constructores de Chile', '229999888', 'Av. Alameda 1234', 300, 'Gracias a Gesynco logramos negociar mejoras históricas.'),
('Educación', 'profesores@valpo.cl', 'Valparaíso', NULL, 'Colegio de Profesores Valparaíso', '322455667', 'Calle Independencia 890', 500, 'El acompañamiento de Gesynco nos dio seguridad en todo el proceso.'),
('Salud', 'hospital@sindicato.cl', 'Viña del Mar', NULL, 'Sindicato Funcionarios Hospital Gustavo Fricke', '323456789', 'Álvarez 1450', 800, 'Nos apoyaron en alcanzar beneficios muy valorados por nuestros socios.'),
('Pesca', 'pescadores@caleta.cl', 'Caleta Portales, Valparaíso', NULL, 'Cooperativa de Pescadores de Valparaíso', '987654321', 'Caleta Portales', 120, 'Un gran respaldo en nuestras negociaciones colectivas.'),
('Agricultura', 'frutas@agro.cl', 'Curicó', NULL, 'Sindicato Agrícola Curicó', '752334455', 'Camino Longaví S/N', 600, 'Su asesoría fue fundamental para proteger nuestros derechos.'),
('Tecnología', 'devs@sindicato.cl', 'Las Condes, Santiago', NULL, 'Sindicato de Desarrolladores TI', '224567890', 'Av. Apoquindo 4500', 200, 'Gesynco entiende las nuevas realidades laborales.'),
('Comercio', 'retail@sindicato.cl', 'Maipú, Santiago', NULL, 'Sindicato Trabajadores del Retail', '227777666', 'Pajaritos 234', 1000, 'Conseguimos mejoras en horarios y sueldos gracias a la gestión de Gesynco.');


INSERT INTO miembros_equipo (
  email, experiencia, nombre, foto, profesion, estado, apellido
) VALUES
('siemach@gmail.com', 'Asesor Financiero, Docente Diplomado Negociación Colectiva Universidad Alberto Hurtado. Hace 20 años se dedica a asesorar a sindicatos en sus procesos de negociación colectiva.', 'Pablo', 'images/team/image1.jpg', 'Ingeniero Comercial', 'activo', 'Méndez trincado'),
('annabasis@hotmail.com', 'Periodista con experiencia en el área de gestión de la capacitación y normas de calidad ISO 9001 / NCh 2728. Amplia experiencia en trabajo con organizaciones sociales y comunitarias en la generación de proyectos en fondos concursables.', 'Cecilia', 'images/team/image5.jpg', 'Periodista', 'activo', 'Jiménez espinoza'),
('luispizarro@gmail.com', 'Abogado magíster en Derecho del Trabajo y Seguridad Social de la Universidad Adolfo Ibañez, diplomado en Derecho Colectivo Pontificia Universidad Católica de Valparaíso. Amplia experiencia en derecho laboral, en materias colectivas e individuales.', 'Luis enrique', 'images/team/image12.jpg', 'Abogado', 'activo', 'Pizarro riveros'),
('mariapilar@gmail.com', 'Diplomada en Gestión Estratégica de las Relaciones Laborales. Magíster (e) Género e Intervención Social. Cursando Diplomado en Teorías de Género.', 'María Pilar', 'images/team/image13.jpg', 'Asistente Social', 'activo', 'García Vassallo'),
('carolaavalos@gmail.com', 'Magíster en Marketing. Se desempeña como psicóloga laboral en el Hospital Carlos Van Buren. Cuenta con más de 10 años en el sistema público y privado.', 'Carolina', 'images/team/image14.jpg', 'Psicóloga', 'activo', 'Ávalos cabrera'),
('rene_delgadom@hotmail.com', '36', 'René Enrique', 'images/team/rene-enrique.png', 'Tornero', 'activo', 'Delgado Mondaca');


INSERT INTO negociacion_colectiva (
  cliente_id, trabajadores_cubiertos, fecha_negociacion
) VALUES
(1, 150, '2021-05-01'),
(1, 180, '2023-06-10'),
(1, 200, '2024-05-20'),
(2, 120, '2022-03-15'),
(2, 160, '2024-04-05'),
(3, 90, '2021-08-10'),
(3, 110, '2023-09-12'),
(4, 300, '2020-02-28'),
(4, 350, '2023-03-15'),
(4, 370, '2024-03-10'),
(5, 400, '2019-07-01'),
(5, 420, '2022-07-15'),
(6, 250, '2020-11-11'),
(6, 270, '2023-11-05'),
(7, 100, '2021-01-20'),
(7, 120, '2022-01-25'),
(7, 130, '2023-02-10'),
(8, 220, '2022-06-06'),
(8, 230, '2023-06-10'),
(9, 180, '2020-09-09'),
(9, 200, '2022-10-15'),
(9, 210, '2024-01-01'),
(10, 160, '2021-12-12'),
(10, 170, '2023-12-18'),
(10, 180, '2024-06-01'),
(10, 185, '2024-06-15');


INSERT INTO noticias (
  url_imagen, fecha_publicacion, resumen, slug, texto, titulo, fecha_edicion
) VALUES
('images/news/image1.jpg', '2024-11-23', 'La Comisión de Trabajo del Senado aprobó el cambio al sistema de Multifondos por Fondos Generacionales en la reforma previsional. La propuesta busca mejorar las decisiones de inversión de los afiliados y reducir costos en comisiones indirectas, con el...', 'aprobación-de-fondos-generacionales-y-reformas-al-sistema-de-pensiones-en-chile', 'El 13 de noviembre de 2024, la Comisión de Trabajo y Previsión Social del Senado aprobó, ad referendum, el paso de los actuales Multifondos a los Fondos Generacionales como parte de la reforma previsional propuesta por el Gobierno. Esta nueva estructu...', 'Aprobación de Fondos Generacionales y Reformas al Sistema de Pensiones en Chile', '2024-11-28'),
('images/news/image46.jpg', '2024-11-11', 'En el primer semestre de 2024, 12 empresas fueron condenadas por prácticas antisindicales, gracias a la intervención de la Dirección del Trabajo. Las sanciones incluyeron exclusión del sistema de compras públicas y diversas infracciones laborales. L...', 'doce-empresas-sancionadas-por-prácticas-antisindicales-en-el-primer-semestre-de-2024', 'La Dirección del Trabajo (DT) publicó el miércoles 2 de octubre el informe correspondiente a las sentencias judiciales emitidas durante el primer semestre de 2024 por prácticas que atentan contra la libertad sindical. La mayoría de estas condenas fu...', 'Doce Empresas Sancionadas por Prácticas Antisindicales en el Primer Semestre de 2024', '2024-11-28'),
('images/news/image47.jpg', '2024-11-28', 'La Ley Karin, que combate el acoso laboral, comenzó a aplicarse el 1 de agosto, con nuevas modificaciones que refuerzan la prevención y sanción de estas conductas. La ley también establece cambios en la forma de denunciar y en los protocolos de preve...', 'nueva-ley-karin-contra-el-acoso-laboral-entra-en-vigencia', 'El 1 de agosto de 2024 comenzó a regir la Ley Karin, una normativa diseñada para combatir el acoso laboral, inspirada por la trágica muerte de Karin Salgado, una técnica en enfermería víctima de acoso laboral. En este contexto, la Contraloría Gene...', 'Nueva Ley Karin Contra el Acoso Laboral Entra en Vigencia', NULL),
('images/news/la-noticia-de-siempre.jpg', '2025-08-01', 'a', 'la-noticia-de-siempre', 'a', 'la noticia de siempre', '2025-08-01'),
('images/news/seguro.jpg', '2025-08-01', 'El Gobierno anunció nuevas medidas para simplificar el acceso a seguros de salud privados, buscando mejorar la cobertura y transparencia para los afiliados.', 'mejoras-seguros-salud-2025', 'El Ministerio de Salud presentó el 1 de agosto de 2025 un conjunto de medidas para modernizar el sistema de seguros privados. Las modificaciones incluyen la digitalización de trámites, mayor supervisión de costos y acceso más sencillo a los planes de cobertura. Estas medidas buscan garantizar que los afiliados reciban un servicio más eficiente y transparente.', 'Nuevas Medidas para Mejorar los Seguros de Salud en 2025', '2025-08-02'),
('images/news/fdf.png', '2025-08-02', 'El Consejo de Educación Superior aprobó un plan de becas para estudiantes de regiones, con el objetivo de fomentar la equidad y el acceso a universidades de todo el país.', 'becas-estudiantes-regiones-2025', 'El 2 de agosto de 2025, el Consejo de Educación Superior anunció un programa de becas dirigido a estudiantes de zonas rurales y regionales. El plan contempla financiamiento completo para matrícula y alojamiento, buscando reducir las brechas educativas y brindar igualdad de oportunidades en el acceso a educación superior de calidad.', 'Nuevo Programa de Becas para Estudiantes de Regiones', '2025-08-03');
