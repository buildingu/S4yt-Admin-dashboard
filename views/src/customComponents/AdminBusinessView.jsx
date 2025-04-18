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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert } from "@mui/material";

function EditBusinessView({ business }) {
  const [logo, setLogo] = useState(business.logo);
  const [logoFile, setLogoFile] = useState(null);
  const [name, setName] = useState(business?.business_name);
  const [description, setDescription] = useState(business?.description);
  const [question, setQuestion] = useState(business?.question_main);
  const [ytLink, setYtLink] = useState(business?.youtube_link);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState(business?.title);
  const [awardLimit, setAwardLimit] = useState(business?.award_limit);
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
  function handleAwardLimitChange(e) {
    setAwardLimit(e.target.value);
  }

  function handleSubmit(id) {
    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("description", description || "");
    formData.append("title", title || "");
    formData.append("question", question || "");
    formData.append("youtubeLink", ytLink || "");
    formData.append("logo", logoFile);
    try {
      axios.put(`/api/business/${id}`, formData);
    } catch (err) {
      console.error("Submission error:", err);
    }
  }
  return (
    <form>
      <div className="max-h-[80vh] overflow-y-auto p-4">
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
          {logo && (
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
        {errorMessage && (
          <Alert severity="error" className="mt-2">
            {errorMessage}
          </Alert>
        )}
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
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            className="text-white-400"
            id="title"
            type="text"
            placeholder="Business Title"
            onChange={handleTitleChange}
            defaultValue={title}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="awardLimit">Award Limit</Label>
          <Input
            className="text-white-400"
            id="awardLimit"
            type="number"
            placeholder="Award Limit"
            defaultValue={awardLimit}
            required
            onChange={handleAwardLimitChange}
          />
        </div>
        <Button
          className="align-center"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(business._id);
          }}
        >
          Submit
        </Button>
      </div>
      </div>
    </form>
  );
}

export default function AdminBusinessView() {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    async function fetchBusinesses() {
      const businessesResponse = await axios.get("/api/business");
      await setBusinesses(
        businessesResponse.data.filter((business) => !business.deleted)
      );
    }
    fetchBusinesses();
  }, []);
  async function deleteBusiness(businessId) {
    await axios.delete(`/api/business/${businessId}`);
  }

  async function handleDeleteBusiness(businessId) {
    try {
      await deleteBusiness(businessId);
      setBusinesses(
        businesses.filter((business) => business._id !== businessId)
      ); // Remove from local state
    } catch (error) {
      console.error("Error deleting business:", error);
      //alert("Failed to delete business.");
    }
  }
  return (
    <Table>
      <TableCaption>All Businesses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Business Name</TableHead>
          <TableHead className="text-center">Edit Business</TableHead>
          <TableHead className="text-center">Delete Business</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((business) => (
          <TableRow key={business.business_name}>
            <TableCell className="font-medium">
              {business.business_name}
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Edit {business.business_name}'s Information
                    </DialogTitle>
                    <DialogDescription>
                      Update Business Information Here.
                    </DialogDescription>
                  </DialogHeader>
                  <EditBusinessView business={business} />
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger className="bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90">
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {business.business_name} from our database!
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteBusiness(business._id);
                    }}
                  >
                    I'm sure - delete
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
