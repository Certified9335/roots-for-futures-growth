
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, MapPin, Upload, Leaf } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  treeName: z.string().min(2, "Tree name must be at least 2 characters"),
  species: z.string().min(1, "Please select a tree species"),
  plantingDate: z.date({
    required_error: "Planting date is required",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  height: z.string().optional(),
  childName: z.string().min(1, "Child name is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const TreeRegistrationForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treeName: '',
      species: '',
      location: '',
      latitude: '',
      longitude: '',
      height: '',
      childName: '',
      notes: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Tree registration data:", data);
    // TODO: Implement actual tree registration logic
  };

  const treeSpecies = [
    { value: 'oak', label: 'Oak' },
    { value: 'maple', label: 'Maple' },
    { value: 'pine', label: 'Pine' },
    { value: 'birch', label: 'Birch' },
    { value: 'willow', label: 'Willow' },
    { value: 'cedar', label: 'Cedar' },
    { value: 'redwood', label: 'Redwood' },
    { value: 'spruce', label: 'Spruce' },
    { value: 'aspen', label: 'Aspen' },
    { value: 'cherry', label: 'Cherry' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="h-6 w-6 text-forest-500" />
        <h2 className="text-2xl font-bold">Register a New Tree</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="treeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tree Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Emma's Oak" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your tree a special name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Emma" {...field} />
                  </FormControl>
                  <FormDescription>
                    The child this tree is dedicated to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tree Species</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tree species" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {treeSpecies.map((species) => (
                        <SelectItem key={species.value} value={species.value}>
                          {species.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the species of your tree
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="plantingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Planting Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When was the tree planted?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Description</FormLabel>
                <div className="flex gap-2">
                  <FormControl className="flex-grow">
                    <Input placeholder="e.g. Backyard, City Park, School" {...field} />
                  </FormControl>
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                    <span className="sr-only">Get location</span>
                  </Button>
                </div>
                <FormDescription>
                  Describe where the tree is planted
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 34.0522" {...field} />
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
                  <FormLabel>Longitude (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. -118.2437" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Height (cm) (optional)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 30" {...field} />
                </FormControl>
                <FormDescription>
                  The initial height of your tree in centimeters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any details about the tree or the planting process" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="font-medium">Upload tree photo (optional)</p>
            <p className="text-sm text-muted-foreground mt-1">Drag & drop or click to upload</p>
          </div>
          
          <Button type="submit" className="w-full bg-forest-500 hover:bg-forest-600">
            Register Tree
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TreeRegistrationForm;
