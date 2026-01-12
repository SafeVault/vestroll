import Image from "next/image";

interface LogoProps {
  isMobile?: boolean;
}

export function Logo({ isMobile = false }: LogoProps) {
  if (isMobile) {
    return (
      <div className="flex items-center justify-start space-x-2">
        <Image
          src="/vestroll-logo.svg"
          alt="VestRoll Logo"
          width={32}
          height={32}
          className="w-8 h-8 rotate-180"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 bg-white p-1.5 rounded-lg w-fit">
      <Image
        src="vestroll-logo.svg"
        alt="VestRoll Logo"
        width={40}
        height={40}
        className="w-10 h-10 rotate-180"
      />
      <span className="text-xl font-semibold text-gray-600">VestRoll</span>
    </div>
  );
}
