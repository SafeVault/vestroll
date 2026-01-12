
type Props = {
    name: string;
}

const PageNavHeader = ({name}: Props) => {
  return (
    <div className="bg-white px-4 py-5 border-b border-[#DCE0E5]">
      <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
        <span className="text-sm text-[#7F8C9F] text-[12px]">← Back</span>
      </button>

      <h1 className="font-bold text-[#17171C] text-[24px]">{name}</h1>
    </div>
  );
}

export default PageNavHeader