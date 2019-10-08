const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chat_app',
  password: 'password',
  port: 5432
});

const getMessages = (request, response) => {
  pool.query('SELECT * FROM Messages ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createMessage = (request, response) => {
  const { name, message } = request.body;

  pool.query(
    'INSERT INTO Messages (name, message) VALUES ($1, $2)',
    [name, message],
    (error, result) => {
      if (error) {
        throw error;
      }
      io.emit('message', req.body);
      res.sendStatus(200);
      response.status(201).send(`Message added with ID: ${result.insertId}`);
    }
  );
};

module.exports = {
  getMessages,
  createMessage
};
