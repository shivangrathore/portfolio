import React from "react";
import Input from "./Input";
import { SearchIcon } from "lucide-react";

type SearchInputProps = {
  placeholder?: string;
  items: React.ReactNode[];
  search: string;
  setSearch: (search: string) => void;
}

export default function SearchInput({
  placeholder,
  items,
  search,
  setSearch,
}: SearchInputProps) {
  return (
    <div>
      <div className="relative flex w-[400px] max-w-full items-center mt-6">
        <Input className="w-full pr-10" placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)} />
        <SearchIcon className="absolute right-2 size-5 text-gray-500" />
      </div>
      <div className="grid">
        {items}
      </div>
    </div>
  );
}
