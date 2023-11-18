import { saveQuestionAnswer } from "../utils/api";
import { addAnswerToQuestion } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const NEW_QUESTION_TO_USER = "NEW_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function newQuestionToUser({ id, author }) {
  return {
    type: NEW_QUESTION_TO_USER,
    id,
    author,
  };
}

function addAnswerToUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddAnswerToQuestion(authedUser, qid, answer) {
  return (dispatch) => {
    return saveQuestionAnswer(authedUser, qid, answer).then((success) => {
      dispatch(addAnswerToUser(authedUser, qid, answer));
      dispatch(addAnswerToQuestion(authedUser, qid, answer));
    });
  };
}
