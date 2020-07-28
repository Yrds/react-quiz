import React, { Component, MouseEvent, Fragment} from 'react';
import QuestionCard from './components/QuestionCard/';
import QuizService, { Difficulty, QuestionState } from './services/QuizService/';
import { GlobalStyle, Wrapper } from './App.styles';

//import './styles.css';

interface AppState {
  loading: boolean;
  questions: QuestionState[];
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  gameOver: boolean;
}

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

class App extends Component<any, AppState> {
  public readonly TOTAL_QUESTIONS = 10;
  public readonly state: AppState = {
    loading: false,
    questions: [],
    number: 0,
    userAnswers: [],
    score: 0,
    gameOver: true
  }

  private quizService: QuizService;

  constructor(props: any){
    super(props);
    this.quizService = new QuizService();

    this.startTrivia = this.startTrivia.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }


  async startTrivia (){
    this.setState({
      loading: true,
      gameOver: false,
    });

    const newQuestions =  await this.quizService.fetchQuestions(
      this.TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    this.setState({
      questions: newQuestions,
      score: 0,
      userAnswers: [],
      number: 0,
      loading: false
    });

  }

  checkAnswer(e: MouseEvent<HTMLButtonElement>){
    if(!this.state.gameOver){
      const answer = e.currentTarget.value; //TODO type

      const correct: boolean = this.state.questions[this.state.number].correct_answer === answer;

      if (correct) this.setState({
        score: this.state.score +1
      });

      const answerObject: AnswerObject = {
        question: this.state.questions[this.state.number].question,
        answer,
        correct,
        correctAnswer: this.state.questions[this.state.number].correct_answer
      }

      this.setState({
        userAnswers: [...this.state.userAnswers, answerObject]
      });
    }
  }

  nextQuestion(){
    const nextQuestion = this.state.number + 1;

    if ( nextQuestion === this.TOTAL_QUESTIONS ){ //TODO Can be better
      this.setState({
        gameOver: true
      })
    } else {
      this.setState({
        number: nextQuestion
      })
    }
  }

  /*<QuestionCard />*/
  render(){
    return (
      <Fragment>
        <GlobalStyle/>
        <Wrapper className="App">
          <h1>React Quiz</h1>
      {this.state.gameOver || this.state.userAnswers.length === this.TOTAL_QUESTIONS ? ( 
          <button className="start" onClick={this.startTrivia}>
            Start
          </button>
      ) : null}
      {!this.state.gameOver ? (
          <p className="score">Score: { this.state.score }</p>
      ) : null}
      {this.state.loading && (
          <p>Loading questions...</p>
      )}

      {!this.state.loading && !this.state.gameOver && (
          <QuestionCard
            questionNumber = {this.state.number + 1}
            totalQuestions = {this.TOTAL_QUESTIONS}
            question={this.state.questions[this.state.number].question}
            answers={this.state.questions[this.state.number].answers}
            userAnswer={this.state.userAnswers ? this.state.userAnswers[this.state.number]: undefined}
            callback={this.checkAnswer}
          />
      )}

      {!this.state.gameOver && !this.state.loading && this.state.userAnswers.length === (this.state.number + 1) && this.state.number !== (this.TOTAL_QUESTIONS - 1) ?  (
          <button className="next" onClick={this.nextQuestion}>
            Next Question
          </button>
      ) : null}
      </Wrapper>
    </Fragment>
)
  }
}

export default App;
