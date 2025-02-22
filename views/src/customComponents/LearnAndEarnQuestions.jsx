import { useState, useEffect } from "react"
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
function LearnAndEarnQuestions({ className, ...props }) {
    const [questions, setQuestions] = useState([]);
    const populateQuestions = async () => {
        const response = await axios.get(`/api/multiple-choice/${props.id}`)
        setQuestions(response.data.questions);
        console.log(props.id);
    }
    useEffect(() => {
        populateQuestions();
    }, [])
    return (
        <div
            className={cn("flex flex-col gap-6 border-transparent", className)}
            {...props}
        >
            <Card className="bg-[#333] text-white mb-4 border-transparent">
                <CardHeader>
                    <CardTitle className="text-2xl">Learn and Earn Questions</CardTitle>
                    <CardDescription className="text-gray-400">
                        View and update Learn and Earn Questions
                    </CardDescription>
                </CardHeader>
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
            <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor={`question-${index}`}>Question</Label>
                        <Input
                            className="text-white"
                            id={`question-${index}`}
                            type="text"
                            placeholder="Enter Question"
                            value={question.question}
                            onChange={() => {}} 
                            required
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
                            onChange={() => {}}
                            required
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
                            onChange={() => {}}
                            required
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
                            onChange={() => {}}
                            required
                        />
                    </div>
                    <div className="grid gap-2 text-white">
                        <Label htmlFor={`correct-${index}`}>Correct Answer</Label>
                        <Select id={`correct-${index}`} 
                        className="text-white"
                        value={question.answers.correct}>
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
                            onChange={() => {}}
                            required
                        />
                    </div>
                </div>
                <br />
                <div>
                    <Button type="submit" className="w-full mb-4">
                        Update
                    </Button>
                    <Button type="submit" className="w-full">
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    </Accordion>
))}

                </CardContent>


            </Card>
        </div >
    )
}

export default LearnAndEarnQuestions