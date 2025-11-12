import pg from "pg";
import { Sequelize, DataTypes } from "sequelize";
import { User } from "./user.js";
import { News } from "./news.js";
import { Team } from "./team.js";
import { Client } from "./client.js";
import { Negotiation } from "./negotiation.js";

// Variables de entorno con valores por defecto
const DB_USER = process.env.DB_USER ?? "root";
const DB_PASS = process.env.DB_PASS ?? "1234";
const DB_NAME = process.env.DB_NAME ?? "negociacion";
const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_ENGINE = process.env.DB_ENGINE ?? "postgres";
const DB_PORT = process.env.DB_PORT ?? 5432;

// Conexión sin autenticar aún
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_ENGINE,
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl:
      process.env.DB_SSL === "true" || process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
});

// ⚠️ NO llames a sequelize.authenticate() aquí
// ni sincronices, eso lo haremos bajo demanda en las rutas si hace falta.

// Inicialización perezosa ("lazy") de modelos
let initialized = false;
let models = {};

export const getModels = () => {
  if (!initialized) {
    models = {
      UserModel: User(sequelize, DataTypes),
      NewsModel: News(sequelize, DataTypes),
      TeamModel: Team(sequelize, DataTypes),
      ClientModel: Client(sequelize, DataTypes),
      NegotiationModel: Negotiation(sequelize, DataTypes),
    };
    initialized = true;
  }
  return models;
};

// Compatibilidad con importaciones antiguas
const { UserModel, NewsModel, TeamModel, ClientModel, NegotiationModel } = getModels();

export { UserModel, NewsModel, TeamModel, ClientModel, NegotiationModel };
