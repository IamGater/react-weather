import React, { useState, useEffect, useRef } from "react";

const Form = ({ weather, apiKey }) => {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const q = encodeURIComponent(query.trim());
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=6&appid=${apiKey}`,
        );
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        const mapped = data.map((it) => {
          const parts = [it.name];
          if (it.state) parts.push(it.state);
          if (it.country) parts.push(it.country);
          return { id: `${it.lat}_${it.lon}`, label: parts.join(", ") };
        });
        setSuggestions(mapped);
        setActiveIndex(-1);
      } catch (err) {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query, apiKey]);

  const handleSelect = (label) => {
    setQuery(label);
    setVisible(false);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (!visible) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex].label);
      }
    }
  };

  return (
    <form onSubmit={weather} className="search-form" autoComplete="off">
      <div className="input-wrap">
        <input
          ref={inputRef}
          type="text"
          name="city"
          placeholder="City"
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setVisible(true)}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setVisible(false), 120)}
        />

        {visible && suggestions.length > 0 && (
          <ul className="suggestions" role="listbox">
            {suggestions.map((s, idx) => (
              <li
                key={s.id}
                role="option"
                aria-selected={activeIndex === idx}
                className={
                  "suggestion" + (activeIndex === idx ? " active" : "")
                }
                onMouseDown={(ev) => ev.preventDefault()}
                onClick={() => handleSelect(s.label)}
              >
                {s.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn">Get The Weather</button>
    </form>
  );
};

export default Form;
