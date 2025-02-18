import { cn } from "@/lib/utils";
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
      setItem(e.target.value);
    }
    function handleOptionAChange(e) {
      setQuestion(e.target.value);
    }
    function handleOptionBChange(e) {
      setOptionA(e.target.value);
    }
    function handleOptionCChange(e) {
      setOptionB(e.target.value);
    }
    function handleCorrectChange(e) {
      setOptionC(e.target.value);
    }
    function handleExplanationChange(e) {
      setExplanation(e.target.value);
    }
    function handleSubmit() {
      let formData = {
        question: question,
        optionA: optionA,
        optionB: optionB,
        optionC: optionC,
        explanation: explanation,
        correct: correct,
      };
      //send this to db
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
                    className="text-white-400"
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
                    className="text-white-400"
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
                    className="text-white-400"
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
                    className="text-white-400"
                    id="optionC"
                    type="text"
                    placeholder="Option C"
                    required
                    onChange={handleOptionCChange}
                  />
                </div>
                <div className="grid gap-2 text-white-400">
                  <Label htmlFor="correct">Correct Answer</Label>
                  <Select
                    id="correct"
                    className="text-white-400"
                    onValueChange={handleCorrectChange}
                  >
                    <SelectTrigger className="text-white-400">
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
                    className="text-white-400"
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