const connection = require("../database/connector");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    try {
      const ongs = await connection("TB_ONG").select("*");

      return res.status(200).json(ongs);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("TB_ONG").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.status(201).json({ id });
  }
};
