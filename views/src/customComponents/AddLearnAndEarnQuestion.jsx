import { cn } from "@/lib/utils";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
function AddLearnAndEarnQuestion({ className, ...props }) {
  let [question, setQuestion] = useState("");
  let [optionA, setOptionA] = useState("");
  let [optionB, setOptionB] = useState("");
  let [optionC, setOptionC] = useState("");
  let [explanation, setExplanation] = useState("");
  let [correct, setCorrect] = useState("");
  function handleQuestionChange(e) {
    setQuestion(e.target.value);
  }
  function handleOptionAChange(e) {
    setOptionA(e.target.value);
  }
  function handleOptionBChange(e) {
    setOptionB(e.target.value);
  }
  function handleOptionCChange(e) {
    setOptionC(e.target.value);
  }
  function handleCorrectChange(value) {
    setCorrect(value);
  }
  function handleExplanationChange(e) {
    setExplanation(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let formData = {
      business_id: props.id,
      question: question,
      answers: {
        choices: {
          "A": optionA,
          "B": optionB,
          "C": optionC,
        },
        explanation: explanation,
        correct: correct,
      }
    };
    axios.post('/api/multiple-choice', formData)
  }

  return (
    <div
      className={cn("flex flex-col gap-6 border-transparent", className)}
      {...props}
    >
      <Card className="bg-[#333] text-white mb-4 border-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">New Question</CardTitle>
          <CardDescription className="text-gray-400">
            Create New Learn and Earn Question
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  className="text-white"
                  id="question"
                  type="text"
                  placeholder="Enter Question"
                  required
                  onChange={handleQuestionChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="optionA">Option A</Label>
                <Input
                  className="text-white"
                  id="optionA"
                  type="text"
                  placeholder="Option A"
                  required
                  onChange={handleOptionAChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="optionB">Option B</Label>
                <Input
                  className="text-white"
                  id="optionB"
                  type="text"
                  placeholder="Option B"
                  required
                  onChange={handleOptionBChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="optionC">Option C</Label>
                <Input
                  className="text-white"
                  id="optionC"
                  type="text"
                  placeholder="Option C"
                  required
                  onChange={handleOptionCChange}
                />
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="correct">Correct Answer</Label>
                <Select
                  id="correct"
                  className="text-white"
                  onValueChange={handleCorrectChange}
                >
                  <SelectTrigger className="text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="explanation">Explanation</Label>
                <Input
                  className="text-white"
                  id="explanation"
                  type="text"
                  placeholder="Explanation"
                  required
                  onChange={handleExplanationChange}
                />
              </div>
            </div>
            <br />

            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddLearnAndEarnQuestion