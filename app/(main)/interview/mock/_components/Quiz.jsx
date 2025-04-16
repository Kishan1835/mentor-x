"use client"

import { useState, useEffect } from "react"
import { generateQuiz } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



const quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false)

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null))
    }
  },[quizData])

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="grey" />
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );

  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle> Question {currentQuestion + 1} of {quizData.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium">{question.question}</p>

        <RadioGroup className="space-y-2">
          {question.options.map((option, index) => {
            return <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${option}`}>{option}</Label>
            </div>
          })}

        </RadioGroup>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

export default quiz