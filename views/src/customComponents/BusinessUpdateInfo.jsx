import React from "react";
import { cn } from "@/lib/utils";
import axios from 'axios';
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
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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

export default function EditYourInfo({ className, userType, ...props }) {
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
  let [question, setQuestion] = useState("");
  let [ytLink, setYtLink] = useState("");
  const {id} = useParams();

  const fetchBusinessInfo = async () => {
    const response = await axios.get(`/api/business/${id}`)
    setName(response.data.business_name);
    setDescription(response.data.description);
    setQuestion(response.data.question_main);
    setYtLink(response.data.youtube_link);
  }

  useEffect(() => {
    fetchBusinessInfo();
  }, [])
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(URL.createObjectURL(e.target.files[0]));
  }
  function handleQuestionChange(e) {
    setQuestion(e.target.value);
  }
  function handleYTLinkChange(e) {
    setYtLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    let formData = {
      name: name,
      description: description,
      logo: logo,
      question: question,
      youtubeLink: ytLink,
    };
    //
  
    axios.put(`/api/business/${id}`, formData)
  }

  return (
    <div
      className={cn("flex flex-col gap-6 border-transparent", className)}
      {...props}
    >
      <Card className="bg-[#333] text-white mb-4 border-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">
            {userType === "business" ? "Your Info" : "Create/Modify Business"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {userType === "business"
              ? "Update Information About You"
              : "Add/edit a business. To edit, enter the name of an existing business. To add, enter the name of a new business. View all businesses in the 'View Businesses' tab."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="text-white-400"
                  id="name"
                  type="text"
                  placeholder="Your Business Name"
                  defaultValue={name}
                  required
                  onChange={handleNameChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  className="text-white-400"
                  id="description"
                  type="textarea"
                  placeholder="Your Business Description"
                  required
                  onChange={handleDescriptionChange}
                 defaultValue={description}
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
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  className="text-white-400"
                  id="question"
                  type="text"
                  placeholder="Your Question"
                  onChange={handleQuestionChange}
                  defaultValue={question}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ytlink">Youtube Link</Label>
                <Input
                  className="text-white-400"
                  id="ytlink"
                  type="text"
                  placeholder="Your YouTube Link"
                  onChange={handleYTLinkChange}
                  defaultValue={ytLink}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit} disabled={!id}>
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
