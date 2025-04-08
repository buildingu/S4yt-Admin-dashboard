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
import { useState, useEffect, useRef } from "react";
import ToastComponent from "@/components/ToastComponent";
import { useNavigate } from "react-router-dom";

export default function EditYourInfo({ className, userType, ...props }) {

  const [logo, setLogo] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [ytLink, setYtLink] = useState("");
  const id  = props.id;
  const toastRef = useRef();
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusinessInfo = async () => {
    try {
      const response = await axios.get(`/api/business/${id}`); //redirect to prev page if the id of the business doesn't exist
      console.log(response.data)
      if (response.status !== 200) {
        Navigate(-1);
      }
      setName(response.data.business_name);
      setDescription(response.data.description);
      setQuestion(response.data.question_main);
      setYtLink(response.data.youtube_link);
      setTitle(response.data.title);
      setIsLoading(false);
    } catch (error) {
      Navigate(-1);
    }


  }

  useEffect(() => {
    if(id)fetchBusinessInfo();
  }, [id])
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

  function handleTitleChange(e) {
    setTitle(e.target.value);
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
    toastRef.current.triggerToast();
  }
  if (isLoading) return <p>Loading...</p>
  console.log(name)
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
                  value={name}
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
                  value={description}
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
                  value={question}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  className="text-white-400"
                  id="title"
                  type="text"
                  placeholder="Your Question Title"
                  onChange={handleTitleChange}
                  value={title}
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
                  value={ytLink}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit} disabled={!id}>
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastComponent ref={toastRef} description="Business Information has been successfully updated" title="Updated" />
    </div>
  );
}