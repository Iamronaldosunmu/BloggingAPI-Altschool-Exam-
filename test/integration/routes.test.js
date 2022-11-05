import { initialize } from "passport";
import supertest from "supertest";
import app from "../../app.js";
import { User } from "../../models/user.js";
import { Article } from "../../models/article.js";
import bcrypt from "bcrypt";

let authorization_string = null;
let article_id = null;
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

  const loginUser = {
    email: "ronaldosunmu@gmail.com",
    password: "Apassword",
  };
  const loggInresponse = await supertest(app)
    .post("/user/login")
    .send(loginUser);
  const token = loggInresponse.body.token;
  authorization_string = "Bearer " + token;
  // Create one dummy article
  let article = {
    title: "My title is correct, yes it is!",
    body: "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
    description:
      "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
    tags: ["drama", "coding", "Netflix"],
  };
  const response = await supertest(app)
    .post("/article")
    .send(article)
    .set("Authorization", authorization_string);

  article_id = response.body.article._id;
  const publishResponse = await supertest(app)
    .post(`/article/${article_id}/publish`)
    .set("Authorization", authorization_string);
  console.log(publishResponse.body);
};

const clearBloggerDb = async () => {
  await User.deleteMany({});
  await Article.deleteMany({});
};

beforeAll(async () => {
  await initializeBloggrDB();
});

describe("POST /user/signup", () => {
  it("Should validate the user first", async () => {
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
  });

  it("Should sign up a user successfully if he passes the validation", async () => {
    const newUser = {
      first_name: "Ronald",
      last_name: "Dosunmu",
      email: "ronaldosunmu@gmail.com1",
      password: "Apassword",
    };
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
    expect(response.body.message).toBe('"email" must be a valid email');
  });
});

describe("POST /article", () => {
  it("Should not allow a user that's not logged in to create an article", async () => {
    const response = await supertest(app).post("/article");
    expect(response.status).toBe(401);
  });

  it("Should validate the body of the request if the user is logged in", async () => {
    let article = {
      title: "M",
      body: "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
      description:
        "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
      tags: ["drama", "coding", "Netflix"],
    };
    const user = {
      email: "ronaldosunmu@gmail.com",
      password: "Apassword",
    };
    const loggInresponse = await supertest(app).post("/user/login").send(user);
    const token = loggInresponse.body.token;
    const authorization_string = "Bearer " + token;
    const response = await supertest(app)
      .post("/article")
      .send(article)
      .set("Authorization", authorization_string);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"title" length must be at least 3 characters long'
    );
  });

  it("Should create the post if the user is logged in and there are no validation errors", async () => {
    let article = {
      title: "My title is correct",
      body: "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
      description:
        "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
      tags: ["drama", "coding", "Netflix"],
    };
    const response = await supertest(app)
      .post("/article")
      .send(article)
      .set("Authorization", authorization_string);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Article created successfully!");
  });
});

describe("POST /article/:id/publish", () => {
  it("Should not allow user to publish if he isn't logged in and the author", async () => {
    const article = await Article.findOne({ title: "My title is correct" });
    const response = await supertest(app).post(
      `/article/${article._id}/publish`
    );
    expect(response.status).toBe(401);
  });
  it("Should not allow user to publish if he isn't logged in and the author", async () => {
    const article = await Article.findOne({ title: "My title is correct" });
    const response = await supertest(app)
      .post(`/article/${article._id}/publish`)
      .set("Authorization", authorization_string);
    expect(response.status).toBe(200);
  });
});

describe("GET /article/:id", () => {
  it("Should get an article successfully if it is published", async () => {
    const response = await supertest(app).get(`/article/${article_id}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /article", () => {
  it("Should get all the published articles in the db", async () => {
    const response = await supertest(app).get(`/article`);
    console.log(response.body.length, response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("PUT /article/:id", () => {
  it("Should successfully edit an article", async () => {
    let article = {
      title: "My title is correct, init",
      body: "There was once a story of an little child s sfsf sf rserw f ewf we ew. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie i wkl efkwe flewfklew flkwe flkwe fklwe fkwe flwek flwe fklwef klwe flkwe flkwe flkwe fwkle fklwe fklwe fklwe flkew fkelw fklwe fklwe fkewl flwke flkwe flwek fwkel flewk flkwe fklwe flwer ge ier gegeroy gsxa qot",
      description:
        "A quick story about the life of the incredible hulk lker flke rflkr lk etlk ytlkr klerg erl gklrt hkl vdfkl vk bklerv eklr vkerl vkre gtkr hlk tkl fvlkwr fkelr klv erlk gkle rgkler glekr g",
      tags: ["drama", "coding", "Netflix"],
    };
    const response = await supertest(app)
      .put(`/article/${article_id}`)
      .send(article)
      .set("Authorization", authorization_string);
    expect(response.status).toBe(200);
  });
});

describe("GET /authors/my_articles", () => {
  it("Should get all the articles by that author", async () => {
    const response = await supertest(app)
      .get(`/article/authors/my_articles`)
      .set("Authorization", authorization_string);
    console.log(response.body.length, response.body);
    expect(response.status).toBe(200);
    expect(response.body.articles.length).toBe(2);
  });
});

describe("DELETE /article/:id", () => {
  it("Should get an article successfully if it is published", async () => {
    const response = await supertest(app)
      .delete(`/article/${article_id}`)
      .set("Authorization", authorization_string);
    expect(response.status).toBe(202);
  });
});

afterAll(async () => {
  await clearBloggerDb();
});
