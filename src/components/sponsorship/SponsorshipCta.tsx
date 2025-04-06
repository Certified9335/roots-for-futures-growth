
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Users, School, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SponsorshipCta() {
  return (
    <div className="py-12 bg-green-50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Support Our Mission</h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Help us plant more trees by sponsoring our tree planting initiatives. 
            Your contribution makes a difference for the environment and future generations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 text-green-600" />
                Individual Sponsorship
              </CardTitle>
              <CardDescription>Perfect for individuals who want to make a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">$10<span className="text-base font-normal">/tree</span></div>
              <ul className="space-y-2 text-sm">
                <li>• Sponsor a tree in your name</li>
                <li>• Receive a digital certificate</li>
                <li>• Track your tree's growth</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/sponsorship" className="w-full">
                <Button className="w-full">
                  <Leaf className="mr-2 h-4 w-4" />
                  Sponsor Now
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <School className="mr-2 text-green-600" />
                School Sponsorship
              </CardTitle>
              <CardDescription>Educational opportunities for schools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">$100<span className="text-base font-normal">/10 trees</span></div>
              <ul className="space-y-2 text-sm">
                <li>• Plant trees at your school</li>
                <li>• Educational resources included</li>
                <li>• Recognition on our website</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/sponsorship" className="w-full">
                <Button className="w-full">
                  <Leaf className="mr-2 h-4 w-4" />
                  Sponsor Now
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 text-green-600" />
                Corporate Sponsorship
              </CardTitle>
              <CardDescription>For businesses committed to sustainability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">$500<span className="text-base font-normal">/50 trees</span></div>
              <ul className="space-y-2 text-sm">
                <li>• Corporate branding options</li>
                <li>• Team planting events</li>
                <li>• Impact reports & media coverage</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/sponsorship" className="w-full">
                <Button className="w-full">
                  <Leaf className="mr-2 h-4 w-4" />
                  Sponsor Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
