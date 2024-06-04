import VimIcon from "@/assets/vim.svg";
import SearchBar, {SearchBarType} from "./SearchBar";
import {Link, useSearchParams} from "react-router-dom";
import {useEventListener} from "usehooks-ts";
import {useRef} from "react";
import Select from "./Select";
import Radio from "@/components/Radio";
import SunIcon from "@/assets/sun.svg";
import MoonIcon from "@/assets/moon.svg";

export default function Header() {
  const searchBarRef = useRef<SearchBarType>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const background = searchParams.get("bg") || "all";

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      searchBarRef.current?.focus();
    }
  });

  function handleBackgroundFilterChange(bg: string) {
    setSearchParams({bg});
  }

  return (
    <header className="container">
      <div className="section">
        <Link to="/" className="branding">
          <VimIcon />
          <h1 className="title">Chameleon</h1>
        </Link>
        <SearchBar ref={searchBarRef} />
        <Radio.Group value={background} onChange={handleBackgroundFilterChange}>
          <Radio value="all">All</Radio>
          <Radio prefix={<SunIcon />} value="light">
            Light
          </Radio>
          <Radio prefix={<MoonIcon />} value="dark">
            Dark
          </Radio>
        </Radio.Group>
      </div>
      <div className="section">
        <Select>
          <option>Popular</option>
          <option>Newest</option>
        </Select>
        <Radio.Group>
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
        }

        .section {
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
