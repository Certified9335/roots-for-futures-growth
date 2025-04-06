
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Tree } from '@/types';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  species: z.string().min(2, { message: "Species must be at least 2 characters" }),
  description: z.string().optional(),
  location: z.string().min(2, { message: "Location must be provided" }),
  planting_date: z.string().refine(date => !isNaN(Date.parse(date)), { 
    message: "Please enter a valid date" 
  }),
  height_cm: z.string().refine(val => !val || !isNaN(Number(val)), {
    message: "Height must be a number"
  }).transform(val => val ? Number(val) : undefined).optional(),
  latitude: z.string().refine(val => !val || !isNaN(Number(val)), {
    message: "Latitude must be a number"
  }).transform(val => val ? Number(val) : undefined).optional(),
  longitude: z.string().refine(val => !val || !isNaN(Number(val)), {
    message: "Longitude must be a number"
  }).transform(val => val ? Number(val) : undefined).optional(),
  image_url: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TreeFormProps {
  tree?: Tree;
  onSuccess?: () => void;
}

export function TreeForm({ tree, onSuccess }: TreeFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(tree?.image_url || null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tree?.name || '',
      species: tree?.species || '',
      description: tree?.description || '',
      location: tree?.location || '',
      planting_date: tree ? new Date(tree.planting_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      height_cm: tree?.height_cm ? String(tree.height_cm) : '',
      latitude: tree?.latitude ? String(tree.latitude) : '',
      longitude: tree?.longitude ? String(tree.longitude) : '',
      image_url: tree?.image_url || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  };

  async function uploadImage(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `trees/${fileName}`;
      
      // Check if storage bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.find(bucket => bucket.name === 'tree-images')) {
        await supabase.storage.createBucket('tree-images', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
        });
      }
      
      const { error } = await supabase.storage
        .from('tree-images')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data } = supabase.storage.from('tree-images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      return null;
    }
  }

  async function onSubmit(data: FormData) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add or edit trees.",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Upload image if present
      let imageUrl = tree?.image_url || '';
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const treeData = {
        name: data.name,
        species: data.species,
        description: data.description,
        location: data.location,
        planting_date: data.planting_date,
        height_cm: data.height_cm,
        latitude: data.latitude,
        longitude: data.longitude,
        image_url: imageUrl || data.image_url,
        user_id: user.id
      };

      if (tree) {
        // Update existing tree
        const { error } = await supabase
          .from('trees')
          .update(treeData)
          .eq('id', tree.id);
          
        if (error) throw error;
        
        toast({
          title: "Tree updated!",
          description: "Your tree has been updated successfully.",
        });
      } else {
        // Insert new tree
        const { error } = await supabase
          .from('trees')
          .insert(treeData);
          
        if (error) throw error;
        
        toast({
          title: "Tree added!",
          description: "Your tree has been added successfully.",
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/my-trees');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{tree ? 'Edit Tree' : 'Add New Tree'}</CardTitle>
        <CardDescription>
          {tree 
            ? 'Update information about your tree' 
            : 'Share details about a tree you planted'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tree Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Oak Tree" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tree Species</FormLabel>
                    <FormControl>
                      <Input placeholder="Oak, Maple, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your tree..." 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Backyard, School, Park, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="planting_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planting Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="height_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.000001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.000001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel>Tree Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              {previewUrl && (
                <div className="mt-2 relative w-full h-48">
                  <img 
                    src={previewUrl}
                    alt="Tree preview" 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting 
                ? (tree ? "Updating Tree..." : "Adding Tree...") 
                : (tree ? "Update Tree" : "Add Tree")
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
