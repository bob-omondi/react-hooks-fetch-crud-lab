import React, { useState,useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const[questions, setQuestions] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => setQuestions(data))
    
    
  },[])

 function handleDeleteQuestion(deletedQuestion){
 const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
 setQuestions(updatedQuestions)

 }

 function handleAnswerChange(changedQuestion){

  const updatedQuestions = questions.map(question => {
    if(question.id === changedQuestion.id){
      return changedQuestion
    }else{
      return question
    }
  })
   setQuestions(updatedQuestions)
 }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map(question => {
        return (
          <QuestionItem
          key={question.id}
          question={question}
          onDelete={handleDeleteQuestion}
          onAnswerChange={handleAnswerChange} />
        )
      })}
        {/* display QuestionItem components here after fetching */}</ul>
    </section>
  );
}

export default QuestionList;