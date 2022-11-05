import { calculateReadingTime } from "../../utils/CalculateReadingTime.js";
import { isValidObjectId } from "../../utils/ValidateObjectId.js";

describe("Valid Object Id Utility function", () => {
  it("should correctly test the validity of a mongoose object id", () => {
    expect(isValidObjectId("a")).toBe(false);
    expect(isValidObjectId("6365586d785dfe31942d402f")).toBe(true);
  });
});

describe("Calculate Reading Time Utility Function", () => {
  it("should correctly return an object of the reading_time", () => {
    console.log(
      calculateReadingTime(
        "a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a"
      )
    );
    expect(
      calculateReadingTime(
        "a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a"
      )
    ).toStrictEqual({
      reading_time_in_words: "1 min read",
      reading_time_in_minutes: 0.2815126050420168,
    });
  });
});
