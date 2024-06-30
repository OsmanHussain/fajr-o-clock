// QuizPrompt.jsx
import React from "react";

function QuizPrompt({
  question,
  options,
  handleOptionChange,
  selectedOption,
  submitAnswer,
  cancelClearAlarm,
  isAnswerCorrect,
}) {
  return (
    <div className="popup">
      <h3>Quiz Question:</h3>
      <p>{question}</p>
      <form>
        {options.map((option) => (
          <div key={option.option}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option.option}
                checked={selectedOption === option.option}
                onChange={handleOptionChange}
              />
              {option.answer}
            </label>
            <br /> {/* Ensures each option appears on a new line */}
          </div>
        ))}
      </form>
      <button onClick={submitAnswer}>Submit</button>
      <button onClick={cancelClearAlarm}>Cancel</button>
      {isAnswerCorrect && (
        <p className="correct-answer">Correct Answer!</p>
      )}
      {!isAnswerCorrect && selectedOption && (
        <p className="incorrect-answer">Incorrect Answer. Try again!</p>
      )}
    </div>
  );
}

export default QuizPrompt;
