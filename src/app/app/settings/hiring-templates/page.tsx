"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit, Pencil, Trash2 } from "lucide-react";

interface Template {
  id: number;
  jobTitle: string;
  description: string;
  timeOffDays: number;
}

export default function HiringTemplatesTab() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);

  const initialTemplates: Template[] = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      description:
        "Responsible for developing and maintaining web applications using React, TypeScript, and modern frontend frameworks. Works closely with UX designers and backend teams to deliver high-quality user experiences.",
      timeOffDays: 25,
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      description:
        "Leads product development from conception to launch, working with cross-functional teams to define product vision, roadmap, and requirements. Conducts market research and user interviews to inform product decisions.",
      timeOffDays: 30,
    },
    {
      id: 3,
      jobTitle: "UX Designer",
      description:
        "Designs user-centered digital experiences and interfaces for web and mobile applications. Creates wireframes, prototypes, and high-fidelity designs while conducting user research and usability testing.",
      timeOffDays: 22,
    },
  ];

  // Load mock templates on component mount
  useEffect(() => {
    localStorage.removeItem("hiringTemplates");

    const savedTemplates = localStorage.getItem("hiringTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      setTemplates(initialTemplates);
      localStorage.setItem("hiringTemplates", JSON.stringify(initialTemplates));
    }
  }, []);

  const handleNewTemplateClick = (): void => {
    router.push("/app/settings/hiring-templates/hiring-template-form"); // Adjust the route as needed
  };

  const handleEditTemplate = (templateId: number): void => {
    console.log("Editing template ID:", templateId);
    console.log("Template ID type:", typeof templateId);

    // Make sure templateId is a valid number
    if (isNaN(templateId)) {
      console.error("Invalid template ID in HiringTemplatesTab:", templateId);
      return;
    }
    router.push(`/app/settings/hiring-templates/edit/${templateId}`);
  };

  const handleDeleteTemplate = (templateId: number): void => {
    if (confirm("Are you sure you want to delete this template?")) {
      const updatedTemplates = templates.filter(
        (template) => template.id !== templateId
      );
      setTemplates(updatedTemplates);
      localStorage.setItem("hiringTemplates", JSON.stringify(updatedTemplates));
    }
  };

  return (
    <section className="rounded-xl min-h-50 border border-[#e5e7eb] bg-white shadow-sm">
      <div className="block md:flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
        <div className="block items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#1f2937]">
              Templates
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#6b7280] max-w-3xl">
            Save your hiring preferences as a template to apply them instantly
            to your next hire. Templates can help reduce your time to hire and
            promote consistent, fair hiring policies around the world.
          </p>
        </div>

        <button
          type="button"
          onClick={handleNewTemplateClick}
          className="inline-flex items-center gap-2 rounded-full border mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-[#5E2A8C] hover:text-white active:bg-[#4c1d95] transition-colors"
          aria-label="Create new hiring template"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          New template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="px-4 sm:px-6 py-10 sm:py-16">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <Image
              src="/scope.png"
              alt="Empty templates"
              width={180}
              height={150}
              className="h-auto w-[126px] sm:w-[180px]"
            />
            <h3 className="mt-6 text-sm sm:text-base font-semibold text-[#111827]">
              You haven&apos;t created any hiring templates
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
              You can create and manage hiring templates here
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="">
                <tr className=" bg-gray-300  border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#414F62]">
                    Job Role
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#414F62]">
                    Time-off
                  </th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr
                    key={template.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {template.jobTitle}
                      </h3>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1  text-xs font-medium text-gray-900">
                        {template.timeOffDays} days
                      </span>
                    </td>
                    <td className="">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditTemplate(template.id)}
                          className="p-4 bg-purple-200 hover:bg-purple-900 rounded-full transition-colors"
                          aria-label="Edit template"
                        >
                          <Pencil className="w-4 h-4 text-gray-700 hover:text-gray-100" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-4 bg-red-200 hover:bg-red-900  rounded-full transition-colors"
                          aria-label="Delete template"
                        >
                          <Trash2 className="w-4 h-4  text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
