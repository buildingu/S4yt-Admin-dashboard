import React from "react";
import RaffleItem from "@/customComponents/RaffleItem";
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
import { useState } from "react";

function AddRaffleItem({ className, ...props }) {
  let [item, setItem] = useState("");
  let [description, setDescription] = useState("");
  let [quantity, setQuantity] = useState(0);
  let [resourceLink, setResourceLink] = useState("");
  function handleItemChange(e) {
    set(e.target.value);
  }
  function handleDescriptionChange(e) {
    set(e.target.value);
  }
  function handleQuantityChange(e) {
    set(e.target.value);
  }
  function handleResourceLinkChange(e) {
    set(e.target.value);
  }
  function handleSubmit() {
    let formData = {
      item: item,
      description: description,
      quantity: quantity,
      resourceLink: resourceLink,
    };
    //send this to db
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white mb-4">
        <CardHeader>
          <CardTitle className="text-2xl">New Item</CardTitle>
          <CardDescription className="text-gray-400">
            Create New Item for Raffle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="item">Item</Label>
                <Input
                  className="text-white-400"
                  id="item"
                  type="text"
                  placeholder="Item Name"
                  required
                  onChange={handleItemChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description"></Label>
                <Input
                  className="text-white-400"
                  id="description"
                  type="textarea"
                  placeholder="Item Description"
                  required
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity"></Label>
                <Input
                  className="text-white-400"
                  id="quantity"
                  type="number"
                  placeholder="Item Quantity"
                  required
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resourceLink"></Label>
                <Input
                  className="text-white-400"
                  id="resourceLink"
                  type="url"
                  placeholder="Resource Link"
                  required
                  onChange={handleResourceLinkChange}
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
function RafflePartenerAdminPanel() {
  return (
    <div>
      <AddRaffleItem></AddRaffleItem>
      {/* do a forEach for raffleItem from the db data to render out as these blocks */}
      {/* <RaffleItem item="placeholderItem" description="placeholderDescription" /> */}
    </div>
  );
}

export default RafflePartenerAdminPanel;
