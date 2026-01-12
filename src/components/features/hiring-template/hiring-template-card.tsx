"use client";
import BriefcaseIcon from "../../../public/briefcase.svg";
import SmallBriefcaseIcon from "../../../public/small-briefcase.svg";

export default function HiringTemplateCard() {
  return (
    <div className="w-full flex flex-col justify-center mt-2 bg-white max-w-3xl p-6">
      <div className="flex flex-col justify-center items-center">
        <figure className="size-16 rounded-full bg-[#F3EBF9] grid place-items-center">
          <BriefcaseIcon />
        </figure>
        <p className="text-xl font-bold">Front end Developer</p>
        <p className="flex items-center text-sm gap-2">
          <span className="flex text-[#7F8C9F] gap-0.5">
            <SmallBriefcaseIcon />
            Time off:
          </span>
          <span className="text-black">25 days</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center mt-8 text-sm font-semibold">
        <span className="text-xs text-[#414F62] bg-[#F5F6F7] w-full px-2 py-1 ">
          Job description
        </span>
        <p>
          As a Front-End Developer, you will be responsible for translating
          UI/UX designs into functional, maintainable code. You’ll work closely
          with product designers, back-end developers, and project managers to
          deliver delightful user experiences across web and mobile platforms.
          This role requires deep knowledge of modern JavaScript frameworks,
          performance optimization techniques, and responsive design best
          practices. <br /> You will have the opportunity to influence front-end
          architecture, contribute to our design system, and help shape the
          future of our digital products.
        </p>
        <span className="w-full mt-2">🎯 Key Responsibilities</span>
        <ul className="list-disc pl-8">
          <li>
            Collaborate with designers and product managers to translate
            wireframes and prototypes into responsive, accessible interfaces.
          </li>
          <li>
            Write clean, maintainable, and scalable code using HTML5, CSS3,
            JavaScript, and frameworks like React, Vue, or Svelte.
          </li>
          <li>
            Optimize applications for maximum speed and scalability across
            browsers and devices.
          </li>
          <li>
            Implement pixel-perfect UIs based on high-fidelity Figma or Sketch
            designs.
          </li>
          <li>
            Build reusable components and contribute to an internal design
            system or component library.
          </li>
          <li>
            Ensure cross-browser compatibility and handle edge cases across
            modern browsers (Chrome, Safari, Firefox, Edge).
          </li>
          <li>
            Work closely with back-end engineers to integrate APIs and services.
          </li>
          <li>
            Participate in daily stand-ups, sprint planning, and code reviews.
          </li>
          <li>
            Debug and troubleshoot front-end issues, identifying root causes and
            implementing solutions.
          </li>
          <li>
            Maintain documentation for components, interfaces, and user flows.
          </li>
          <li>
            Stay current on front-end technologies, trends, and best practices.
          </li>
        </ul>
      </div>
    </div>
  );
}
