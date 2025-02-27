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
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddRaffleItem({ className, ...props }) {
  let [logo, setLogo] = useState(null);
  let [item, setItem] = useState("");
  let [description, setDescription] = useState("");
  let [quantity, setQuantity] = useState(0);
  let [resourceLink, setResourceLink] = useState("");
  let [rafflePartner, setRafflePartner] = useState("");
  function handleItemChange(e) {
    setItem(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }
  function handleResourceLinkChange(e) {
    setResourceLink(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(URL.createObjectURL(e.target.files[0]));
  }
  function handleRafflePartnerChange(e) {
    setRafflePartner(e.target.value);
  }
  function handleSubmit() {
    let formData = {
      item: item,
      description: description,
      quantity: quantity,
      resourceLink: resourceLink,
      logo: logo,
      rafflePartner: rafflePartner,
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
                <Label htmlFor="description">Description</Label>
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
                <Label htmlFor="quantity">Quantity</Label>
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
                <Label htmlFor="resourceLink">Resource Link (URL)</Label>
                <Input
                  className="text-white-400"
                  id="resourceLink"
                  type="url"
                  placeholder="Resource Link"
                  required
                  onChange={handleResourceLinkChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Image</Label>
                <Input
                  className="text-white-400"
                  id="logo"
                  type="file"
                  onChange={handleLogoChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="RafflePartner">Image</Label>
                <Input
                  className="text-white-400"
                  id="RafflePartner"
                  type=""
                  onChange={handleLogoChange}
                />
              </div>
              <Select onValueChange={setRafflePartner(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Associated Raffle Partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Partners</SelectLabel>
                    {/* {rafflePartners.map((element) => (
                      <SelectItem value="element">{element}</SelectItem>
                    ))} */}
                  </SelectGroup>
                </SelectContent>
              </Select>

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
