import React from "react";

function QuestionItem({ question, handleBackDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
fetch (`http://localhost:4000/questions/${id}`, {
  method: 'DELETE',
})
.then(r => r.json())
.then((item) => handleBackDelete(id))

  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
