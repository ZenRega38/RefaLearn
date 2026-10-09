import { Badge } from "@/components/ui/Badge";
import { splitCategories } from "@/lib/format";

type Props = {
  /** Raw comma-separated category field from the database. */
  category: string | null | undefined;
  variant?: "coral" | "blue" | "green" | "amber" | "red" | "outline";
  className?: string;
};

/** One badge per comma-separated category. Renders nothing when empty. */
export function CategoryBadges({ category, variant = "blue", className = "" }: Props) {
  const categories = splitCategories(category);
  if (categories.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {categories.map((cat) => (
        <Badge key={cat} variant={variant}>
          {cat}
        </Badge>
      ))}
    </div>
  );
}
