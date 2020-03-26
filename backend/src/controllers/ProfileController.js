const connection = require("../database/connector");

module.exports = {
  async index(req, res) {
    const ong_id = request.headers.authorization;

    const incidents = connection("TB_INCIDENT")
      .where("ong_id", ong_id)
      .select("*");

    return res.status(200).json(incidents);
  }
};
