import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AISearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function AISearchInput({ onSearch, placeholder = "Find creators who...", className }: AISearchInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const suggestions = [
    "have 50K+ followers in skincare",
    "post about fitness and wellness",
    "are based in Los Angeles",
    "have high engagement in fashion",
  ];

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit}>
        <div 
          className={cn(
            "relative flex items-center gap-2 rounded-xl border bg-background px-4 py-3 transition-all",
            isFocused ? "border-primary ring-2 ring-primary/20" : "border-input"
          )}
        >
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button 
            type="submit" 
            size="sm" 
            className="shrink-0 rounded-lg"
            disabled={!query.trim()}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
      
      {/* Quick Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
