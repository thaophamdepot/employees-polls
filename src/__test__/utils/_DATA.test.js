import { _saveQuestion, _saveQuestionAnswer } from "../../utils/_DATA";

describe("Save question success testing.", () => {
  it("will return success with question object if optionOneText, optionTwoText and author are found", async () => {
    const question = {
      optionOneText: "Would you like Village.",
      optionTwoText: "Would you like City.",
      author: "sarahedo",
    };
    var result = await _saveQuestion(question);
    expect(result.author).toEqual("sarahedo");
    expect(result.optionOne.text).toEqual("Would you like Village.");
    expect(result.optionTwo.text).toEqual("Would you like City.");
  });
});

describe("Save question errors testing", () => {
  it("will return error with error message if optionOneText is not found and optionTwoText and author are found", async () => {
    const question = {
      optionTwoText: "Would you like City.",
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("will return error with error message if optionTwoText is not found and optionOneText and author are found", async () => {
    const question = {
      optionOneText: "Would you like Village.",
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("will return error with error message if author is not found and optionTwoText and optionOneText are found", async () => {
    const question = {
      optionTwoText: "Would you like Village.",
      optionOneText: "Would you like City.",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("Save question and answer success testing", () => {
  it("will return success with question object if optionOneText, optionTwoText and author are found", async () => {
    const authedUser = "sarahedo";
    const qid = "am8ehyc8byjqgar0jgpub9";
    const answer = "optionOne";
    var result = await _saveQuestionAnswer(authedUser, qid, answer);
    expect(result).toBeTruthy();
  });
});

describe("Save question and answer errors testing", () => {
  it("will return error with error message if authedUser is not found and qid and answer are found", async () => {
    const authedUser = null;
    const qid = "am8ehyc8byjqgar0jgpub9";
    const answer = "optionOne";
    await expect(_saveQuestionAnswer(authedUser, qid, answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });

  it("will return error with error message if qid is not found and authedUser and answer are found", async () => {
    const authedUser = "sarahedo";
    const qid = null;
    const answer = "optionOne";
    await expect(_saveQuestionAnswer(authedUser, qid, answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });

  it("will return error with error message if answer is not found and authedUser and qid are found", async () => {
    const authedUser = "sarahedo";
    const qid = "am8ehyc8byjqgar0jgpub9";
    const answer = null;
    await expect(_saveQuestionAnswer(authedUser, qid, answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
