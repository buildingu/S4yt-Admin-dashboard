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
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateRafflePartner({ className, ...props }) {
  let [logo, setLogo] = useState(null);
  let [organizationName, setOrganizationName] = useState("");
  let [resourceCategory, setResourceCategory] = useState("");
  let [resourceLink, setResourceLink] = useState("");

  function handleOrganizationNameChange(e) {
    setOrganizationName(e.target.value);
  }
  function handleResourceCategoryChange(e) {
    setResourceCategory(e.target.value);
  }
  function handleResourceLinkChange(e) {
    setResourceLink(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(URL.createObjectURL(e.target.files[0]));
  }
  function handleSubmit() {
    let formData = {
      organization_name: organizationName,
      resource_link: resourceLink,
      resource_category: resourceCategory,
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
          <CardTitle className="text-2xl">New Partner</CardTitle>
          <CardDescription className="text-gray-400">
            Create New Raffle Partner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Raffle Partner Name</Label>
                <Input
                  className="text-white-400"
                  id="organization_name"
                  type="text"
                  placeholder="Partner Name"
                  required
                  onChange={handleOrganizationNameChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource_category">Resource Category</Label>
                <Input
                  className="text-white-400"
                  id="description"
                  type="textarea"
                  placeholder="Resource Category"
                  required
                  onChange={handleResourceCategoryChange}
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
                <Label htmlFor="logo">Logo</Label>
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
