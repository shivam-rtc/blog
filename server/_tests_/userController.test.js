const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../server");
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  
  // Close existing connection before connecting to the test DB
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }

  await mongoose.connect(mongoServer.getUri()); // Removed deprecated options
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("User Signup API", () => {
  it("should register a new user successfully", async () => {
    const res = await request(app).post("/api/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body).toHaveProperty("token");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/signup").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "all field is required");
  });

  it("should return 409 if user already exists", async () => {
    // Create a user first
    const hashedPassword = await bcrypt.hash("password123", 10);
    await new User({
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
    }).save();

    // Try signing up with the same email
    const res = await request(app).post("/api/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(409); // Fixed expected status code
    expect(res.body).toHaveProperty("message", "user already exist");
  });
});
