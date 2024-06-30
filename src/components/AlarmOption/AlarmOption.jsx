// AlarmOption.jsx
import React, { useContext, useState } from "react";
import "./AlarmOption.css";
import { minutesNumber, hourNumber } from "../../func";
import useSelect from "../../hook/useSelect";
import { AlarmContext } from "../context/ContextAlarm";
import QuizPrompt from "./QuizPrompt";
import questions from "./questions";

function AlarmOption() {
  const [hour, setHour] = useSelect("Hour");
  const [minutes, setMinutes] = useSelect("Minutes");
  const [amPmOption, setAmPmOption] = useSelect("Am-Pm");
  const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } =
    useContext(AlarmContext);

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * questions.length)
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const setAlarm = () => {
    if (hasAlarm) {
      setShowQuiz(true);
      return;
    }

    if (
      !hour.includes("Hour") &&
      !minutes.includes("Minutes") &&
      !amPmOption.includes("Am-Pm")
    ) {
      setHasAlarm(true);
      setAlarmTime(`${hour}:${minutes} ${amPmOption}`);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const clearAlarm = () => {
    pauseAlarm();
    setAlarmTime("");
    setHasAlarm(false);
    setShowQuiz(false); // Close the quiz after submission
  };

  const cancelClearAlarm = () => {
    setShowQuiz(false);
  };

  const submitAnswer = () => {
    if (selectedOption === questions[currentQuestionIndex].options.find(option => option.correct)?.option) {
      setIsAnswerCorrect(true);
      clearAlarm();
    } else {
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && "disable"}`}>
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${hasAlarm && "play"}`}
      >
        {hasAlarm ? "Clear Alarm" : "Set Alarm"}
      </button>

      {showQuiz && (
        <QuizPrompt
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
          submitAnswer={submitAnswer} // Pass submitAnswer function as prop
          cancelClearAlarm={cancelClearAlarm} // Pass cancelClearAlarm function as prop
          isAnswerCorrect={isAnswerCorrect} // Pass isAnswerCorrect state as prop
        />
      )}

      {isAnswerCorrect && (
        <p className="correct-answer">Correct Answer!</p>
      )}
      {!isAnswerCorrect && selectedOption && (
        <p className="incorrect-answer">Incorrect Answer. Try again!</p>
      )}
    </div>
  );
}

export default AlarmOption;
