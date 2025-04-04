
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PoemType {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  likes: number;
  category: string;
  date: string;
}

interface PoemCardProps {
  poem: PoemType;
}

const PoemCard = ({ poem }: PoemCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(poem.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="poem-card flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <Badge variant="outline" className="bg-muted">
          {poem.category}
        </Badge>
        <span className="text-sm text-muted-foreground">{poem.date}</span>
      </div>
      
      <Link to={`/poem/${poem.id}`} className="hover:text-primary transition-colors">
        <h3 className="text-xl font-medium mb-2">{poem.title}</h3>
      </Link>
      
      <p className="text-muted-foreground mb-4 flex-grow">{poem.excerpt}</p>
      
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
        <Link to={`/author/${poem.author.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm hover:text-primary">
          {poem.author}
        </Link>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-primary text-primary' : ''}`} />
          <span>{likeCount}</span>
        </Button>
      </div>
    </div>
  );
};

export default PoemCard;
