import pg from "pg";
import { Sequelize, DataTypes } from "sequelize";
import { User } from "./user.js";
import { News } from "./news.js";
import { Team } from "./team.js";
import { Client } from "./client.js";
import { Negotiation } from "./negotiation.js";

const DB_USER = process.env.DB_USER ?? "root";
const DB_PASS = process.env.DB_PASS ?? "1234";
const DB_NAME = process.env.DB_NAME ?? "negociacion";
const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_ENGINE = process.env.DB_ENGINE ?? "postgres";
const PORT = process.env.DB_PORT ?? 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_ENGINE,
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const UserModel = User(sequelize, DataTypes);
const NewsModel = News(sequelize, DataTypes);
const TeamModel = Team(sequelize, DataTypes);
const ClientModel = Client(sequelize, DataTypes);
const NegotiationModel = Negotiation(sequelize, DataTypes);

export {
  sequelize,
  UserModel,
  NewsModel,
  TeamModel,
  ClientModel,
  NegotiationModel,
};
