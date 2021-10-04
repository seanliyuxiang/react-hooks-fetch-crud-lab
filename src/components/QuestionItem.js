import React from "react";

function QuestionItem({ question, deleteExistingQuestionWrapperFunc, updateCorrectAnswerOfExistingQuestionWrapperFunc }) {
  const BASE_URL = 'http://localhost:4000/questions';

  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteQuestionHandler() {
    fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => deleteExistingQuestionWrapperFunc(question))
  }

  function changeCorrectAnswerHandler(event) {
    fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({correctIndex: parseInt(event.target.value)})
    })
    .then(response => response.json())
    .then(data => updateCorrectAnswerOfExistingQuestionWrapperFunc(data));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={changeCorrectAnswerHandler}
        >
          {options}
        </select>
      </label>
      <button onClick={deleteQuestionHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
