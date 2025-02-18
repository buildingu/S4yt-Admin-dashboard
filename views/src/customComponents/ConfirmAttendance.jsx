import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default ConfirmAttendance