import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Zap, AlertTriangle, Phone, UserCheck } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI & Satellite-Enabled
              <br />
              <span className="text-yellow-300">Crime Reporting</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              Report crimes anonymously, get real-time assistance, and help build safer communities with advanced AI and satellite technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link to="/report">
                  <Shield className="mr-2 h-5 w-5" />
                  Report a Crime
                </Link>
              </Button>
              <Button size="lg" variant="destructive" className="text-lg px-8 py-6" asChild>
                <Link to="/sos">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Trigger SOS
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white bg-white/10 hover:bg-white/20" asChild>
                <Link to="/dashboard">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Police Login
                </Link>
              </Button>
            </div>
            <div className="mt-8">
              <Button variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20" asChild>
                <Link to="/ai-demo">
                  Test AI Classification →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Crime Reporting Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge technology to ensure your safety and privacy while fighting crime effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-shadow hover:card-shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Anonymous Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  Report crimes completely anonymously with end-to-end encryption. Your identity is protected while helping law enforcement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:card-shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-emergency/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-emergency" />
                </div>
                <CardTitle className="text-2xl">Real-Time Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  Get immediate assistance with GPS-enabled emergency alerts sent directly to nearby police stations and authorities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-shadow hover:card-shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-success/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-2xl">AI Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  Advanced AI algorithms analyze reports, detect patterns, and prioritize cases to ensure efficient law enforcement response.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Anonymous</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">&lt;2min</div>
              <div className="text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">AI</div>
              <div className="text-muted-foreground">Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens making their communities safer. Report incidents, get help, and help law enforcement protect everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/report">
                Start Reporting
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white bg-white/10 hover:bg-white/20" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;