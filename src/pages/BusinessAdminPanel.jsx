import React from "react";
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
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function EditYourInfo({ className, ...props }) {
  // let [initialName, initialDescription] = await useEffect(async () => {
  //   let iName = await fetch("#");
  //   let iDescription = await fetch("#");
  //   let iNameJson = await iName.json();
  //   let iDescriptionJson = await iDescription.json();
  //   return [iNameJson.toString(), iDescriptionJson.toString()];
  // });
  let [logo, setLogo] = useState(null);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [question, setquestion] = useState("");
  let [ytLink, setYtLink] = useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(URL.createObjectURL(e.target.files[0]));
  }
  function handleQuestionChange(e) {
    setQuestion(e.target.value);
  }
  function handleYTLinkChange(e) {
    setYtLink(e.target.value);
  }
  function handleSubmit() {
    return;
  }
  return (
    <div
      className={cn("flex flex-col gap-6 border-transparent", className)}
      {...props}
    >
      <Card className="bg-[#333] text-white mb-4 border-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">Your Info</CardTitle>
          <CardDescription className="text-gray-400">
            Update Information About You
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="text-white-400"
                  id="name"
                  type="text"
                  placeholder="Your Business Name"
                  required
                  onChange={handleNameChange}
                  // defaultValue={initialName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  className="text-white-400"
                  id="description"
                  type="textarea"
                  placeholder="Your Business Description"
                  required
                  onChange={handleDescriptionChange}
                  // defaultValue={initialDescription}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                  className="text-white-400"
                  id="logo"
                  type="file"
                  onChange={handleLogoChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  className="text-white-400"
                  id="question"
                  type="text"
                  placeholder="Your Question"
                  onChange={handleQuestionChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ytlink">Youtube Link</Label>
                <Input
                  className="text-white-400"
                  id="ytlink"
                  type="text"
                  placeholder="Your YouTube Link"
                  onChange={handleYTLinkChange}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
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
      item: item,
      description: description,
      quantity: quantity,
      resourceLink: resourceLink,
      logo: logo,
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
function ConfirmAttendance({ className, ...props }) {
  let [attendance, setAttendance] = useState(true);
  let handleAttendanceChange = (e) => {
    let dict = {
      yes: true,
      no: false,
    };
    e === "yes" ? setAttendance(true) : setAttendance(false);
    console.log(attendance);
  };
  return (
    <Card className="bg-[#333] text-center text-white">
      <CardHeader>
        <CardTitle>Final Meeting</CardTitle>
        <CardDescription className="text-white">
          Can We Count You In?
        </CardDescription>
      </CardHeader>
      <CardContent className="items-center">
        <div className="grid w-full items-center gap-4 bg-[#333] text-center">
          <Select
            id="attendance"
            className="text-white-400"
            onValueChange={handleAttendanceChange}
          >
            <SelectTrigger className="text-white">
              <SelectValue className="text-white" />
            </SelectTrigger>
            <SelectContent className="text-white">
              <SelectItem value="yes">Yes!</SelectItem>
              <SelectItem value="no">No :(</SelectItem>
            </SelectContent>
          </Select>
          <Button id="submit">Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
function SubmitWinners({ className, ...props }) {
  let [first, setFirst] = useState("");
  let [second, setSecond] = useState("");
  let [third, setThird] = useState("");
  function handleFirstChange(e) {
    setFirst(e.target.value);
  }
  function handleSecondChange(e) {
    setSecond(e.target.value);
  }
  function handleThirdChange(e) {
    setThird(e.target.value);
  }
  function handleSubmit() {
    let info = {
      firstID: first,
      secondID: second,
      thirdID: third,
    };
  }
  return (
    <div
      className={cn("flex flex-col gap-6 border-transparent", className)}
      {...props}
    >
      <Card className="bg-[#333] text-white mb-4 border-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">Winners</CardTitle>
          <CardDescription className="text-gray-400">
            Submit the User IDs of the top 3 answers!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first">First Place</Label>
                <Input
                  className="text-white-400"
                  id="first"
                  type="text"
                  placeholder="Enter First Place ID"
                  required
                  onChange={handleFirstChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="second">Second Place</Label>
                <Input
                  className="text-white-400"
                  id="second"
                  type="text"
                  placeholder="Enter Second Place ID"
                  required
                  onChange={handleSecondChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="third">Third Place</Label>
                <Input
                  className="text-white-400"
                  id="third"
                  type="text"
                  placeholder="Enter Third Place ID"
                  required
                  onChange={handleThirdChange}
                />
              </div>
              <br />

              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function BusinessAdminPanel() {
  return (
    <div>
      <Tabs
        defaultValue="you"
        className="bg-[#333] border-transparent focus:border-[#F9EB02] text-white mb-4 rounded-xl"
      >
        <TabsList className="grid w-full grid-cols-5 bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white mb-4">
          <TabsTrigger
            value="you"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            You
          </TabsTrigger>
          <TabsTrigger
            value="addLearnAndEarnQuestions"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Add Learn and Earn Questions
          </TabsTrigger>
          <TabsTrigger
            value="learnAndEarnQuestions"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Learn and Earn Questions
          </TabsTrigger>
          <TabsTrigger
            value="submitWinners"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Submit Winners
          </TabsTrigger>
          <TabsTrigger
            value="confirmAttendance"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Confirm Attendance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="you">
          <EditYourInfo />
        </TabsContent>
        <TabsContent value="addLearnAndEarnQuestions">
          <AddLearnAndEarnQuestion />
        </TabsContent>
        <TabsContent value="learnAndEarnQuestions">
          {/* do a forEach for learnAndEarnQuestions from the db data to render out as these blocks */}
          {/* <LearnAndEarnQuestion item="placeholderItem" description="placeholderDescription" /> */}
        </TabsContent>
        <TabsContent value="submitWinners">
          <SubmitWinners />
        </TabsContent>
        <TabsContent value="confirmAttendance">
          <ConfirmAttendance />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BusinessAdminPanel;
