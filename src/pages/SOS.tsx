import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, MapPin, Phone, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Location {
  latitude: number;
  longitude: number;
}

interface PoliceStation {
  id: string;
  name: string;
  distance: string;
  contact: string;
  status: "active" | "busy";
}

const SOS = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const { toast } = useToast();

  const policeStations: PoliceStation[] = [
    { id: "1", name: "Central Police Station", distance: "0.8 km", contact: "+91-11-2345-6789", status: "active" },
    { id: "2", name: "City Police Outpost", distance: "1.2 km", contact: "+91-11-2345-6790", status: "active" },
    { id: "3", name: "District Police Station", distance: "2.1 km", contact: "+91-11-2345-6791", status: "busy" },
  ];

  const saveAlertToSupabase = async (lat: number, lng: number, alertId: string) => {
    const { error } = await supabase
      .from("sos_alerts")
      .update({
        location: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
        latitude: lat,
        longitude: lng,
      })
      .eq("id", alertId);

    if (error) console.error("Error updating location:", error);
  };

  const getLocation = (alertId: string) => {
    setIsGettingLocation(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setIsGettingLocation(false);
          await saveAlertToSupabase(latitude, longitude, alertId);
        },
        async (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
          toast({
            title: "Location Error",
            description: "Could not get your location. Using default location for demo.",
            variant: "destructive",
          });
          const lat = 28.6139, lng = 77.2090;
          setLocation({ latitude: lat, longitude: lng });
          await saveAlertToSupabase(lat, lng, alertId);
        }
      );
    } else {
      setIsGettingLocation(false);
      const lat = 28.6139, lng = 77.2090;
      setLocation({ latitude: lat, longitude: lng });
      saveAlertToSupabase(lat, lng, alertId);
    }
  };

  const handleSOSActivation = async () => {
    setIsActivated(true);

    const alertId = `SR${Date.now()}`;

    const { error } = await supabase.from("sos_alerts").insert({
      id: alertId,
      title: "SOS Emergency Alert",
      category: "sos",
      location: "Getting location...",
      latitude: null,
      longitude: null,
      status: "sos",
      timestamp: new Date().toLocaleString("en-IN"),
      priority: "critical"
    });

if (error) {
  console.log(error);
  console.log(JSON.stringify(error, null, 2));

  toast({
    title: "Error",
    description: error.message,
    variant: "destructive",
  });

  return;
}

    getLocation(alertId);

    setTimeout(() => {
      setAlertSent(true);
      toast({
        title: "SOS Alert Sent!",
        description: "Emergency services have been notified of your location.",
      });
    }, 2000);
  };

  const resetSOS = () => {
    setIsActivated(false);
    setAlertSent(false);
    setLocation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emergency-dark via-emergency to-red-500 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency SOS</h1>
          <p className="text-xl opacity-90">
            Press the SOS button to send your location to nearby authorities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="text-center">
            {!isActivated ? (
              <div>
                <Button
                  onClick={handleSOSActivation}
                  size="lg"
                  className="w-48 h-48 rounded-full bg-white text-emergency hover:bg-gray-100 text-2xl font-bold shadow-2xl transform transition-all duration-200 hover:scale-105"
                  disabled={isGettingLocation}
                >
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="h-12 w-12 mb-2" />
                    <span>SOS</span>
                  </div>
                </Button>
                <p className="mt-6 text-lg opacity-90">Tap to send emergency alert</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-48 h-48 mx-auto rounded-full bg-white/10 border-4 border-white flex items-center justify-center">
                  <div className="text-center">
                    {isGettingLocation ? (
                      <div className="animate-pulse">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-lg">Getting Location...</p>
                      </div>
                    ) : alertSent ? (
                      <div>
                        <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-300" />
                        <p className="text-lg font-bold">Alert Sent!</p>
                      </div>
                    ) : (
                      <div className="animate-pulse">
                        <Clock className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-lg">Sending Alert...</p>
                      </div>
                    )}
                  </div>
                </div>

                {location && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Your Location:</h3>
                    <p className="text-sm">
                      Latitude: {location.latitude.toFixed(6)}
                      <br />
                      Longitude: {location.longitude.toFixed(6)}
                    </p>
                  </div>
                )}

                <Button
                  onClick={resetSOS}
                  variant="outline"
                  className="bg-white/20 border-white/50 text-white hover:bg-white/30"
                >
                  Cancel Alert
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {alertSent && (
              <Alert className="bg-success/20 border-success/30 text-white">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>SOS Alert Successfully Sent!</strong>
                  <br />
                  Emergency services have been notified. Help is on the way.
                </AlertDescription>
              </Alert>
            )}

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Nearby Police Stations
                </CardTitle>
                <CardDescription className="text-white/80">
                  Emergency services in your area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {policeStations.map((station) => (
                  <div key={station.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium">{station.name}</p>
                      <p className="text-sm text-white/80">{station.distance}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        station.status === "active" ? "bg-success/20 text-green-300" : "bg-warning/20 text-yellow-300"
                      }`}>
                        {station.status}
                      </div>
                      <p className="text-xs mt-1 text-white/80">{station.contact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Police</span>
                  <Button variant="outline" size="sm" className="bg-white/20 border-white/50 text-white hover:bg-white/30" onClick={() => window.open("tel:100")}>100</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Emergency Services</span>
                  <Button variant="outline" size="sm" className="bg-white/20 border-white/50 text-white hover:bg-white/30" onClick={() => window.open("tel:112")}>112</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fire Department</span>
                  <Button variant="outline" size="sm" className="bg-white/20 border-white/50 text-white hover:bg-white/30" onClick={() => window.open("tel:101")}>101</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Alert className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Only use SOS for genuine emergencies.
              Misuse of emergency services is a punishable offense.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default SOS;