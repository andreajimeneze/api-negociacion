import pg from "pg";
import { Sequelize, DataTypes } from "sequelize";
import { User } from "./user.js";
import { News } from "./news.js";
import { Team } from "./team.js";
import { Client } from "./client.js";
import { Negotiation } from "./negotiation.js";

// Si existe DB_URL (como en Vercel), úsala; si no, usa variables locales
let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  const DB_USER = process.env.DB_USER ?? "root";
  const DB_PASS = process.env.DB_PASS ?? "1234";
  const DB_NAME = process.env.DB_NAME ?? "negociacion";
  const DB_HOST = process.env.DB_HOST ?? "localhost";
  const DB_ENGINE = process.env.DB_ENGINE ?? "postgres";
  const DB_PORT = process.env.DB_PORT ?? 5432;

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_ENGINE,
    dialectModule: pg,
    logging: false,
  });
}

// Modelos
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

export { sequelize, UserModel, NewsModel, TeamModel, ClientModel, NegotiationModel };
