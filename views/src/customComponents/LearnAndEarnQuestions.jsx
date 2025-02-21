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
    const [open, setOpen] = useState(false);
    useEffect(() => {

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
                <CardContent> <Accordion sx={{ backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >         <Typography>Accordion 1</Typography>
                    </AccordionSummary>


                    <div className="my-2.5 rounded  p-2.5 ">
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
                                    />
                                </div>
                                <div className="grid gap-2 text-white">
                                    <Label htmlFor="correct">Correct Answer</Label>
                                    <Select
                                        id="correct"
                                        className="text-white"
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
                                    />
                                </div>
                            </div>
                            <br />
                            <div>
                                <Button type="submit" className="w-full mb-4">
                                    update
                                </Button>
                                <Button type="submit" className="w-full ">
                                    delete
                                </Button>
                            </div>
                        </form>
                    </div>


                </Accordion>
                </CardContent>


            </Card>
        </div >
    )
}

export default LearnAndEarnQuestions