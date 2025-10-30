import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
fetch (`http://localhost:4000/questions/${id}`, {
  method: 'DELETE',
})
.then(r => {
  
      if (r.ok) {
        // call the parent function
        onDeleteQuestion(id); 
      } else {
        console.error("Failed to delete question on server.");
      }
    })
    .catch(error => console.error("Error during delete operation:", error));
  }


  function handleUpdateCorrectIndex(event) {
    const newCorrectIndex = parseInt(event.target.value); // Get new index as number

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
    .then(r => {
      if (!r.ok) {
        console.error("Failed to update correct answer on server.");
      }
    })
    .catch(error => console.error("Error patching question:", error));
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
        <select defaultValue={correctIndex} onChange={handleUpdateCorrectIndex} aria-label="Correct">{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
