import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(question));
  
  }

  function handleAnswerChange(e){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application.json"
      },
      body: JSON.stringify(correctIndex)
    })
    .then(r => r.json())
    .then((changedAnswer)=>onAnswerChange(changedAnswer))
    
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e)=> handleAnswerChange(e.target.value)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;