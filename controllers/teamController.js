import { TeamModel } from "../models/dbSequelizer.js";
import path from 'path';
import fs from 'fs';
import { generarSlug } from "../utils/generarSlug.js";
import { generateNameFile } from "../utils/generateNameFile.js";

export const getTeam = async (req, res) => {
  try {
    const team = await TeamModel.findAll();

    if (!team) {
      return res
        .status(404)
        .json({ message: "No hay miembros del equipo actualmente" });
    }
    return res
      .status(200)
      .json({ message: "Equipo obtenido exitosamente", data: team });
  } catch (error) {
    res.status(500).json({ error: "Error interno del sistema" });
  }
};

export const getMember = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await TeamModel.findByPk(id);

    if (!member) {
      res.status(404).json({
        message: "Miembro del equipo no existe",
      });
    }
    res.status(200).json({
      message: "Miembro del equipo obtenido exitosamente",
      data: member,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del sistema" });
  }
};

export const createNewMember = async (req, res) => {
  const { nombre, apellido, email, profesion, experiencia, estado } = req.body;

  const firstnameSlug = generarSlug(nombre);
  const lastname = generarSlug(apellido);
  const nameSlug = `${firstnameSlug}-${lastname}`;
  let fotoPath = req.file;

  fotoPath = generateNameFile(
    req.file.originalname,
    req.file.filename,
    nameSlug,
    "team"
  );

  try {
    const newMember = await TeamModel.create({
      nombre,
      apellido,
      email,
      profesion,
      experiencia,
      foto: fotoPath,
      estado,
    });

    res.status(201).json({
      message: "Miembro de equipo creado exitosamente",
      data: newMember,
    });
  } catch (error) {
    console.error("Error al crear miembro", error);
    res.status(500).json({ error: "Error interno del sistema" });
  }
};

export const editMember = async (req, res) => {
  const { nombre, apellido, email, profesion, experiencia, estado } = req.body;

  const { id } = req.params;
  const existingMember = await TeamModel.findByPk(id);

  try {
    const firstnameSlug = generarSlug(nombre);
    const lastnameSlug = generarSlug(apellido);
    const nameSlug = `${firstnameSlug}-${lastnameSlug}`;
    
    const fotoPath = req.file
      ? generateNameFile(
          req.file.originalname,
          req.file.filename,
          nameSlug,
          "team"
        )
      : existingMember.foto;
console.log("NOMBRE Y APELLIDO ARCHIVO", fotoPath);
    if (fotoPath !== existingMember.foto) {
      const oldPath = path.join("public", existingMember.foto);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    if (!existingMember) {
      return res.status(404).json({ message: "Miembro de equipo no existe" });
    }

    const updateMember = await existingMember.update({
      nombre: nombre || existingMember.first_name,
      apellido: apellido || existingMember.last_name,
      email: email || existingMember.email,
      profesion: profesion || existingMember.profession,
      experiencia: experiencia || existingMember.experience,
      foto: fotoPath || existingMember.image,
      estado: estado || existingMember.status,
    });

    res.status(201).json({
      message: "Miembro de equipo actualizado correctamente",
      data: updateMember,
    });
  } catch (error) {
    console.error("Error al crear miembro", error);
    res.status(500).json({ error: "Error interno del sistema" });
  }
};

export const eliminarMiembro = async (req, res) => {
  const { id } = req.params;

  const searchingMember = await TeamModel.findByPk(id);

  try {
    if (!searchingMember) {
      return res
        .status(404)
        .json({ message: "Miembro del equipo no encontrado" });
    }

    if (searchingMember.foto) {
      const fotoPath = path.join("public", searchingMember.foto);
      if (fs.existsSync(fotoPath)) {
        fs.unlinkSync(fotoPath);
      }
    }

    searchingMember.destroy();
    res
      .status(201)
      .json({ message: "Miembro del equipo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar al miembro del equipo", error);
    res.status(500).json({ error: "Error interno del sistema" });
  }
};
