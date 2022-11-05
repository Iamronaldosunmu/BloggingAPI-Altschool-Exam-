import supertest from "supertest";
import app from "../../startup/server";
import { Article } from "../../models/article";
import { dummyArticles } from "../fixtures/articles";

const initializeBloggrDB = async () => {
  // await Article.insertMany([
  //   {
  //     state: "published",
  //     author: {
  //       _id: "63652d7c3c1a15d9763910e5",
  //       first_name: "Ronald",
  //       last_name: "DOsunmu",
  //       email: "iamronaldosunmu@gmail.com",
  //     },
  //     title: "My name is Ronald and I ljjk678",
  //     description: "A quick story about the life of the incredible hulk",
  //     read_count: 0,
  //     reading_time: {
  //       reading_time_in_words: "1 min read",
  //       reading_time_in_minutes: 0.44537815126050423,
  //       _id: "63655835785dfe31942d401b",
  //     },
  //     tags: ["drama", "coding", "Netflix"],
  //     body: "There was once a story of an little child. He was the strongest across all the lands. His name was the incredible hulk. He was a green little fellow with the muscles of a lion and the smarts of a Hyena. He loved to write and sing, but all of that didn't matter because everyone that met him was repelled by his unique looks iewoii i ie iw i i ai i wei wri iwe fiw eif wei fiwe iwe i wei wei weci wei ier bie bi eig ei biwe fir iw irw gier wvire gir i eire ier bire bie iwer ge ier g",
  //     createdAt: "2022-11-04T18:21:41.835Z",
  //     updatedAt: "2022-11-04T18:21:41.835Z",
  //     __v: 0,
  //   },
  // ]);
};

beforeAll(async () => {
  await initializeBloggrDB();
});

describe("GET /article", () => {
  it("Should return a list of all the blogs in the db", async () => {
    const response = await supertest(app).get("/article");
    console.log(response);
  });
});
