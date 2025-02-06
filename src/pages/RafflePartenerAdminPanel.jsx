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
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(URL.createObjectURL(e.target.files[0]));
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
          <CardTitle className="text-2xl">
            Update information about you
          </CardTitle>
          <CardDescription className="text-gray-400">
            Fields marked * are required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="item">Name*</Label>
                <Input
                  className="text-white-400"
                  id="item"
                  type="text"
                  placeholder="Your Business Name"
                  required
                  onChange={handleNameChange}
                  // defaultValue={initialName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description*</Label>
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
                <Label htmlFor="description">Logo</Label>
                <Input
                  className="text-white-400"
                  id="logo"
                  type="file"
                  onChange={handleLogoChange}
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

function AddRaffleItem({ className, ...props }) {
  let [logo, setLogo] = useState(null);
  let [item, setItem] = useState("");
  let [description, setDescription] = useState("");
  let [quantity, setQuantity] = useState(0);
  let [resourceLink, setResourceLink] = useState("");
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
                <Label htmlFor="description">Logo</Label>
                <Input
                  className="text-white-400"
                  id="logo"
                  type="file"
                  onChange={handleLogoChange}
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
      <Tabs
        defaultValue="you"
        className="w-[400px] bg-[#333] border-transparent focus:border-[#F9EB02] text-white mb-4 rounded-xl"
      >
        <TabsList className="grid w-full grid-cols-3 bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white mb-4">
          <TabsTrigger
            value="you"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            You
          </TabsTrigger>
          <TabsTrigger
            value="addRaffleItems"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Add Raffle Item
          </TabsTrigger>
          <TabsTrigger
            value="raffleItems"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Raffle Items
          </TabsTrigger>
        </TabsList>
        <TabsContent value="you">
          <EditYourInfo />
        </TabsContent>
        <TabsContent value="addRaffleItems">
          <AddRaffleItem />
        </TabsContent>
        <TabsContent value="raffleItems">
          {/* do a forEach for raffleItem from the db data to render out as these blocks */}
          {/* <RaffleItem item="placeholderItem" description="placeholderDescription" /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RafflePartenerAdminPanel;
