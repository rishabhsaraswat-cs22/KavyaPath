
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const featuredPoets = [
  {
    id: "harivansh-rai-bachchan",
    name: "हरिवंश राय बच्चन",
    poems: 42,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Harivansh_Rai_Bachchan_2.jpg/220px-Harivansh_Rai_Bachchan_2.jpg"
  },
  {
    id: "mahadevi-verma",
    name: "महादेवी वर्मा",
    poems: 38,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mahadevi_Varma.jpg/220px-Mahadevi_Varma.jpg"
  },
  {
    id: "ramdhari-singh-dinkar",
    name: "रामधारी सिंह दिनकर",
    poems: 35,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ramdhari_Singh_%27Dinkar%27.jpg/220px-Ramdhari_Singh_%27Dinkar%27.jpg"
  },
  {
    id: "suryakant-tripathi-nirala",
    name: "सूर्यकांत त्रिपाठी निराला",
    poems: 29,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Suryakant_Tripathi_%27Nirala%27.jpg"
  }
];

const FeaturedPoets = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-display text-center mb-12 decoration-top pt-6">
          प्रसिद्ध कवि
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredPoets.map((poet) => (
            <Link to={`/author/${poet.id}`} key={poet.id}>
              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="flex flex-col items-center pt-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={poet.image} alt={poet.name} />
                    <AvatarFallback>{poet.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-medium text-center mb-1">{poet.name}</h3>
                  <p className="text-sm text-muted-foreground">{poet.poems} कविताएँ</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPoets;
