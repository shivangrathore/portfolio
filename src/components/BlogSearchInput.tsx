import { useCallback, useEffect, useRef, useState } from "react";
import MiniSearch, { type SearchResult } from "minisearch";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";

export function SearchDialog({ open, setOpen }: { open: boolean, setOpen: (v: boolean) => void }) {
  const [search, setSearch] = useState("");
  const miniSearch = useRef<MiniSearch>(null);
  const loadMiniSearch = useCallback(async () => {
    const response = await axios.get("/index/blog.json", { responseType: "text" });
    miniSearch.current = MiniSearch.loadJSON(response.data, { fields: ["title", "description", "tags"] });
  }, [])
  useEffect(() => {
    if (!miniSearch.current) return;
    const results = miniSearch.current.search(search, {});
    setSearchResults(results.slice(0, 5));
  }, [search]);

  useEffect(() => {
    loadMiniSearch();
  }, []);

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Article</DialogTitle>
          <DialogDescription>Search accross all the articles</DialogDescription>
        </DialogHeader>
        <div className="relative flex w-full items-center mt-6">
          <Input className="w-full p-4 pr-10" placeholder="Search Article" value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setOpen(true)} />
          <SearchIcon className="absolute right-2 size-5 text-gray-500" />
        </div>
        {searchResults.length == 0 ?
          <div className="p-4 text-center text-gray-500">No results found</div> :
          <div className="grid gap-4">
            {searchResults.map(result => (
              <a key={result.id} className="p-4 border rounded-md" href={`/projects/${result.id}`}>
                <h3 className="text-lg font-semibold">{result.title}</h3>
                <p className="text-gray-500">{result.description}</p>
              </a>
            ))}
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}


export default function ProjectSearchInput() {
  const [open, setOpen] = useState(false);
  return <>
    <div>
      <div className="relative flex w-[400px] max-w-full items-center mt-6">
        <Input className="w-full pr-10" placeholder="Search Article" onFocus={() => setOpen(true)} />
        <SearchIcon className="absolute right-2 size-5 text-gray-500" />
      </div>
    </div>
    <SearchDialog open={open} setOpen={setOpen} />
  </>
}
