import { DataSource } from "typeorm"
import { config } from "dotenv"
import { User } from "./entities/user.entity"

config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data source initialized")
  })
  .catch((err) => {
    console.error("Error during Data source initialization", err)
  })
