
import React, { useState } from 'react';
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
import { CalendarIcon, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  sponsorName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  treeName: z.string().min(2, "Tree name must be at least 2 characters"),
  species: z.string().min(1, "Please select a tree species"),
  plantingLocation: z.string().min(3, "Location must be at least 3 characters"),
  plantingDate: z.date({
    required_error: "Planting date is required",
  }),
  sponsorshipAmount: z.enum(["10", "25", "50", "100", "custom"]),
  customAmount: z.string().optional(),
  childName: z.string().optional(),
  message: z.string().optional(),
  paymentMethod: z.enum(["card", "mobile", "bank", "crypto"]),
});

type FormData = z.infer<typeof formSchema>;

const SponsorshipForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsorName: '',
      email: '',
      treeName: '',
      species: '',
      plantingLocation: '',
      sponsorshipAmount: "25",
      customAmount: '',
      childName: '',
      message: '',
      paymentMethod: "card",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Sponsorship data:", data);
    if (step === 1) {
      setStep(2);
    } else {
      navigate(`/payment?amount=${data.sponsorshipAmount === 'custom' ? data.customAmount : data.sponsorshipAmount}&type=sponsorship&method=${data.paymentMethod}`);
    }
  };

  const treeSpecies = [
    { value: 'oak', label: 'Oak' },
    { value: 'maple', label: 'Maple' },
    { value: 'pine', label: 'Pine' },
    { value: 'birch', label: 'Birch' },
    { value: 'willow', label: 'Willow' },
    { value: 'acacia', label: 'Acacia' },
    { value: 'baobab', label: 'Baobab' },
    { value: 'eucalyptus', label: 'Eucalyptus' },
    { value: 'cedar', label: 'Cedar' },
    { value: 'mahogany', label: 'Mahogany' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sponsorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="treeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tree Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Give your tree a name" {...field} />
                    </FormControl>
                    <FormDescription>
                      A special name for your sponsored tree
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="plantingLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planting Location</FormLabel>
                    <div className="flex gap-2">
                      <FormControl className="flex-grow">
                        <Input placeholder="e.g. Nairobi, Kenya" {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                        <span className="sr-only">Select location</span>
                      </Button>
                    </div>
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
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dedicate to (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name of the person you're dedicating this tree to" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can dedicate this tree to someone special
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add a personal message for the dedication" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-forest-500 hover:bg-forest-600">
              Continue to Payment
            </Button>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
              <p className="text-muted-foreground">Choose your sponsorship amount and payment method</p>
            </div>

            <FormField
              control={form.control}
              name="sponsorshipAmount"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Sponsorship Amount</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <RadioGroupItem value="10" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            $10
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <RadioGroupItem value="25" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            $25
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <RadioGroupItem value="50" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            $50
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <RadioGroupItem value="100" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            $100
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 col-span-2">
                          <FormControl>
                            <RadioGroupItem value="custom" />
                          </FormControl>
                          <FormLabel className="font-normal flex-grow">
                            Custom Amount
                          </FormLabel>
                          <Input
                            type="number"
                            min="5"
                            placeholder="$"
                            className="w-24"
                            {...form.register("customAmount")}
                            disabled={field.value !== "custom"}
                          />
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Credit/Debit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="mobile" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Mobile Money (M-Pesa, MTN, etc.)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="bank" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Bank Transfer
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="crypto" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Cryptocurrency
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" className="w-full bg-forest-500 hover:bg-forest-600">
                Complete Sponsorship
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default SponsorshipForm;
