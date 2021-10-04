import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const BASE_URL = 'http://localhost:4000/questions';
  
  const [page, setPage] = useState("List");
  const [questionsListArr, setQuestionsListArr] = useState([]);

  // GET /questions
  useEffect(() => {
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => setQuestionsListArr(data));
  }, []);

  // wrapper function to be sent down to `QuestionForm` component for adding a new question
  function addNewQuestionWrapperFunc(newQuestion) {
    setQuestionsListArr([...questionsListArr, newQuestion]);
  }

  // wrapper function to be sent down to `QuestionForm` component for deleting an existing question
  function deleteExistingQuestionWrapperFunc(questionToDelete) {
    setQuestionsListArr(
      questionsListArr.filter(
        singleQuestion => singleQuestion.id !== questionToDelete.id
      )
    );
  }

  // wrapper function to be sent down to `QuestionForm` component for
  // updating the correct answer of an existing question
  function updateCorrectAnswerOfExistingQuestionWrapperFunc(questionToUpdate) {
    setQuestionsListArr(
      questionsListArr.map(
        singleQuestion => {
          if (singleQuestion.id === questionToUpdate.id) {
            return questionToUpdate;
          } else {
            return singleQuestion;
          }
        }
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestionWrapperFunc={addNewQuestionWrapperFunc} /> : <QuestionList questionsListArr={questionsListArr} deleteExistingQuestionWrapperFunc={deleteExistingQuestionWrapperFunc} updateCorrectAnswerOfExistingQuestionWrapperFunc={updateCorrectAnswerOfExistingQuestionWrapperFunc} />}
    </main>
  );
}

export default App;
