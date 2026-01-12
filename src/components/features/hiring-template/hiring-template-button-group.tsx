"use client";
import React from "react";
import { Button } from "@headlessui/react";
import EditIcon from "../../../public/edit.svg";
import DeleteIcon from "../../../public/delete.svg";
import HiringTemplateDeleteDialog from "./hiring-template-delete-dialog";
import { classNames } from "@/utils/classNames";

export type HiringTemplateButtonGroupProps = {
    onDeleteTemplate: () => void,
    className?: string
}

export default function HiringTemplateButtonGroup({onDeleteTemplate, className = ""}: HiringTemplateButtonGroupProps) {
  return (
    <div className={classNames("gap-2 items-center", className)}>
      <Button className="flex py-2 px-4 text-white items-center text-sm gap-1 bg-[#5E2A8C] rounded-full hover:cursor-pointer">
        <EditIcon className="size-4 [&_path]:fill-white" />
        Edit
      </Button>
      <HiringTemplateDeleteDialog onFormSubmit={onDeleteTemplate}>
        <Button className="flex py-2 px-4 items-center text-sm gap-1 rounded-full text-[#C64242] border-[#C64242] border-[1.5px] hover:cursor-pointer">
          <DeleteIcon className="size-4 " />
          Delete
        </Button>
      </HiringTemplateDeleteDialog>
    </div>
  );
}
