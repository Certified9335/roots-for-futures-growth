
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, SmartphoneCharging, Building, Coins } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('card');

  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount') || '10';
  const type = searchParams.get('type') || 'donation';
  const method = searchParams.get('method') || 'card';

  useEffect(() => {
    if (method) {
      setSelectedTab(method);
    }
  }, [method]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `Thank you for your ${type === 'sponsorship' ? 'tree sponsorship' : 'donation'} of $${amount}.`,
      });
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 md:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground">
              {type === 'sponsorship' 
                ? 'Complete your tree sponsorship' 
                : 'Thank you for your donation to our reforestation efforts'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="card" className="flex flex-col items-center py-2">
                        <CreditCard className="h-5 w-5 mb-1" />
                        <span className="text-xs">Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="flex flex-col items-center py-2">
                        <SmartphoneCharging className="h-5 w-5 mb-1" />
                        <span className="text-xs">Mobile</span>
                      </TabsTrigger>
                      <TabsTrigger value="bank" className="flex flex-col items-center py-2">
                        <Building className="h-5 w-5 mb-1" />
                        <span className="text-xs">Bank</span>
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="flex flex-col items-center py-2">
                        <Coins className="h-5 w-5 mb-1" />
                        <span className="text-xs">Crypto</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card">
                      <form onSubmit={handlePayment} className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="Name on card" required />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isProcessing}>
                          {isProcessing ? "Processing..." : `Pay $${amount}`}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="mobile">
                      <form onSubmit={handlePayment} className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
                          <select 
                            id="mobileProvider" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                            required
                          >
                            <option value="">Select provider</option>
                            <option value="mpesa">M-Pesa</option>
                            <option value="mtn">MTN Mobile Money</option>
                            <option value="airtel">Airtel Money</option>
                            <option value="orange">Orange Money</option>
                            <option value="vodafone">Vodafone Cash</option>
                          </select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input id="phoneNumber" placeholder="e.g. +254712345678" required />
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isProcessing}>
                          {isProcessing ? "Processing..." : `Request Payment of $${amount}`}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                          You'll receive a prompt on your phone to complete the payment
                        </p>
                      </form>
                    </TabsContent>

                    <TabsContent value="bank">
                      <div className="space-y-4">
                        <div className="border rounded-md p-4 bg-muted/50">
                          <p className="font-medium">Bank Transfer Details</p>
                          <div className="space-y-2 mt-2 text-sm">
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Bank Name:</span>
                              <span>EcoReforest Bank</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Account Name:</span>
                              <span>Reforest Project</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Account Number:</span>
                              <span>1234567890</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">SWIFT/BIC:</span>
                              <span>ECOREFXXX</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Reference:</span>
                              <span>TRSPON-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handlePayment}>
                          <div className="grid gap-2">
                            <Label htmlFor="transferProof">Upload Transfer Receipt (Optional)</Label>
                            <Input id="transferProof" type="file" />
                          </div>
                          <Button type="submit" className="w-full mt-4">Confirm Bank Transfer</Button>
                        </form>
                      </div>
                    </TabsContent>

                    <TabsContent value="crypto">
                      <div className="space-y-4">
                        <div className="border rounded-md p-4 bg-muted/50 text-center">
                          <p className="font-medium mb-2">Scan to Pay with Cryptocurrency</p>
                          <div className="bg-white p-4 inline-block rounded-md">
                            <div className="w-32 h-32 bg-gray-300 mx-auto flex items-center justify-center text-xs text-gray-600">
                              QR Code Placeholder
                            </div>
                          </div>
                          <p className="mt-3 text-sm">Or send directly to this address:</p>
                          <p className="text-xs bg-muted p-2 rounded overflow-x-auto break-all mt-1">
                            0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
                          </p>
                        </div>
                        <form onSubmit={handlePayment}>
                          <div className="grid gap-2">
                            <Label htmlFor="txHash">Transaction Hash (Optional)</Label>
                            <Input id="txHash" placeholder="Enter your transaction hash" />
                          </div>
                          <Button type="submit" className="w-full mt-4">Verify Payment</Button>
                        </form>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {type === 'sponsorship' ? 'Tree Sponsorship' : 'Donation'}
                      </span>
                      <span>${amount}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
