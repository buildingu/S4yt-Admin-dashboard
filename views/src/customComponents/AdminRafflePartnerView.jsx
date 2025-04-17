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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditRafflePartnerView({ partner }) {
  let [logo, setLogo] = useState(null);
  let [logoFile, setLogoFile] = useState(null);
  let [organizationName, setOrganizationName] = useState(
    partner?.organization_name
  );
  let [resourceCategory, setResourceCategory] = useState(
    partner?.resource_category
  );
  let [resourceLink, setResourceLink] = useState(partner?.resource_link);
  let [errorMessage, setErrorMessage] = useState("");

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
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file));
      setLogoFile(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Please upload a valid image file.");
    }
  }
  function handleSubmit(id) {
    let formData = {
      organization_name: organizationName,
      resource_link: resourceLink,
      resource_category: resourceCategory,
      logo: logoFile,
    };
    try {
      axios.put(`/api/raffle-item/${id}`, formData);
    } catch (err) {
      console.error("Submission error:", err);
    }
  }
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Organisation Name</Label>
          <Input
            className="text-white-400"
            id="name"
            type="text"
            placeholder="Raffle Partner Name"
            required
            onChange={handleOrganizationNameChange}
            defaultValue={organizationName}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="resourceCategory">Resounce Category</Label>
          <Input
            className="text-white-400"
            id="resourceCategory"
            type="textarea"
            placeholder="Partner Resource Category"
            required
            onChange={handleResourceCategoryChange}
            defaultValue={resourceCategory}
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
            defaultValue={resourceLink}
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
        {errorMessage && (
          <Alert severity="error" className="mt-2">
            {errorMessage}
          </Alert>
        )}

        <Button
          className="w-full"
          onClick={() => {
            handleSubmit(partner._id);
          }}
        >
          Update
        </Button>
      </div>
    </form>
  );
}

export default function AdminRafflePartnerView() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    async function fetchPartners() {
      const partners = await axios.get("/api/raffle-partners");
      await setPartners(partners.data.partners);
    }
    fetchPartners();
  }, []);
  async function deletePartner(partnerId) {
    await axios.delete(`/api/raffle-partner/${partnerId}`);
  }

  async function handleDeletePartner(partnerId) {
    try {
      await deletePartner(partnerId);
      setPartners(partners.filter((partner) => partner._id !== partnerId));
    } catch (error) {
      console.error("Error deleting partner:", error);
      alert("Failed to delete partner.");
    }
  }
  return (
    <Table>
      <TableCaption>All Raffle Partners</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Partner Name</TableHead>
          <TableHead className="text-center">Resource Category</TableHead>
          <TableHead className="text-center">Resource Link</TableHead>
          <TableHead className="text-center">Logo URL</TableHead>
          <TableHead className="text-center">Edit Partner</TableHead>
          <TableHead className="text-center">Delete Partner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.map((partner) => (
          <TableRow key={partner.organization_name}>
            <TableCell>{partner.organization_name}</TableCell>
            <TableCell>{partner.resource_category}</TableCell>
            <TableCell>{partner.resource_link}</TableCell>
            <TableCell>{partner.logo}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Edit {partner.organization_name}'s Information
                    </DialogTitle>
                    <DialogDescription>
                      Update Raffle Partner Information Here.
                    </DialogDescription>
                  </DialogHeader>
                  <EditRafflePartnerView partner={partner} />
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
                      {partner.organization_name} from our database!
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeletePartner(partner._id);
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
