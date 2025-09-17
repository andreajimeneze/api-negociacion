import { NegotiationModel } from "../models/dbSequelizer.js";

export const countNegotiations = async (req, res) => {
    try {
        const countNegotiations = await NegotiationModel.count();

    res.status(200).json({message: 'negociaciones contadas con éxito', countNegotiations});
    
    } catch(error) {
        res.status(500).json({message: 'Error interno del sistema'});
    }
}