require("dotenv").config();

const { MongoClient } = require("mongodb");
const User = require("../Models/user.model");

describe("Data fetch should return", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("all data in mongodb from month start to now", () => {});

  it.todo("a top game for the interval of data per bay");
});
describe("Data put should", () => {
  it.todo("insert data _id into bay data _id list");
});
