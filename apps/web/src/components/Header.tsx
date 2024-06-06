import VimIcon from "@/assets/vim.svg";
import SearchBar, {SearchBarType} from "./SearchBar";
import {Link, useSearchParams} from "react-router-dom";
import {useEventListener} from "usehooks-ts";
import {FormEvent, useRef, useState} from "react";
import Select from "./Select";
import Radio from "@/components/Radio";
import SunIcon from "@/assets/sun.svg";
import MoonIcon from "@/assets/moon.svg";
import clsx from "clsx";

export default function Header() {
  const searchBarRef = useRef<SearchBarType>(null);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const background = searchParams.get("bg") || "all";
  const editor = searchParams.get("e") || "all";
  const orderBy = searchParams.get("s") || "popularity";
  const query = searchParams.get("q") || undefined;

  const updateSearchParam = (name: string, value: string) =>
    setSearchParams((nextSearchParams) => {
      nextSearchParams.set(name, value);
      return nextSearchParams;
    });

  useEventListener("keydown", (ev: KeyboardEvent) => {
    if (ev.key === "/") {
      ev.preventDefault();
      searchBarRef.current?.focus();
    }
  });

  useEventListener("scroll", () => {
    const {scrollY} = window;
    setHasScrolled(scrollY > 0);
  });

  function handleQuery(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const q = formData.get("query");
    q && updateSearchParam("q", q as string);
  }

  function handleBackground(bg: string) {
    updateSearchParam("bg", bg);
  }

  function handleEditor(e: string) {
    updateSearchParam("e", e);
  }

  function handleSort(ev: FormEvent<HTMLSelectElement>) {
    updateSearchParam("s", ev.currentTarget.value);
  }

  return (
    <header className={clsx("container", hasScrolled && "scrolled")}>
      <div className="toolbar-section">
        <Link to="/" className="branding">
          <VimIcon />
          <h1 className="title">Chameleon</h1>
        </Link>
        <form onSubmit={handleQuery}>
          <SearchBar name="query" value={query as string} ref={searchBarRef} />
        </form>
        <Radio.Group value={background} onChange={handleBackground}>
          <Radio value="all">All</Radio>
          <Radio prefix={<SunIcon />} value="light">
            Light
          </Radio>
          <Radio prefix={<MoonIcon />} value="dark">
            Dark
          </Radio>
        </Radio.Group>
      </div>
      <div className="toolbar-section">
        <Select value={orderBy} onChange={handleSort}>
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
        </Select>
        <Radio.Group value={editor} onChange={handleEditor}>
          <Radio value="all">All</Radio>
          <Radio value="vim">Vim</Radio>
          <Radio value="neovim">Neovim</Radio>
        </Radio.Group>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 2.25rem;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;

          box-shadow: inset 0 -1px 0 0 transparent;
          transition: box-shadow 0.15s;
        }

        .scrolled {
          box-shadow: inset 0 -1px 0 0 #eaeaea;
        }

        .toolbar-section {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .title {
          font-weight: bold;
          font-size: 20px;
          margin: 0;
        }
      `}</style>

      <style jsx global>{`
        .branding {
          display: flex;
          flex-direction: row;
          color: black;
          text-decoration: none;
          gap: 6px;
        }
      `}</style>
    </header>
  );
}
