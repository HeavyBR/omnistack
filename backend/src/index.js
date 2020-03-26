const express = require('express');
const routes = require("./routes");
const cors = require('cors');

const app = express();

//Cors
app.use(cors());

//Body parser to json
app.use(express.json());

//Rotas
app.use(routes);

app.listen(5000);



