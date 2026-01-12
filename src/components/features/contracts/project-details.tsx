"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ProjectDetails() {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-medium text-[#17171C]">Hire type</h4>
      <ul className="flex">
        <li>
          <Input
            type="radio"
            id="freelancer"
            name="hire-type"
            value="hosting-small"
            className="hidden peer"
          />
          <Label htmlFor="hosting-small" className="">
            <div className="block">
              <div className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                Freelancer
              </div>
            </div>
          </Label>
        </li>
        <li>
          <Input
            type="radio"
            id="contractor"
            name="hire-type"
            value="hosting-small"
            className="hidden peer"
          />
          <Label htmlFor="hosting-small" className="">
            <div className="block">
              <div className="bg-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                Contractor
              </div>
            </div>
          </Label>
        </li>
      </ul>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label
            htmlFor="project"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Role
          </Label>
          <Input
            type="text"
            id="project"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter role"
          />
        </div>
        <div>
          <Label
            htmlFor="job-role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Role
          </Label>
          <Input
            type="text"
            id="job-role"
            placeholder="Doe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <Label
            htmlFor="company"
            className="flex items-center justify-between"
          >
            <span>Scope of work</span>
            <span className="font-semibold text-xs text-[#5A42DE]">Select</span>
          </Label>
          <SelectScope />
        </div>
      </div>
    </div>
  );
}

function SelectScope() {
  const [open, setOpen] = useState(false);
  const items = [
    { value: "one", title: "IOne" },
    { value: "one", title: "Two" },
    { value: "one", title: "Three" },
    { value: "one", title: "Four" },
    { value: "one", title: "Five" },
  ];
  type ItemType = typeof items[0];
  const [selected, setSelected] = useState<ItemType | null>(null);

  const handleSelected = (item: ItemType) => {
    setSelected(item);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(true)}>
      <DialogTrigger className="py-3 px-2 w-full">
        <Button
          variant="outline"
          id="date"
          className="w-full bg-[#F5F6F7] h-[142px] justify-between items-start font-normal"
        >
          {selected ? selected.title : "select--"}
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Select Template</DialogTitle>
          <DialogDescription>
            <Input placeholder="search" />
          </DialogDescription>
        </DialogHeader>
        {/* <Select open={open} onOpenChange={setOpen}>
          <SelectTrigger className="hidden">
            <button className="hidden">Open</button>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">One</SelectItem>
            <SelectItem value="one">One</SelectItem>
            <SelectItem value="one">One</SelectItem>
          </SelectContent>
        </Select> */}
        <ul className="bg-[#F5F6F7]">
          {items.map((el) => (
            <>
              <li
                onClick={() => handleSelected(el)}
                key={el.value + el.title}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-400"
              >
                <span className="inline-block mb-3">{el.title} </span>
              </li>
              <Separator />
            </>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
