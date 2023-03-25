import React from "react";
import { debounce } from "ts-debounce";
import "./styles.css";

interface SearchBarProps {
  onChange: (text: string) => void;
  time?: number;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}
export const SearchBar = React.forwardRef(
  (
    { onChange, time = 500, className, style, ...rest }: SearchBarProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    let text: string = "";
    const search = () => {
      onChange(text);
    };
    const debouncedSearch = debounce(search, time);

    return (
      <input
        ref={ref}
        type="search"
        className={`search-bar ${className}`}
        style={style}
        onChange={(e) => {
          text = e.target.value ?? "";
          debouncedSearch();
        }}
        {...rest}
      />
    );
  }
);
