import { Link } from "react-router-dom";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-xl">Suraksha</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              AI and satellite-enabled crime reporting platform dedicated to building safer communities 
              through anonymous reporting and real-time emergency response.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Emergency: 100 | 112</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@suraksha.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <Link to="/report" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Report Crime
              </Link>
              <Link to="/sos" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Emergency SOS
              </Link>
              <Link to="/dashboard" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Police Dashboard
              </Link>
              <Link to="/about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Platform
              </Link>
            </nav>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold mb-4">Emergency Services</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Police</span>
                <span className="font-mono">100</span>
              </div>
              <div className="flex justify-between">
                <span>Fire Department</span>
                <span className="font-mono">101</span>
              </div>
              <div className="flex justify-between">
                <span>Ambulance</span>
                <span className="font-mono">108</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency Services</span>
                <span className="font-mono">112</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2026 Suraksha Platform. All rights reserved. | Developed for public safety and community welfare.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;