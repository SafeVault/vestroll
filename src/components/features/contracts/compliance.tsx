"use client";

import React, { useRef, useState } from "react";
import SVGIcon from "@/components/shared/common/svg";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getExt } from "./utils/index";
import {
  CaseSensitiveIcon,
  DeleteIcon,
  FileUpIcon,
  GitPullRequestDraftIcon,
  RemoveFormattingIcon,
  UploadCloudIcon,
} from "lucide-react";
import Image from "next/image";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Visible from "@/components/shared/common/visible";
import { Input } from "@/components/ui/input";

function Compliance() {
  return (
    <section className="space-y-6">
      <section>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1" className="text-xs font-medium text-[#414F62]">
              Use our standard service agreement
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2" className="text-xs font-medium text-[#414F62]">
              Use your own custom agreement (For custom uploaded contracts,
              project details will appear in an addendum section attached to
              your PDF file.)
            </Label>
          </div>
        </RadioGroup>
      </section>
      <FileBox />
      <section className="space-y-3">
        <h2 className="font-semibold text-base text-[#17171C]">
          Additional terms (optional)
        </h2>
        <div className="space-y-3">
          <Label htmlFor="visitors">Terms</Label>
          <Input
            className="bg-[#F5F6F7] h-[106px]"
            id="visitors"
            placeholder=""
            required
          />
          <p className="text-[#414F62] text-xs font-medium">
            Add additional terms to cover special scenarios. These terms will be
            applied to the Service Agreement Template or uploaded contract and
            override existing contract terms.
          </p>
        </div>
      </section>
    </section>
  );
}

function FileBox({ fileType = "PDF" }) {
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [inDrop, setInDrop] = useState(false);

  const allowedExtensions = ".csv,.pdf";
  const allowedFileTypes = ["csv", "pdf"];

  const onFileChange = () => {
    updateImageDisplay();
  };
  const updateImageDisplay = () => {
    const currFiles = fileRef?.current?.files;
    if (!currFiles?.length) {
      return;
    }
    const newFiles: File[] = [];
    for (let i = 0; i < currFiles.length; i++) {
        newFiles.push(currFiles[i]);
    }
    setFiles(newFiles);
  };

  const onFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      if (e.dataTransfer.items) {
        let droppedFiles: File[] = [];
        [...Array.from(e.dataTransfer.items)].forEach((item) => {
          if (item.kind !== "file") {
            throw new Error("Not a file");
          }
          const file = item.getAsFile();
          if (file && !allowedFileTypes.includes(getExt(file))) {
            throw new Error(`${getExt(file)} files are not allowed`);
          }
          if (file) droppedFiles.push(file);
        });
        setFiles([droppedFiles[0]]);
      } else {
        let droppedFiles: File[] = [];
        [...Array.from(e.dataTransfer.files)].forEach((file) => {
            droppedFiles.push(file);
        });
        setFiles((current) => [...current, ...droppedFiles]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInDrop(false);
    }
  };
  const onFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setInDrop(true);
  };
  const onFileDragEnter = () => {
    setInDrop(true);
  };
  const onFileDragLeave = () => {
    setInDrop(false);
  };

  const handleFileDelete = (file: File) => {
    setFiles((currFiles) => [
      ...currFiles.filter((eachFile) => file.name !== eachFile.name),
    ]);
  };

  const onUploadClick = () => {
    fileRef?.current && fileRef.current.click();
  };

  return (
    <section className="flex flex-col gap-2">
      <h5 className="text-[#17171C] text-xs font-medium">Agreement file</h5>
      <Item
        variant="outline"
        onDrop={onFileDrop}
        onDragOver={onFileDragOver}
        onDragEnter={onFileDragEnter}
        onDragLeave={onFileDragLeave}
        className={`border-3 border-dashed border-${inDrop ? "red" : "#FFCC00"}`}
      >
        <div className="flex flex-col items-center justify-center">
          <UploadCloudIcon onClick={onUploadClick} />
          <input
            ref={fileRef}
            type="file"
            id="avatar"
            name="avatar"
            accept={allowedExtensions}
            hidden
            onChange={onFileChange}
          />
        </div>
        <Visible when={files.length}>
          {/* <SVGIcon iconName="../nigeria.svg" /> */}
          <FilePreview files={files} onDeleteFiles={handleFileDelete} />
          <ItemMedia></ItemMedia>
        </Visible>
        <ItemContent>
          <ItemTitle>Standard Agreement</ItemTitle>
          <ItemDescription>{fileType} format</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            className="rounded-4xl bg-purple-100 text-purple-600"
            variant="outline"
            size="sm"
          >
            Preview
          </Button>
        </ItemActions>
      </Item>
    </section>
  );
}

const fileIconsMap = {
  pdf: "/pdf.svg",
  csv: CaseSensitiveIcon,
  docx: DocumentTextIcon,
  xlsx: GitPullRequestDraftIcon,
};

interface FilePreviewProps {
  files: File[];
  onDeleteFiles: (file: File) => void;
}

function FilePreview({ files, onDeleteFiles }: FilePreviewProps) {
  const onDeleteClick = (file: File) => {
    onDeleteFiles(file);
  };
  return (
    <div className="flex items-center justify-center gap-2 flex-nowrap overflow-x-auto">
      {files?.map((file) => {
        const ext = getExt(file) as keyof typeof fileIconsMap;
        const iconOrSrc = fileIconsMap[ext]
          ? fileIconsMap[ext]
          : URL.createObjectURL(file);
          
        return (
          <div key={file.name}>
            <div className="flex flex-col items-center relative rounded-[2em]">
              <div
                className="absolute p-[.2em] -top-[7%] -right-[5%]"
                onClick={() => onDeleteClick(file)}
              >
                {/* <RemoveFormattingIcon  /> */}
              </div>
              {typeof iconOrSrc === "string" ? (
                <Image
                  width={48}
                  height={48}
                  src={iconOrSrc}
                  alt={file.name}
                  title={file.name}
                />
              ) : React.createElement(iconOrSrc as any, {
                className: "w-12 h-12 text-gray-400"
              })}
              <h2 className="w-[50px] text-ellipsis whitespace-nowrap text-center overflow-hidden">
                {file.name}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Compliance;
