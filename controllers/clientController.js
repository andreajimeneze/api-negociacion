import { ClientModel } from "../models/dbSequelizer.js";
import { generateNameFile } from "../utils/generateNameFile.js";
import { generarSlug } from "../utils/generarSlug.js";
import path from 'path';
import fs from 'fs';

export const getClients = async (req, res) => {
    try {
        const clients = await ClientModel.findAndCountAll();
        const totalMiembros = await ClientModel.sum('numeroMiembros');

        if(!clients) {
            return res.status(404).json({message: 'No hay clientes para mostrar'});
        }

        return res.status(200).json({ 
            message: 'Clientes obtenidos exitosamente', 
            rows: clients.rows,
            count: clients.count,
            totalMiembros });
    } catch(error) {
        res.status(500).json({error: 'Error interno del sistema'});
    }
}

export const getOneClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await ClientModel.findByPk(id);

        if(!client) {
            return res.status(404).json({ message: 'Cliente no existe'});
        }

        return res.status(200).json({message: 'Cliente obtenido exitosamente', data: client});
    } catch(error) {
        res.status(500).json({error: 'Error interno del sistema'});
    }
}

export const createNewClient = async (req, res) => {
    
    const { nombre, actividad_economica, direccion, locality, telefono, email, numeroMiembros, testimonio } = req.body;

    const nameSlug = generarSlug(nombre);
    let logoPath = req.file;

    logoPath = generateNameFile(req.file.originalname, req.file.filename, nameSlug, "clients" );

    try{
        const newClient = await ClientModel.create({
            nombre,
            actividad_economica,
            direccion,
            locality,
            telefono,
            email,
            logo: logoPath,
            numeroMiembros,
            testimonio
        })

        res.status(201).json({ message: 'Nuevo cliente creado exitosamente', data: newClient});
    } catch(error) {
        console.error("error al crear cliente", error);
        res.status(500).json({error: 'Error interno del sistema'});
    }
}

export const editClient = async (req, res) => {
    const { nombre, actividad_economica, direccion, locality, telefono, email, numeroMiembros, testimonio } = req.body;

    const { id } = req.params;

    try {
        const existingClient =  await ClientModel.findByPk(id);

        const nameSlug = generarSlug(nombre);

        const logoPath = req.file ?
        generateNameFile(
            req.file.originalname,
            req.file.filename,
            nameSlug,
            "clients"
        ) : existingClient.logo;

        if(!existingClient) {
            return res.status(404).json({ message: 'No se puede modificar cliente porque no existe'});
        }
        const updateClient = await existingClient.update({
            nombre: nombre || existingClient.name,
            actividad_economica: actividad_economica || existingClient.activity,
            direccion: direccion || existingClient.address,
            locality: locality || existingClient.locality,
            telefono: telefono || existingClient.phoneNumber,
            email: email || existingClient.email,
            logo: logoPath || existingClient.logo,
            numeroMiembros: numeroMiembros || existingClient.memberNumber,
            testimonio: testimonio || existingClient.testimonio
        })
        res.status(201).json({message: 'Cliente modificado exitosamente', data: updateClient});
    } catch(error) {
        console.error("error al crear cliente", error);
        res.status(500).json({error: 'Error interno del sistema'});
    }
}

export const eliminarCliente = async (req, res) => {
    const { id } = req.params;

    const searchingCliente = await ClientModel.findByPk(id);
    
try { 
    if(!searchingCliente) {
        return res.status(404).json({ error: 'Cliente no existe'});
    }

  if (searchingCliente.logo) {
      const logoPath = path.join("public", searchingCliente.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }
    await searchingCliente.destroy();
    res.status(201).json({message: 'Usuario eliminado correctamente'});
} catch(error) {
    console.error('Error al eliminar cliente', error);
    res.status(500).json({ error: 'Error interno del sistema'});
}
}