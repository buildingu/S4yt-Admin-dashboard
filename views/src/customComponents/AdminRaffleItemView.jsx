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

function EditRaffleItemView({ item }) {
  let [logo, setLogo] = useState(null);
  let [logoFile, setLogoFile] = useState(null);
  let [name, setName] = useState(item?.raffle_partner_name);
  let [description, setDescription] = useState(item?.description);
  let [quantity, setQuantity] = useState(item?.stock);
  let [resourceLink, setResourceLink] = useState(item?.resource_link);
  let [rafflePartner, setRafflePartner] = useState("");
  let [partnerList, setPartnerList] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    async function getRafflePartners() {
      const partners = await axios.get(`/api/raffle-partners`);
      setPartnerList(partners.data.partners);
    }
    getRafflePartners();
  }, []);
  function handleNameChange(e) {
    setName(e.target.value);
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
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file));
      setLogoFile(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Please upload a valid image file.");
    }
  }
  function handleRafflePartnerChange(e) {
    setRafflePartner(e);
  }
  function handleSubmit(id) {
    let formData = {
      item: name,
      description: description,
      quantity: quantity,
      resourceLink: resourceLink,
      logo: logoFile,
      rafflePartner: rafflePartner,
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
          <Label htmlFor="item">Name</Label>
          <Input
            className="text-white-400"
            id="item"
            type="text"
            placeholder="Item Name"
            required
            onChange={handleNameChange}
            defaultValue={name}
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
            defaultValue={description}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            className="text-white-400"
            id="quantity"
            type="number"
            min="0"
            placeholder="Item Quantity"
            required
            onChange={handleQuantityChange}
            defaultValue={quantity}
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
        <div className="grid gap-2">
          <Label htmlFor="rafflePartner">Raffle Partner</Label>
          <Select onValueChange={handleRafflePartnerChange} id="rafflePartner">
            <SelectTrigger>
              <SelectValue placeholder="Select Associated Raffle Partner" />
            </SelectTrigger>
            <SelectContent>
              {partnerList.map((partner) => (
                <SelectItem value={partner.organization_name}>
                  {partner.organization_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={() => {
            handleSubmit(item._id);
          }}
        >
          Create
        </Button>
      </div>
    </form>
  );
}

export default function AdminBusinessView() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchItems() {
      const items = await axios.get("/api/raffle-items");
      console.log(items);
      await setItems(items.data);
    }
    fetchItems();
  }, []);
  async function deleteItem(itemId) {
    await axios.delete(`/api/raffle-item/${itemId}`);
  }

  async function handleDeleteItem(itemId) {
    try {
      await deleteItem(itemId);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  }
  return (
    <Table>
      <TableCaption>All Raffle Items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Item Name</TableHead>
          <TableHead className="text-center">Stock</TableHead>
          <TableHead className="text-center">Raffle Partner</TableHead>
          <TableHead className="text-center">Logo URL</TableHead>
          <TableHead className="text-center">Edit Item</TableHead>
          <TableHead className="text-center">Delete Item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-medium">{item.name}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>{item.raffle_partner_name}</TableCell>
            <TableCell>
              <img src={item.image_src}></img>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90">
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit {item.name}'s Information</DialogTitle>
                    <DialogDescription>
                      Update Raffle Item Information Here.
                    </DialogDescription>
                  </DialogHeader>
                  <EditRaffleItemView item={item} />
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
                      {item.name} from our database!
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteItem(item._id);
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
