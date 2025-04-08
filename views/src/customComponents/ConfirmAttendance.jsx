import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToastComponent from "@/components/ToastComponent";
import axios from "axios";

function ConfirmAttendance({ className, ...props }) {
  let [attendance, setAttendance] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [description, setDescription] = useState();
  const toastRef = useRef();
  const businessId = props.id;

  useEffect(() => {
    axios
      .get(`/api/business/${businessId}`)
      .then((response) => {
        setConfirmStatus(response.data.attendance_confirm);
        setAttendance(response.data.attendance_confirm);
      })
      .catch((error) => {
        console.error("Error fetching attendance status:", error);
      });
  }, [businessId]);

  const handleAttendanceChange = (value) => {
    let dict = {
      yes: true,
      no: false,
    };
    const newAttendance = dict[value];

    setAttendance(newAttendance);
    setConfirmStatus(newAttendance);

    axios
      .put(`/api/business/${businessId}`, { attendance_confirm: newAttendance })
      .then(() => {
        setDescription(`Attendance status updated to: ${value === "yes" ? "Confirmed" : "Unconfirmed"}`);
            toastRef.current.triggerToast();
      })
      .catch((error) => {
        console.error("Error updating attendance status:", error);
      });
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
            value={attendance === null ? "" : attendance ? "yes" : "no"} // Set value to match the current state
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
        </div>
      </CardContent>
      <ToastComponent ref={toastRef} description={description} title="Learn and Earn" />
    </Card>
  );
}

export default ConfirmAttendance;
