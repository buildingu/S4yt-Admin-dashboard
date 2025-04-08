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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import ToastComponent from "@/components/ToastComponent";
import { Padding } from "@mui/icons-material";

function AddLearnAndEarnQuestion({ className, ...props }) {
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    explanation: "",
    correct: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false); // Controls modal visibility
  const toastRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCorrectChange = (value) => {
    setFormData({ ...formData, correct: value });
  };

  const clearInput = () => {
    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      explanation: "",
      correct: "",
    });
  };

  const countUpdates = async () => {
    const response = await axios.get(`/api/multiple-choice-count/${props.id}`);
    if (response.data.count >= 3) setDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitData = {
      question: formData.question,
      answers: {
        choices: {
          A: formData.optionA,
          B: formData.optionB,
          C: formData.optionC,
        },
        explanation: formData.explanation,
        correct: formData.correct,
      },
    };
   
    try {
      const response = await axios.post(`/api/multiple-choice/${props.id}`, submitData);
      console.log(response.data.newQuestion)
      props.setQuestions((prev) => [
        ...prev, 
        response.data.newQuestion,      
      ]);
      clearInput();
      toastRef.current.triggerToast();
      countUpdates();
      setOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Button to trigger modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="w-full flex justify-end pt-5 pr-5 pb-5">
          <Button style={{width:'25%', backgroundColor:'#18181b'}}>Create New Question</Button>
          </div>
        </DialogTrigger>
        
        {/* Modal Content */}
        <DialogContent className="bg-[#333] text-white border-transparent">
          <DialogHeader>
            <DialogTitle className="text-2xl">New Question</DialogTitle>
            <CardDescription className="text-gray-400">
              Create a New Learn and Earn Question
            </CardDescription>
          </DialogHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  disabled={disabled}
                  className="text-white"
                  id="question"
                  type="text"
                  placeholder="Enter Question"
                  required
                  value={formData.question}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="optionA">Option A</Label>
                <Input
                  disabled={disabled}
                  className="text-white"
                  id="optionA"
                  type="text"
                  placeholder="Option A"
                  required
                  value={formData.optionA}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="optionB">Option B</Label>
                <Input
                  disabled={disabled}
                  className="text-white"
                  id="optionB"
                  type="text"
                  placeholder="Option B"
                  required
                  value={formData.optionB}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="optionC">Option C</Label>
                <Input
                  disabled={disabled}
                  className="text-white"
                  id="optionC"
                  type="text"
                  placeholder="Option C"
                  required
                  value={formData.optionC}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="correct">Correct Answer</Label>
                <Select
                  id="correct"
                  className="text-white"
                  onValueChange={handleCorrectChange}
                  disabled={disabled}
                  value={formData.correct}
                >
                  <SelectTrigger className="text-white">
                    <SelectValue placeholder="Select Correct Answer" />
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
                  disabled={disabled}
                  className="text-white"
                  id="explanation"
                  type="text"
                  placeholder="Explanation"
                  required
                  value={formData.explanation}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={disabled}>
                Create
              </Button>
            </form>
          </CardContent>
        </DialogContent>
      </Dialog>

      <ToastComponent ref={toastRef} description="New Learn and Earn question has been created" title="Learn and Earn" />
    </div>
  );
}

export default AddLearnAndEarnQuestion;