//we wanna be able to easily sort through students hwo have agreed to join the final meeting and then copy their emails
//or save the emails into a csv
//raffle partners must be able to see their raffle item winners emails
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set } from "react-hook-form";
import { Check, CrossIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import BanUser from "./BanUser";
import { Checkbox } from "@mui/material";

export default function AdminStudentView() {
  const [students, setStudents] = useState([]);
  const [coins, setCoins] = useState(0);
  const [queryName, setQueryName] = useState("");
  const [display, setDisplay] = useState([]);
  const [attendees, setAttendees] = useState([]);
  useEffect(() => {
    async function fetchStudents() {
      const students = await axios.get("/api/users");
      console.log(students.data);
      setStudents(students.data);
      setAttendees(students.data.filter((student) => student.attend_meeting));
      setDisplay(students.data);
    }
    fetchStudents();
  }, []);
  function handleCoinChange(e) {
    setCoins(Number(e.target.value));
  }
  function handleQueryNameChange(e) {
    setQueryName(e.target.value);
    console.log(queryName);
  }
  function handleDisplayChange(e) {
    e.target.checked ? setDisplay([...attendees]) : setDisplay([...students]);
  }

  return (
    <>
      <br />
      <Label>Query Students by Name</Label>
      <br />
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignContent: "center", width: "50%" }}>
          <SearchOutlinedIcon fontSize="large"></SearchOutlinedIcon>
          <Input placeholder="Student Name" onChange={handleQueryNameChange} />
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox onChange={handleDisplayChange} id="attendingMeeting" />
            <label className="Label" htmlFor="attendingMeeting">
              Attending Meeting?
            </label>
          </div>
        </div>
      </div>

      <br />
      <hr />
      <Table className="w-full">
        <TableCaption>All Students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Student Name</TableHead>
            <TableHead className="text-center">Email ID</TableHead>
            <TableHead className="text-center">Banned?</TableHead>
            <TableHead className="text-center">Coins</TableHead>
            <TableHead className="text-center">Kick User</TableHead>
            <TableHead className="text-center">Ban User</TableHead>
            <TableHead className="text-center">Manage Coins</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {display
            .filter((student) =>
              student.name.trim().toLowerCase().includes(queryName)
            )
            .map((student) => (
              <TableRow key={student._id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell className="font-medium">{student.email}</TableCell>
                <TableCell className="font-medium">
                  {student.banned_until !== null
                    ? `Until ${new Date(student.banned_until)}`
                    : "No"}
                </TableCell>
                <TableCell className="font-medium">
                  {student.coins || "Error"}
                </TableCell>
                <TableCell>
                  {student.kicked ? (
                    "Already Kicked!"
                  ) : (
                    <Dialog>
                      <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                        Kick
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Kick {student.name}</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to kick {student.name}? They
                            will have to login again!
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="bg-inherit">
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => {
                              try {
                                axios.put(`/api/kick-user/${student._id}`);
                              } catch (error) {
                                console.error("Error:", error);
                              }
                            }}
                          >
                            I'm Sure - Kick
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
                <TableCell>
                  <BanUser student={student} />
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                      Manage Coins
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Manage {student.name}'s Coins</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        {student.name} currently has {student.coins} coins.
                      </DialogDescription>
                      <Input
                        type="number"
                        placeholder="Enter New Coins"
                        onChange={handleCoinChange}
                      ></Input>
                      <Button
                        onClick={() => {
                          try {
                            axios.put(`/api/manage-coins/${student._id}`, {
                              newCoins: coins,
                            });
                            setStudents((prev) =>
                              prev.map((s) =>
                                s._id === student._id ? { ...s, coins } : s
                              )
                            );
                            setDisplay((prev) =>
                              prev.map((s) =>
                                s._id === student._id ? { ...s, coins } : s
                              )
                            );
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        Manage
                      </Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
