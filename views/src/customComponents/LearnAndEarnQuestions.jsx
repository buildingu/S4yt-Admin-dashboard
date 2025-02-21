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
import { Collapsible } from "radix-ui";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
                <CardContent>
                    <Card className="bg-[#333] text-white mb-4 px-4 py-4">
                        <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] leading-[25px] text-white">
                                    Question Set 1
                                </span>
                                <Collapsible.Trigger asChild>
                                    <button className="inline-flex size-[25px] items-center justify-center rounded-full text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=closed]:bg-white data-[state=open]:bg-violet3">
                                        {open ? (
                                            <Cross2Icon className="w-6 h-6 text-black" />
                                        ) : (
                                            <RowSpacingIcon className="w-6 h-6 text-black" />
                                        )}
                                    </button>

                                </Collapsible.Trigger>
                            </div>

                            <Collapsible.Content>
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
                                            <Button type="submit" className="w-full bg-red-500">
                                                delete
                                            </Button>

                                        </div>
                                    </form>
                                </div>
                            </Collapsible.Content>
                        </Collapsible.Root>
                    </Card>
                </CardContent>


            </Card>
        </div>
    )
}

export default LearnAndEarnQuestions