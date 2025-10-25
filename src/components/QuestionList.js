import React,{useState, useEffect} from "react"
import QuestionItem from "./QuestionItem";


function QuestionList() {

  const [questions, setQuestions] = useState([])
useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then(r => r.json())
  .then(data => setQuestions(data))
},[])

function handleBackDelete (id) {
  const updatedQuestions = questions.filter( question =>  question.id !== id)
  setQuestions(updatedQuestions)
}



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
      questions.map(question => (
        <QuestionItem
        key={question.id}
        question={question}
        handleBackDelete={handleBackDelete}
        />
      )) 
    }</ul>
    </section>
  );
}

export default QuestionList;
