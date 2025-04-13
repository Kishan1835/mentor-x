"use client"

import { useState } from "react"
import { generateQuiz } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false)

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  if (!quizData) {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Ready to test your knowledge </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This quiz contains 10 questions specfic to your industry and skills. Take your time and choose the best answer for each question</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Start Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    )

  }
  return (
    <div>quiz</div>
  )
}

export default quiz