import React, { useEffect, useState } from 'react'
import axios from "axios";
import Score from './Score';


function Quiz() {
    //create a state for storing dta
    const [quizdata, setquizdata] = useState([])
    //create to get next set q and store q no
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setscore] = useState(0)
    const [clickedOption, setClickedOption] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    
  const [showResult, setShowResult] = useState(false);
    const getdata = async () => {
        const { data } = await axios.get('/db.json')
        setquizdata(data.quiz);//data inbuild ayitte result.data valuen pakkarm
    }
    useEffect(() => {
        getdata();
    }, []);
    console.log(quizdata);
    const newQuestion = () => {
        updateScore()//button click score update akkm
        if (currentQuestion < quizdata.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
        setClickedOption(0);
    }
    const updateScore = () => {
        //console.log("Clicked Option:", clickedOption);
       // console.log("Correct Answer:", quizdata[currentQuestion].answer);
        if (clickedOption === quizdata[currentQuestion].answer) {
            setscore(score + 1);
        } else {
          setWrongAnswer(wrongAnswer + 1);
        }
      };
      console.log(score);
      console.log("ahdh",clickedOption);
      const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setscore(0);
        setClickedOption(0);
        setWrongAnswer(0);
      };
    return (
        <div>
            <h2 className='heading-txt'>Quiz App</h2>
            {quizdata.length>0? <div className='container'>
                {
                    showResult?<Score score={score} wrongAnswer={wrongAnswer} totalScore={quizdata.length} tryAgain={resetAll} />:<>
                         <div className='question'>
                    <span id="quetion-number">{currentQuestion + 1} .</span>
                    <span id="quetion-txt">{quizdata[currentQuestion]?.question}</span>

                </div>
                <div className='option-container'>
                    {
                        quizdata[currentQuestion]?.options.map((option, i) => {

                            return <button //className='option-btn' 
                            className={`option-btn ${
                                clickedOption == i + 1 ? "checked" : null
                              }`}
                            onClick={() => setClickedOption(i + 1)}>

                                {option}
                            </button>
                        })
                    }

                </div>
                <button onClick={newQuestion} type="button" id="next-button">
                    Next
                </button>
                    </>

                }
               

            </div>:<h1>no data found</h1>}
           
        </div>
    )
}

export default Quiz