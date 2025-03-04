import Input from "./Input";
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative flex w-[400px] max-w-full items-center mt-6">
      <Input className="w-full pr-10" placeholder="Search Project" />
      <SearchIcon className="absolute right-2 size-5 text-gray-500" />
    </div>
  );
}
