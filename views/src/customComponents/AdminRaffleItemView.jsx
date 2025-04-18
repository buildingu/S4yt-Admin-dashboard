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

function EditRaffleItemView({ item, onUpdate }) {
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [name, setName] = useState(item?.raffle_partner_name);
  const [description, setDescription] = useState(item?.description);
  const [quantity, setQuantity] = useState(item?.stock);
  const [resourceLink, setResourceLink] = useState(item?.resource_link);
  const [rafflePartner, setRafflePartner] = useState(item?.raffle_partner_name);
  const [partnerList, setPartnerList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getRafflePartners() {
      const partners = await axios.get(`/api/raffle-partners`);
      setPartnerList(partners.data.partners);
    }
    getRafflePartners();
  }, []);

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

  async function handleSubmit(e) {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("description", description || "");
    formData.append("quantity", quantity || 0);
    formData.append("resourceLink", resourceLink || "");
    formData.append("logo", logoFile || "");
    formData.append("rafflePartner", rafflePartner || "");

    try {
      await axios.put(`/api/raffle-item/${item._id}`, formData);
      if (onUpdate) onUpdate(); 
    } catch (err) {
      console.error("Submission error:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="item">Name</Label>
          <Input
            className="text-white-400"
            id="item"
            type="text"
            placeholder="Item Name"
            required
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            className="text-white-400"
            id="description"
            type="text"
            placeholder="Item Description"
            required
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setQuantity(e.target.value)}
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
            onChange={(e) => setResourceLink(e.target.value)}
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
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        <div className="grid gap-2">
          <Label htmlFor="rafflePartner">Raffle Partner</Label>
          <Select
            onValueChange={(value) => setRafflePartner(value)}
            defaultValue={rafflePartner}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Associated Raffle Partner" />
            </SelectTrigger>
            <SelectContent>
              {partnerList.map((partner) => (
                <SelectItem
                  key={partner.organization_name}
                  value={partner.organization_name}
                >
                  {partner.organization_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Update
        </Button>
      </div>
    </form>
  );
}

export default function AdminBusinessView() {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    const items = await axios.get("/api/raffle-items");
    setItems(items.data);
  }

  useEffect(() => {
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
          <TableHead className="text-center">Logo</TableHead>
          <TableHead className="text-center">Edit</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item._id}>
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
              <img src={item.image_src} className="w-16 h-16 object-contain" />
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger className="bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 px-4 py-2 rounded">
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit {item.name}</DialogTitle>
                    <DialogDescription>
                      Update Raffle Item Information Below:
                    </DialogDescription>
                  </DialogHeader>
                  <EditRaffleItemView item={item} onUpdate={fetchItems} />
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded">
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete <strong>{item.name}</strong>? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Yes, Delete
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
