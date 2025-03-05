import { useCallback, useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import MiniSearch, { type SearchResult } from "minisearch";
import axios from "axios";


export default function ProjectSearchInput() {
  const [search, setSearch] = useState("");
  const miniSearch = useRef<MiniSearch>(null);
  const loadMiniSearch = useCallback(async () => {
    const response = await axios.get("/index/projects.json", { responseType: "text" });
    miniSearch.current = MiniSearch.loadJSON(response.data, { fields: ["title", "description"] });
  }, [])
  useEffect(() => {
    loadMiniSearch();
  }, []);

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!miniSearch.current) return;
    const results = miniSearch.current.search(search, { boost: { title: 2 } });
    setSearchResults(results);
  }, [search]);
  return <SearchInput placeholder="Search projects" items={searchResults.map(r => <div key={r.id}>{r.title}</div>)} search={search} setSearch={setSearch} />;
}
