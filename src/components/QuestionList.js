import React from "react";
import QuestionItem from "./QuestionItem.js";

function QuestionList({ questionsListArr, deleteExistingQuestionWrapperFunc, updateCorrectAnswerOfExistingQuestionWrapperFunc }) {
  const questionsListArrJSX = questionsListArr.map((singleQuestion, idx) => {
    return (
      <QuestionItem
        key={idx}
        question={singleQuestion}
        deleteExistingQuestionWrapperFunc={deleteExistingQuestionWrapperFunc}
        updateCorrectAnswerOfExistingQuestionWrapperFunc={updateCorrectAnswerOfExistingQuestionWrapperFunc}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsListArrJSX}</ul>
    </section>
  );
}

export default QuestionList;
