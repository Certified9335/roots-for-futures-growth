
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EducationalResource } from '@/types';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface ResourceCardProps {
  resource: EducationalResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {resource.image_url ? (
          <img 
            src={resource.image_url} 
            alt={resource.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-green-100 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-green-800" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {resource.category}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{resource.description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button onClick={() => navigate(`/learn/${resource.id}`)} className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
