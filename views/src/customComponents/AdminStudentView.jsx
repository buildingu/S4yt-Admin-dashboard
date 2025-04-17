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
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set } from "react-hook-form";
import { CrossIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import BanUser from "./BanUser";

export default function AdminStudentView() {
  const [students, setStudents] = useState([]);
  const [coins, setCoins] = useState(0);
  useEffect(() => {
    async function fetchStudents() {
      const students = await axios.get("/api/users");
      console.log(students.data);
      await setStudents(students.data);
    }
    fetchStudents();
  }, []);
  function handleCoinChange(e) {
    console.log(e.target.value);
    setCoins(Number(e.target.value));
  }

  return (
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
        {students.map((student) => (
          <TableRow key={student.name}>
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
              <Dialog>
                <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                  Kick
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kick {student.name}</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to kick {student.name}? They will
                      have to login again!
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      try {
                        axios.put(`/api/kickUser/${student._id}`);
                      } catch (error) {
                        console.error("Error:", error);
                      }
                    }}
                  >
                    I'm Sure - Kick
                  </Button>
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell>
              <BanUser student={student} />
            </TableCell>
            <TableCell>
              <Dialog disabled={student.banned_until !== null}>
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
  );
}
