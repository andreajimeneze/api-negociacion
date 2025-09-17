import { UserModel } from "../models/dbSequelizer.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    if (password !== user.contrasenia) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    if (user) {
      if (user.rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
      }
    }
    return res.status(200).json({ message: "Usuario logueado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await UserModel.findOne({ where: { email } });
  const rol = "user";

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "la contraseña no son iguales" });
    }

    if (user) {
      return res
        .status(409)
        .json({ error: "Usuario ya existe en nuestra base de datos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await UserModel.create({
      nombre: name,
      email,
      contrasenia: hashedPassword,
      rol,
    });

    res
      .status(201)
      .json({
        message: `${userCreated.nombre}, su usuario ha sido creado correctamente`,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
