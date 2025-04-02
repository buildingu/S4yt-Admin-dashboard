import { useState, useEffect, useRef } from "react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddLearnAndEarnQuestion from "./AddLearnAndEarnQuestion";
import ToastComponent from "@/components/ToastComponent";
function LearnAndEarnQuestions({ className, ...props }) {
    const [questions, setQuestions] = useState([]);
    const [description, setDescription] = useState("");
    const toastRef = useRef();
    const populateQuestions = async () => {
        const response = await axios.get(`/api/multiple-choice/${props.id}`)
        setQuestions(response.data.questions);

    }
    useEffect(() => {
        populateQuestions();
    }, [])

    const handleAnswers = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field.startsWith("answers")) {
            const choiceKey = field.split(".")[2];
            updatedQuestions[index].answers.choices[choiceKey] = value;
        } else {
            updatedQuestions[index][field] = value;
        }
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswer = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answers.correct = value;
        setQuestions(updatedQuestions);
    };

    const handleExplanation = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answers.explanation = value;
        setQuestions(updatedQuestions);
    }

    const handleUpdate = async (index) => {
        const question = questions[index];
        try {
            await axios.put(`/api/multiple-choice/${question._id}`, question);
            setDescription("Learn and Earn question updated successfully")
            toastRef.current.triggerToast();
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    const handleDelete = async (index) => {
        const question = questions[index];
        try {
            await axios.delete(`/api/multiple-choice/${question._id}`);
            setQuestions(questions.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    }
    return (
        <div
            className={cn("flex flex-col gap-2 border-transparent", className)}
            {...props}
        >
            <Card className="bg-[#333] text-white mb-4 border-transparent pt-0">
                <div className="flex justify-between items-start space-x-4">
                    <div className="w-1/2">
                        <CardHeader>
                            <CardTitle className="text-2xl">Learn and Earn Questions</CardTitle>
                            <CardDescription className="text-gray-400">
                                View and update Learn and Earn Questions
                            </CardDescription>
                        </CardHeader>
                    </div>
                    <div className="w-full">
                        <AddLearnAndEarnQuestion id={props.id} setQuestions={setQuestions} questions={questions}/>
                    </div>
                </div>
                <CardContent>
                    {questions.map((question, index) => (
                        <Accordion
                            key={index}
                            className="mb-4"
                            sx={{ backgroundColor: '#333', color: 'white', borderRadius: '8px' }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <Typography>{question.question}</Typography>
                            </AccordionSummary>
                            <div className="my-2.5 rounded p-2.5">
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`question-${index}`}>Question</Label>
                                        <Input
                                            className="text-white"
                                            id={`question-${index}`}
                                            type="text"
                                            placeholder="Enter Question"
                                            value={question.question}
                                            onChange={(e) => { handleAnswers(index, "question", e.target.value) }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`optionA-${index}`}>Option A</Label>
                                        <Input
                                            className="text-white"
                                            id={`optionA-${index}`}
                                            type="text"
                                            placeholder="Option A"
                                            value={question.answers.choices?.A || ""}
                                            onChange={(e) => handleAnswers(index, "answers.choices.A", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`optionB-${index}`}>Option B</Label>
                                        <Input
                                            className="text-white"
                                            id={`optionB-${index}`}
                                            type="text"
                                            placeholder="Option B"
                                            value={question.answers.choices?.B || ""}
                                            onChange={(e) => handleAnswers(index, "answers.choices.B", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`optionC-${index}`}>Option C</Label>
                                        <Input
                                            className="text-white"
                                            id={`optionC-${index}`}
                                            type="text"
                                            placeholder="Option C"
                                            value={question.answers.choices?.C || ""}
                                            onChange={(e) => handleAnswers(index, "answers.choices.C", e.target.value)}

                                        />
                                    </div>
                                    <div className="grid gap-2 text-white">
                                        <Label htmlFor={`correct-${index}`}>Correct Answer</Label>
                                        <Select id={`correct-${index}`}
                                            className="text-white"
                                            value={question.answers.correct}
                                            onValueChange={(value) => handleCorrectAnswer(index, value)}>
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
                                        <Label htmlFor={`explanation-${index}`}>Explanation</Label>
                                        <Input
                                            className="text-white"
                                            id={`explanation-${index}`}
                                            type="text"
                                            placeholder="Explanation"
                                            value={question.answers.explanation || ""}
                                            onChange={(e) => handleExplanation(index, e.target.value)}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <Button className="w-full mb-4" onClick={() => handleUpdate(index)}>
                                        Update
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="w-full bg-red-600 hover:bg-red-700">Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-[#333] text-white border-transparent">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the question.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(index)}>
                                                        Confirm Delete
                                                    </Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </Accordion>
                    ))}

                </CardContent>

                <ToastComponent ref={toastRef} description={description} title="Learn and Earn" />
            </Card>
        </div >
    )
}

export default LearnAndEarnQuestions