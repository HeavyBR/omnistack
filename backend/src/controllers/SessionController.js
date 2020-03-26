const connection = require('../database/connector');


module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection("TB_ONG").where('id', id).select('name').first();

        if(!ong) {
            return res.status(404).json({message: "None ONG found with this id."});
        }
        return res.status(201).json(ong);
    }
}