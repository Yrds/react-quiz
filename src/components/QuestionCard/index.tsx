import React, { Component, MouseEvent } from 'react';
import { AnswerObject } from '../../App';
import { Wrapper, ButtonWrapper } from './styles';

//import './styles.css';

type QuestionCardProps = {
  question: string;
  answers: string[];
  callback: (e: MouseEvent<HTMLButtonElement>) => void; //TODO type
  userAnswer: AnswerObject | undefined; //TODO remove undefined
  questionNumber: number; //TODO move
  totalQuestions: number; //TODO move
}

class QuestionCard extends Component<QuestionCardProps> {
  render(){
    return (
      <Wrapper className="QuestionCard">
        <p className="number">
          Question: {this.props.questionNumber} / {this.props.totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: this.props.question}}/>
        <div>
          {this.props.answers.map(answer => (
            <ButtonWrapper
              key={answer}
              correct={this.props.userAnswer?.correctAnswer === answer}
              userClicked={this.props.userAnswer?.answer === answer}
            >
              <button value={answer} disabled={this.props.userAnswer ? true : false} onClick={this.props.callback}>
                <span dangerouslySetInnerHTML={{__html: answer}} />
              </button>
            </ButtonWrapper>
          ))}
        </div>
      </Wrapper>
    )
  }
}

export default QuestionCard;
