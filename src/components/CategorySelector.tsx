
import { Button } from "@/components/ui/button";

export const categories = [
  { id: "all", name: "सभी" },
  { id: "prem", name: "प्रेम" },
  { id: "viraha", name: "विरह" },
  { id: "deshbhakti", name: "देशभक्ति" },
  { id: "prakriti", name: "प्रकृति" },
  { id: "adhyatm", name: "अध्यात्म" },
  { id: "samajik", name: "सामाजिक" },
];

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector = ({ 
  selectedCategory, 
  setSelectedCategory 
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => setSelectedCategory(category.name)}
          className="rounded-full"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;
