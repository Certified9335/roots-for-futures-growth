import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tree name must be at least 2 characters.",
  }),
  species: z.string().min(2, {
    message: "Species must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  height_cm: z.string().optional(),
  planting_date: z.string(),
  description: z.string().optional(),
  image_url: z.string().optional(),
})

interface TreeFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

export function TreeForm({ onSubmit, defaultValues }: TreeFormProps) {
  const { toast } = useToast()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      species: defaultValues?.species || "",
      location: defaultValues?.location || "",
      latitude: defaultValues?.latitude || "",
      longitude: defaultValues?.longitude || "",
      height_cm: defaultValues?.height_cm || "",
      planting_date: defaultValues?.planting_date || "",
      description: defaultValues?.description || "",
      image_url: defaultValues?.image_url || "",
    },
  })

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    // Convert string values to numbers where appropriate
    const parsedValues = {
      ...values,
      latitude: values.latitude ? parseFloat(values.latitude) : null,
      longitude: values.longitude ? parseFloat(values.longitude) : null,
      height_cm: values.height_cm ? parseFloat(values.height_cm) : null,
    };

    onSubmit(parsedValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tree name</FormLabel>
              <FormControl>
                <Input placeholder="Tree McTreeface" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your tree.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Input placeholder="Oak" {...field} />
              </FormControl>
              <FormDescription>
                This is the species of your tree.
              </FormDescription>
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
                <Input placeholder="Central Park" {...field} />
              </FormControl>
              <FormDescription>
                This is the location of your tree.
              </FormDescription>
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
                <Input placeholder="40.7128" type="number" {...field} />
              </FormControl>
              <FormDescription>
                The latitude coordinate of the tree.
              </FormDescription>
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
                <Input placeholder="-74.0060" type="number" {...field} />
              </FormControl>
              <FormDescription>
                The longitude coordinate of the tree.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height_cm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input placeholder="150" type="number" {...field} />
              </FormControl>
              <FormDescription>
                The height of the tree in centimeters.
              </FormDescription>
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
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The date when the tree was planted.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A beautiful oak tree in Central Park."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write a few words about your tree.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" type="url" {...field} />
              </FormControl>
              <FormDescription>
                The URL of an image of your tree.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
