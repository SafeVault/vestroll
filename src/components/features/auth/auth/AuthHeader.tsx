interface AuthHeaderProps {
  title: string;
  description: string;
}
function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="space-y-2  max-w-md">
      <h2 className="text-2xl font-bold sm:text-[2.5rem] text-text-header text-nowrap">
        {title}
      </h2>
      <p className="text-xs font-medium leading-[120%] tracking-[0%] text-text-subtext sm:text-sm">
        {description}
      </p>
    </div>
  );
}

export default AuthHeader;
