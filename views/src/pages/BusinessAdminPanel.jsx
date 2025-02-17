import React from "react";
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
import { baseUrl } from "@/API";
import ToastComponent from "@/components/ToastComponent";
import EditYourInfo from "@/customComponents/BusinessUpdateInfo";
import AddLearnAndEarnQuestion from "@/customComponents/AddLearnAndEarnQuestion";


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
          <EditYourInfo userType="business" />
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
