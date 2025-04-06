
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Leaf, CreditCard } from 'lucide-react';

const sponsorshipFormSchema = z.object({
  sponsor_name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  sponsor_email: z.string().email({ message: 'Please enter a valid email address.' }),
  sponsor_type: z.string(),
  tree_species: z.string().min(2, { message: 'Tree species is required.' }),
  tree_location: z.string().min(2, { message: 'Tree location is required.' }),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number.' })
});

type FormData = z.infer<typeof sponsorshipFormSchema>;

export function SponsorshipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(sponsorshipFormSchema),
    defaultValues: {
      sponsor_name: '',
      sponsor_email: '',
      sponsor_type: 'individual',
      tree_species: '',
      tree_location: '',
      amount: 10
    }
  });

  const handleSponsorshipSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('sponsorships').insert({
        ...data,
        user_id: user?.id || null
      });

      if (error) throw error;

      setStep(2);
      toast({
        title: "Sponsorship registered!",
        description: "Please complete the payment process.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register sponsorship. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentCompleted = () => {
    toast({
      title: "Thank you for your sponsorship!",
      description: "Your payment has been processed successfully.",
    });
    navigate('/');
  };

  return (
    <Card className="p-6">
      {step === 1 ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Sponsorship Details</h2>
            <p className="text-muted-foreground">
              Fill in your information to sponsor a tree planting.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSponsorshipSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sponsor_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sponsor_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sponsor_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sponsor Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sponsor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="organization">Organization</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tree_species"
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
                        <SelectItem value="Acacia">Acacia</SelectItem>
                        <SelectItem value="Baobab">Baobab</SelectItem>
                        <SelectItem value="Eucalyptus">Eucalyptus</SelectItem>
                        <SelectItem value="Mahogany">Mahogany</SelectItem>
                        <SelectItem value="Mango">Mango</SelectItem>
                        <SelectItem value="Pine">Pine</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tree_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planting Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Urban Area">Urban Area</SelectItem>
                        <SelectItem value="Rural Community">Rural Community</SelectItem>
                        <SelectItem value="School">School</SelectItem>
                        <SelectItem value="Conservation Area">Conservation Area</SelectItem>
                        <SelectItem value="Deforested Area">Deforested Area</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sponsorship Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="5" {...field} />
                    </FormControl>
                    <FormDescription>
                      Recommended minimum: $10 per tree
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Leaf className="mr-2 h-4 w-4" />
                {isSubmitting ? "Processing..." : "Continue to Payment"}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Complete Your Payment</h2>
            <p className="text-muted-foreground">
              Choose your preferred payment method to complete your tree sponsorship.
            </p>
          </div>

          <div className="grid gap-4">
            <Button onClick={handlePaymentCompleted} className="w-full h-16 justify-start px-4">
              <CreditCard className="mr-4 h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Credit/Debit Card</div>
                <div className="text-xs text-muted-foreground">Visa, Mastercard, American Express</div>
              </div>
            </Button>

            <Button onClick={handlePaymentCompleted} variant="outline" className="w-full h-16 justify-start px-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png" alt="PayPal" className="h-6 mr-4" />
              <div className="text-left">
                <div className="font-semibold">PayPal</div>
                <div className="text-xs text-muted-foreground">Pay with your PayPal account</div>
              </div>
            </Button>

            <Button onClick={handlePaymentCompleted} variant="outline" className="w-full h-16 justify-start px-4">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/M-PESA_LOGO-01.svg/150px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-6 mr-4" />
              <div className="text-left">
                <div className="font-semibold">M-Pesa</div>
                <div className="text-xs text-muted-foreground">Mobile money transfer (Africa)</div>
              </div>
            </Button>

            <Button onClick={handlePaymentCompleted} variant="outline" className="w-full h-16 justify-start px-4">
              <img src="https://brand.flutterwave.com/assets/images/brand/flutterwave-logo-colored-v2.svg" alt="Flutterwave" className="h-6 mr-4" />
              <div className="text-left">
                <div className="font-semibold">Flutterwave</div>
                <div className="text-xs text-muted-foreground">Multiple payment options for Africa</div>
              </div>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button variant="ghost" onClick={() => setStep(1)} className="w-full">
              Back to Sponsorship Details
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
