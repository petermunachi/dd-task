module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Pass12345&",
  DB: "DD_task_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};