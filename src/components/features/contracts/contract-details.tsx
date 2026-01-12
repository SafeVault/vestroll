"use client";
import { CalendarDaysIcon, CalendarIcon, ChevronDownIcon } from "lucide-react";
import SVGIcon from "@/components/shared/common/svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function ContractDetails() {
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <SelectDate label="End date(optional)" />
        </div>
        <div>
          <SelectDate label="Start Date" />
        </div>
        <div className="mb-6 space-y-3">
          <Label htmlFor="email">Termination notice period (days)</Label>
          <Input className="bg-[#F5F6F7]" required />
          <p className="text-[#414F62] text-xs font-medium mt-2">
            Either party may terminate this contract by the specified notice,
            after which the contract will end.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="font-semibold text-base text-[#17171C]">
          Payment Details
        </h2>
        <Separator className="flex-1" />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="website">Network</Label>
          <SelectNetwork />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="website">Asset</Label>
            <p className="font-medium text-xs">=1974.849</p>
          </div>
          <div className="flex items-center gap-2">
            <SelectAssetType />
            <Input className="bg-[#F5F6F7]" type="text" placeholder="$ 2000" />
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="visitors">Address</Label>
          <Input
            className="bg-[#F5F6F7]"
            id="visitors"
            placeholder=""
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="font-semibold text-base text-[#17171C]">
          Invoice Details
        </h2>
        <Separator className="flex-1" />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="website">Invoice frequency</Label>
          <SelectFrequency />
        </div>
        <div className="space-y-3">
          <Label htmlFor="website">Issue Invoice on</Label>
          <SelectFrequency />
        </div>
        <div className="space-y-3">
          <Label htmlFor="website">Payment due</Label>
          <SelectFrequency />
        </div>
      </div>
      <section className="my-4">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-semibold text-base text-[#17171C]">
            First Invoice
          </h2>
          <Separator className="flex-1" />
        </div>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <RadioGroupItem
                value="default"
                id="r1"
                className="active:bg-[#5E2A8C]"
              />
              <Label htmlFor="r1">Full amount</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Custom amount</Label>
            </div>
          </div>
        </RadioGroup>
        <p className="text-[#414F62] text-xs font-medium mt-2">
          You would receive the full monthly amount for your first payment.
        </p>
      </section>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <SelectDate label="Date" placeholder="--" />
        </div>
        <div className="mb-6 space-y-3">
          <Label htmlFor="" className="">
            Amount
          </Label>
          <Input className="bg-[#F5F6F7]" />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="font-semibold text-base text-[#17171C]">
          Add inclusive tax (optional)
        </h2>
        <Separator className="flex-1" />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="website">Tax type</Label>
          <SelectFrequency />
        </div>
        <div className="space-y-3">
          <Label htmlFor="website">ID / account number</Label>
          <SelectFrequency />
        </div>
        <div className="space-y-3">
          <Label htmlFor="website">Tax rate</Label>
          <SelectFrequency />
        </div>
      </div>
    </>
  );
}

function SelectAssetType() {
  return (
    <Select>
      <SelectTrigger className="py-3 px-2 bg-[#F5F6F7]">
        <SelectValue
          placeholder={
            <>
              <SVGIcon iconName="../nigeria.svg" /> USDT
            </>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="+234">
            <SVGIcon iconName="../nigeria.svg" />
          </SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function SelectNetwork() {
  return (
    <Select>
      <SelectTrigger className="py-3 px-2 w-full bg-[#F5F6F7]">
        <SelectValue placeholder="Ethereum" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="af">Afghanistan</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function SelectFrequency() {
  return (
    <Select>
      <SelectTrigger className="py-3 px-2 w-full bg-[#F5F6F7]">
        <SelectValue placeholder="--" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="af">Afghanistan</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function SelectDate({ label = "", placeholder = "" }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor="date">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full bg-[#F5F6F7] justify-between"
          >
            {date ? date.toLocaleDateString() : placeholder || "Select date"}
            <CalendarDaysIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default ContractDetails;
