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

function EditBusinessView(business) {
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(business.business_name);
  const [description, setDescription] = useState(business.description);
  const [question, setQuestion] = useState(business.question_main);
  const [ytLink, setYtLink] = useState(business.youtube_link);
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
    axios.put(`/api/business/${business._id}`, formData);
  }
  return (
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
        <Button className="align-center" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default function AdminBusinessView() {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    async function fetchBusinesses() {
      const businesses = await axios.get(
        "http://localhost:4000/api/admin/businesses"
      );
      console.log(businesses.data);
      await setBusinesses(businesses.data);
    }
    fetchBusinesses();
  }, []);
  async function deleteBusiness(businessId) {
    console.log(businessId);
    await axios.delete(`http://localhost:4000/api/business/${businessId}`);
  }

  async function handleDeleteBusiness(businessId) {
    try {
      await deleteBusiness(businessId);
      setBusinesses(
        businesses.filter((business) => business._id !== businessId)
      ); // Remove from local state
    } catch (error) {
      console.error("Error deleting business:", error);
      alert("Failed to delete business.");
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
