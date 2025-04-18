import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set } from "react-hook-form";
import { CrossIcon } from "lucide-react";
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
import axios from "axios";
import { Button } from "@/components/ui/button";
const formatDuration = (ms) => {
  //copied this off some leetcode solutions lol
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

export default function BanUser({ student }) {
  let [banDuration, setBanDuration] = useState(0);
  function handleBanDurationChange(e) {
    setBanDuration(e.target.value);
  }
  function banUser(id) {
    try {
      axios.put(`/api/ban-user/${id}`, {
        duration: banDuration,
      });
     console(
        `${student.name} has been banned for ${formatDuration(banDuration)}!`
      );
    } catch (error) {
      console.error("Error banning user:", error);
     console("Failed to ban user.");
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90">
        Ban
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will ban {student.name} from $4YT
            for {formatDuration(banDuration) || "0 seconds"}!
          </DialogDescription>
          <Input
            type="number"
            placeholder="Ban Duration in Milliseconds"
            min="0"
            onChange={handleBanDurationChange}
          ></Input>
        </DialogHeader>
        <DialogClose className="bg-inherit">
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              banUser(student._id);
            }}
          >
            I'm sure - Ban!
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
