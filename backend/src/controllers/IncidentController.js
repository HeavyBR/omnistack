const connection = require("../database/connector");
const { response } = require("express");

module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection("TB_INCIDENT").insert({
      title,
      description,
      value,
      ong_id
    });

    return res.status(201).json({ id });
  },

  async index(req, res) {

    const {page = 1} = req.query;

    const [count] = await connection('TB_INCIDENT').count();

    const incidents = await connection("TB_INCIDENT")
    .join('TB_ONG', "TB_ONG.id", "=", "TB_INCIDENT.ong_id")
    .limit(5)
    .offset((page - 1 ) * 5)
    .select(["*"], "TB_ONG.name", "TB_ONG.email", "TB_ONG.whatsapp", "TB_ONG.city", "TB_ONG.uf");

    res.header('X-Total-Count', count['count(*)']);
    
    res.status(200).json({ incidents });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("TB_INCIDENT")
      .where("id", id)
      .select("ong_id")
      .first();
    if (!incident)
      return res
        .status(404)
        .json({ error: "That incident doens't exists for this ONG." });

    
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await connection("TB_INCIDENT")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
