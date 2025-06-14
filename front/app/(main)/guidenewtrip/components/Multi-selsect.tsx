"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const selectables = options.filter((item) => !selected.includes(item.value));

  return (
    <div className="relative">
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
        onClick={() => setOpen(true)}>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => {
              const option = options.find((o) => o.value === item);
              return (
                <Badge key={item} variant="secondary" className="rounded-sm">
                  {option?.label || item}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(item);
                    }}>
                    <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
        <div className={cn("flex flex-1", selected.length > 0 && "ml-2")}>
          {selected.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
      </div>

      {open && (
        <div className="absolute z-10 w-full mt-1 border rounded-md shadow-md outline-none top-full bg-popover text-popover-foreground animate-in">
          <Command className="w-full">
            <CommandInput
              placeholder="Search options..."
              value={inputValue}
              onValueChange={setInputValue}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {selectables.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange([...selected, option.value]);
                      setInputValue("");
                    }}
                    className="cursor-pointer">
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}

      {/* Invisible overlay to handle closing the dropdown when clicking outside */}
      {open && (
        <div className="fixed inset-0 z-5" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
