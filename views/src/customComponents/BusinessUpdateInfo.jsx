import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastComponent from "@/components/ToastComponent";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export default function EditYourInfo({ className, userType, ...props }) {
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [ytLink, setYtLink] = useState("");
  const id = props.id;
  const toastRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBusinessInfo = async () => {
    try {
      const response = await axios.get(`/api/business/${id}`);
      if (response.status !== 200) {
        navigate(-1);
      }
      setName(response.data.business_name);
      setDescription(response.data.description);
      setQuestion(response.data.question_main);
      setYtLink(response.data.youtube_link);
      setTitle(response.data.title);
      setLogo(response.data.logo);
      setIsLoading(false);
    } catch (error) {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (id) fetchBusinessInfo();
  }, [id]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  
  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file)); 
      setLogoFile(file); 
      setErrorMessage(""); 
    } else {
      setErrorMessage("Please upload a valid image file.");
    }
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

  
    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("description", description || "");
    formData.append("title", title || "");
    formData.append("question", question || "");
    formData.append("youtubeLink", ytLink || "");
    formData.append("logo", logoFile); 

    
    axios
      .put(`/api/business/${id}`, formData)
      .then((response) => {
        toastRef.current.triggerToast();
        console.log(response.data); 
      })
      .catch((error) => {
        console.error("Error updating business:", error);
      });

    axios.put(`/api/challenge/${id}`, { title: title, description: description });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={cn("flex flex-col gap-6 border-transparent", className)} {...props}>
      <Card className="bg-[#333] text-white mb-4 border-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">
            {userType === "business" ? "Your Info" : "Create/Modify Business"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {userType === "business"
              ? "Update Information About You"
              : "Add/edit a business. To edit, enter the name of an existing business. To add, enter the name of a new business."}
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
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {errorMessage && (
                  <Alert severity="error" className="mt-2">
                    {errorMessage}
                  </Alert>
                )}
                {logo  && (
  <div className="mt-2">
    <Label>Logo Preview:</Label>
    <img
      src={logo}
      alt="Logo Preview"
      className="max-w-[200px] max-h-[200px] mt-1 rounded"
    />
  </div>
)}
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
                <Label htmlFor="ytlink">YouTube Link</Label>
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
