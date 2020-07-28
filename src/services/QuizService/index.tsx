export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & {
  answers: string[];
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

class QuizService {
  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  } ///MOVE later
  
  async fetchQuestions (amount: number, difficulty: Difficulty) {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple` ///TODO move

    const data = await (await fetch(endpoint)).json(); ///TODO Change this for sure

    return data.results.map((question: Question) => ({
      ...question, //TODO hummm
      answers: this.shuffleArray(question.incorrect_answers.concat(question.correct_answer))
    }))

  }
}

export default QuizService;
