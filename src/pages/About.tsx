import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Satellite, 
  Brain, 
  Users, 
  Globe, 
  Eye,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Anonymous Reporting",
      description: "Submit crime reports while maintaining complete anonymity through end-to-end encryption."
    },
    {
      icon: Satellite,
      title: "Satellite Integration",
      description: "GPS-enabled emergency alerts with precise location tracking for immediate response."
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze patterns and prioritize cases effectively."
    },
    {
      icon: Users,
      title: "Community Safety",
      description: "Building safer communities through citizen participation and collaborative reporting."
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Platform available in multiple languages to serve diverse communities."
    },
    {
      icon: Eye,
      title: "Real-Time Monitoring",
      description: "24/7 monitoring and immediate alert systems for emergency situations."
    }
  ];

  const teamMembers = [
    { name: "Dr. Rajesh Kumar", role: "Project Lead", expertise: "Criminal Justice Technology" },
    { name: "Priya Sharma", role: "AI/ML Engineer", expertise: "Pattern Recognition" },
    { name: "Arjun Singh", role: "Full Stack Developer", expertise: "Web Security" },
    { name: "Kavya Reddy", role: "UX Designer", expertise: "Accessibility Design" }
  ];

  const futureScope = [
    "Integration with existing police databases",
    "Mobile app development for iOS and Android",
    "Voice-based reporting for accessibility",
    "Blockchain-based evidence management",
    "Predictive crime analytics",
    "Community alert systems",
    "Integration with CCTV networks",
    "Machine learning for fake report detection"
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Suraksha</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An innovative AI and satellite-enabled crime reporting platform designed to enhance public safety 
            and streamline law enforcement operations across communities.
          </p>
        </div>

        {/* Problem Statement */}
        <section className="mb-16">
          <Card className="card-shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Traditional crime reporting systems face several critical challenges:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">Current Issues:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Fear of retaliation prevents anonymous reporting</li>
                    <li>• Delayed response times in emergency situations</li>
                    <li>• Inefficient case prioritization and resource allocation</li>
                    <li>• Limited accessibility for diverse communities</li>
                    <li>• Lack of real-time tracking and updates</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-success">Our Solution:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Complete anonymity with encryption</li>
                    <li>• GPS-enabled instant emergency alerts</li>
                    <li>• AI-powered case analysis and prioritization</li>
                    <li>• Multilingual support for inclusivity</li>
                    <li>• Real-time status tracking and updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground">
              Advanced technology solutions for modern crime reporting
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-shadow hover:card-shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Future Scope */}
        <section className="mb-16">
          <Card className="card-shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Future Development Roadmap</CardTitle>
              <CardDescription>
                Planned enhancements and upcoming features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {futureScope.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Development Team</h2>
            <p className="text-xl text-muted-foreground">
              Dedicated professionals working towards safer communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <Card className="card-shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Contact & Support</CardTitle>
              <CardDescription>
                Get in touch with our team for assistance or feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Emergency Helpline</p>
                      <p className="text-muted-foreground">+91-11-2345-6789 (24/7)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Support Email</p>
                      <p className="text-muted-foreground">support@suraksha.gov.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="text-muted-foreground">
                        National Crime Records Bureau<br />
                        New Delhi, India - 110001
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Follow Development</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Feedback & Suggestions</h4>
                    <p className="text-sm text-muted-foreground">
                      We value your input in making Suraksha better. 
                      Share your feedback at feedback@suraksha.gov.in
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Credits */}
        <section>
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Credits & Acknowledgments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Technology Stack</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• React.js - Frontend Framework</li>
                    <li>• Tailwind CSS - Styling Framework</li>
                    <li>• TypeScript - Type Safety</li>
                    <li>• Supabase - Backend Services</li>
                    <li>• OpenAI - AI Integration</li>
                    <li>• Mapbox - Satellite & GPS Services</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Special Thanks</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• National Crime Records Bureau</li>
                    <li>• Ministry of Home Affairs</li>
                    <li>• State Police Departments</li>
                    <li>• Community Safety Organizations</li>
                    <li>• Beta Testing Communities</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t text-center text-muted-foreground">
                <p>© 2026 Suraksha Platform. Developed for public safety and community welfare.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;