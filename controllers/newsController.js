import { NewsModel } from "../models/dbSequelizer.js";
import fs from "fs";
import path, { join } from "path";
import { generarSlug } from "../utils/generarSlug.js";
import { generateNameFile } from "../utils/generateNameFile.js";

export const getNews = async (req, res) => {
  try {
    const allNews = await NewsModel.findAll();
    if (allNews) {
      return res.status(200).json(allNews);
    } else {
      res.status(404).json({ message: "No hay noticias actualmente" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getOneNews = async (req, res) => {
  const { id } = req.params;
  try {
    const oneNews = await NewsModel.findByPk(id);
    if (oneNews) {
      return res.status(200).json(oneNews);
    } else {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createNews = async (req, res) => {
  const { text, resume, title, slug } = req.body;
  const currentDate = new Date();
  const generatedSlug = generarSlug(slug); // usa este mismo en todos lados

  let imagePath = req.file;

  imagePath = generateNameFile(
    req.file.originalname,
    req.file.filename,
    generatedSlug,
    "news"
  );

  try {
    const newNews = await NewsModel.create({
      titulo: title,
      resumen: resume,
      texto: text,
      slug: generatedSlug,
      fecha_publicacion: currentDate,
      fecha_edicion: null,
      url_imagen: imagePath,
    });

    res
      .status(201)
      .json({ message: "Noticia creada exitosamente", data: newNews });
  } catch (error) {
    console.error("Error en createNews:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, resumen, titulo, slug } = req.body;
    const existingNews = await NewsModel.findByPk(id);
    const generatedSlug = generarSlug(slug); 

    const imagePath = req.file
      ? generateNameFile(
          req.file.originalname,
          req.file.filename,
          generatedSlug,
          "news"
        )
      : existingNews.url_imagen;

    if (imagePath !== existingNews.url_imagen) {
      const oldPath = path.join("public", existingNews.url_imagen);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    if (!existingNews) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    const editedNews = await existingNews.update({
      titulo: titulo || existingNews.titulo,
      resumen: resumen || existingNews.resumen,
      texto: texto || existingNews.texto,
      slug: generatedSlug || existingNews.slug,
      url_imagen: imagePath || existingNews.url_imagen,
      fecha_publicacion: existingNews.fecha_publicacion,
      fecha_edicion: new Date(),
    });

    return res.status(200).json({
      message: "Noticia editada correctamente",
      data: editedNews,
    });
  } catch (error) {
    console.error("Error en editNews:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteNews = async (req, res) => {
  console.log("Petición DELETE recibida para noticia id:", req.params.id);
  try {
    const { id } = req.params;
    const noticia = await NewsModel.findByPk(id);

    if (!noticia) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    if (noticia.url_imagen) {
      const imagePath = path.join("public", noticia.url_imagen);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }


    await noticia.destroy();

    res.status(200).json({ message: "Noticia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
