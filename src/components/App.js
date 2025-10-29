import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
      .then((data) => setQuestions(data))
  }, [])

  function handleDelete (id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => {
      if (r.ok) {
        // Update state by filtering out the question with the matching ID
        setQuestions((prevQuestions) => 
          prevQuestions.filter(question => question.id !== id)
        );
      }
    })
    .catch(error => console.error("Error deleting question:", error));
  }

  function handleAddQuestion(newQuestion) {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
}

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={handleDelete} />}
    </main>
  );
}

export default App;
