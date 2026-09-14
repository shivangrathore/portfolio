import { useEffect, useId, useRef, useState } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import { Check, ChevronDown } from "lucide-react";

/**
 * A select whose dropdown is actually part of the design.
 *
 * The native control only lets you style the closed box. The list it opens is
 * drawn by the operating system, which is why the form had a site-styled field
 * that opened a Windows menu in Segoe UI with a blue highlight from 2012.
 *
 * So the list is rebuilt here. The parts that are easy to lose doing that, and
 * are therefore implemented deliberately:
 *
 * - Keyboard. Up, Down, Home, End, Enter, Space, Escape and Tab all behave the
 *   way they do in a native select, plus type-ahead, because people who use
 *   selects by typing the first letter will otherwise think it is broken.
 * - Screen readers. It is a real listbox: `role="listbox"` on the list,
 *   `role="option"` with `aria-selected` on each row, and
 *   `aria-activedescendant` on the button so the active option is announced
 *   without moving focus off the control.
 * - No JavaScript. Before mount, and therefore in the server-rendered HTML and
 *   for anyone whose JS never arrives, this renders a plain `<select name=...>`
 *   that the form's native POST action submits correctly. The enhanced version
 *   only replaces it once the component is running.
 *
 * What it does not do is reimplement the mobile wheel picker. On a phone the
 * list opens as a panel, which is the same interaction pattern as every other
 * app, and the touch targets are sized for it.
 */
interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: readonly string[];
  /** Shown when nothing is chosen. Every one of these fields is optional. */
  placeholder?: string;
}

const control_ =
  "flex w-full items-center justify-between gap-3 border border-border bg-bg px-3.5 py-3 text-left text-sm transition-colors";

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Choose one",
}: SelectFieldProps<T>) {
  const { field } = useController({ control, name });
  const value = (field.value as string) ?? "";

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  // Type-ahead buffer. Cleared after a pause, like the native control.
  const typed = useRef({ term: "", at: 0 });

  const id = useId();
  const listId = `${id}-list`;
  const labelId = `${id}-label`;

  useEffect(() => setMounted(true), []);

  // Opening should land on whatever is already chosen, not on the first row.
  useEffect(() => {
    if (!open) return;
    setActiveIndex(value ? options.indexOf(value) : -1);
  }, [open, value, options]);

  // Keep the active row in view when arrowing past the visible edge.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current
      ?.querySelectorAll("[role=option]")
      [activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (option: string) => {
    field.onChange(option);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Printable single characters jump to the next option starting with them.
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = Date.now();
      typed.current.term =
        now - typed.current.at > 800 ? e.key : typed.current.term + e.key;
      typed.current.at = now;
      const term = typed.current.term.toLowerCase();
      const from = Math.max(activeIndex, 0);
      const order = [...options.slice(from + 1), ...options.slice(0, from + 1)];
      const hit = order.find((o) => o.toLowerCase().startsWith(term));
      if (hit) {
        if (!open) setOpen(true);
        setActiveIndex(options.indexOf(hit));
      }
      if (e.key === " " && !term.trim()) e.preventDefault();
      return;
    }

    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((i) => {
          const next = i + step;
          if (next < 0) return options.length - 1;
          if (next > options.length - 1) return 0;
          return next;
        });
        return;
      }
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        return;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        return;
      case "Enter":
        e.preventDefault();
        if (!open) setOpen(true);
        else if (activeIndex >= 0) choose(options[activeIndex]!);
        else setOpen(false);
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        return;
      case "Tab":
        setOpen(false);
        return;
    }
  };

  // Server render, and the fallback for anyone whose JS does not arrive. The
  // form posts natively to Web3Forms in that case, so this has to be a real
  // named select rather than a placeholder.
  if (!mounted) {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-fg" htmlFor={id}>
          {label}
        </label>
        <div className="relative">
          <select
            id={id}
            name={name}
            defaultValue={value}
            className={`${control_} cursor-pointer appearance-none pr-10 text-fg`}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint"
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef}>
      <span className="mb-2 block text-sm font-medium text-fg" id={labelId}>
        {label}
      </span>

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-labelledby={labelId}
          aria-activedescendant={
            open && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined
          }
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          onBlur={field.onBlur}
          className={`${control_} ${
            open ? "border-accent" : "hover:border-rule"
          } ${value ? "text-fg" : "text-faint"}`}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 shrink-0 text-faint transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            /* Square, hairline-separated rows on the page's own background:
               the same language as every other list on the site, rather than a
               rounded floating card borrowed from a component library. */
            /* Allowed to grow past the trigger. Constrained to the trigger
               width, the longest service names wrapped onto two lines and the
               list read as broken rather than dense. */
            className="absolute left-0 top-[calc(100%+4px)] z-30 max-h-64 w-max min-w-full max-w-[min(24rem,calc(100vw-2.5rem))] overflow-y-auto border border-border bg-bg py-1 shadow-lg shadow-fg/5"
          >
            {value && (
              <li
                role="option"
                aria-selected={false}
                onPointerDown={(e) => {
                  e.preventDefault();
                  choose("");
                }}
                className="cursor-pointer border-b border-line px-3.5 py-2.5 text-sm text-faint hover:bg-surface hover:text-fg"
              >
                Clear
              </li>
            )}
            {options.map((option, i) => {
              const selected = option === value;
              return (
                <li
                  key={option}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActiveIndex(i)}
                  onPointerDown={(e) => {
                    // pointerdown, not click: the outside-click listener also
                    // fires on pointerdown and would close the list first.
                    e.preventDefault();
                    choose(option);
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-sm ${
                    i === activeIndex ? "bg-accent text-accent-fg" : "text-fg"
                  }`}
                >
                  <span>{option}</span>
                  {selected && (
                    <Check
                      aria-hidden="true"
                      className={`size-4 shrink-0 ${
                        i === activeIndex ? "text-accent-fg" : "text-accent"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
