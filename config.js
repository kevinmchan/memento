const env = process.env;

export default {
  port: env.PORT || 8080,
  host: env.HOST || "0.0.0.0",
  mongo_connection: env.MEMENTO_MODE === "local" ? "mongodb://localhost:27017/memento" : env.MONGO_DB_URL,
  storage_account: "mementos",
  storage_key: env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
};
