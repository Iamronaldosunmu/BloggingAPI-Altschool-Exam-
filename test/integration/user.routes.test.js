import { initialize } from "passport";
import supertest from "supertest";
import app from "../../app.js";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";

const initializeBloggrDB = async () => {
  const saltRounds = 10;
  const hashed_password = await bcrypt.hash("Apassword", saltRounds);
  const user = new User({
    first_name: "Ronald",
    last_name: "Dosunmu",
    email: "ronaldosunmu@gmail.com",
    password: hashed_password,
  });
  await user.save();
};

const clearBloggerDb = async () => {
  await User.deleteMany({});
};

beforeAll(async () => {
  await initializeBloggrDB();
});

describe("POST /user/signup", () => {
  it("POST /user/signup", async () => {
    const newUser = {
      first_name: "Ronald",
      last_name: "Dosunmu",
      email: "ronaldosunmu@gmail.com1",
      password: "Apassword",
    };
    const faultyData = {
      first_name: "R",
      last_name: "Dosunmu",
      email: "ronadosunmu@gmail.com",
      password: "Apassword",
    };

    const response_1 = await supertest(app)
      .post("/user/signup")
      .send(faultyData);
    expect(response_1.status).toBe(400);
    expect(response_1.body.message).toBe(
      '"first_name" length must be at least 3 characters long'
    );

    const response_2 = await supertest(app).post("/user/signup").send(newUser);
    expect(response_2.status).toBe(201);
    expect(response_2.body.message).toBe("Sign up Successful!");
  });
});

describe("POST /user/login", () => {
  it("Should correctly login the user if the password is correct", async () => {
    const user = {
      email: "ronaldosunmu@gmail.com",
      password: "Apassword",
    };
    const response = await supertest(app).post("/user/login").send(user);
    expect(response.status).toBe(200);
  });

  it("Should not log user in with an incorrect password", async () => {
    const user = {
      email: "ronaldosunmu@gmail.com",
      password: "Incorrect Password",
    };
    const response = await supertest(app).post("/user/login").send(user);
    expect(response.status).toBe(400);
  });

  it("Should not log user in with incorrect email", async () => {
    const user = {
      email: "ronaldosunmu@gmail.co",
      password: "Incorrect Password",
    };
    const response = await supertest(app).post("/user/login").send(user);
    expect(response.status).toBe(400);
  });

  it("Should Validate the body of the request first", async () => {
    const user = {
      email: "ro",
      password: "Incorrect Password",
    };
    const response = await supertest(app).post("/user/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("\"email\" must be a valid email")
  });

});
afterAll(async () => {
  await clearBloggerDb();
});
