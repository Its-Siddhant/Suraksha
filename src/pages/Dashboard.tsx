import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  LogOut,
  Eye,
  MapPin,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Report {
  id: string;
  title: string;
  category: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  status: "received" | "in-action" | "resolved" | "sos";
  timestamp: string;
  priority: "low" | "medium" | "high" | "critical";
}

const dummyReports: Report[] = [
  {
    id: "SR001234",
    title: "Theft of mobile phone",
    category: "theft",
    location: "Central Park, Delhi",
    status: "in-action",
    timestamp: "2026-05-02 14:30",
    priority: "high"
  },
  {
    id: "SR001235",
    title: "Harassment complaint",
    category: "harassment",
    location: "Metro Station, Mumbai",
    status: "in-action",
    timestamp: "2026-05-11 13:45",
    priority: "high"
  },
  {
    id: "SR001236",
    title: "Fraudulent transaction",
    category: "fraud",
    location: "Online Banking",
    status: "received",
    timestamp: "2026-05-23 12:20",
    priority: "medium"
  },
  {
    id: "SR001237",
    title: "Domestic violence case",
    category: "violence",
    location: "Residential Area, Bangalore",
    status: "resolved",
    timestamp: "2026-06-04 18:15",
    priority: "high"
  },
  {
    id: "SR001238",
    title: "Cybercrime report",
    category: "cybercrime",
    location: "Online Platform",
    status: "in-action",
    timestamp: "2026-06-17 16:30",
    priority: "medium"
  }
];

// Map Modal Component
const MapModal = ({ report, onClose }: { report: Report; onClose: () => void }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const lat = report.latitude ?? 28.6139;
    const lng = report.longitude ?? 77.2090;

    const map = L.map(mapRef.current).setView([lat, lng], 15);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Red pulsing marker for SOS
    const redIcon = L.divIcon({
      className: "",
      html: `<div style="
        width: 20px; height: 20px;
        background: red;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 3px red, 0 0 15px red;
        animation: pulse 1.5s infinite;
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([lat, lng], { icon: redIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align:center">
          <strong>🚨 SOS Alert</strong><br/>
          <span style="font-size:12px">${report.title}</span><br/>
          <span style="font-size:11px;color:#666">${report.timestamp}</span>
        </div>
      `)
      .openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <div>
              <h2 className="font-semibold">SOS Location — {report.id}</h2>
              <p className="text-sm text-white/70">{report.location}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Map */}
        <div ref={mapRef} style={{ height: "400px", width: "100%" }} />

        {/* Footer Info */}
        <div className="p-4 bg-red-50 border-t border-red-100 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-red-600">🚨 Emergency Alert</span>
            <span className="mx-2">·</span>
            {report.location}
            <span className="mx-2">·</span>
            {report.timestamp}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const lat = report.latitude ?? 28.6139;
              const lng = report.longitude ?? 77.2090;
              window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
            }}
          >
            Open in Google Maps
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { toast } = useToast();

  const mergeReports = () => {
    const savedAlerts: Report[] = JSON.parse(localStorage.getItem("sosAlerts") || "[]");
    const savedDummyStatuses: Record<string, Report["status"]> = JSON.parse(localStorage.getItem("dummyStatuses") || "{}");

    const updatedDummy = dummyReports.map(r => ({
      ...r,
      status: savedDummyStatuses[r.id] ?? r.status
    }));

    const dummyIds = new Set(dummyReports.map(r => r.id));
    const uniqueSavedAlerts = savedAlerts.filter(r => !dummyIds.has(r.id));
    return [...uniqueSavedAlerts, ...updatedDummy];
  };

  useEffect(() => {
    if (isLoggedIn) {
      setReports(mergeReports());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setReports(mergeReports());
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "police" && loginData.password === "admin123") {
      setIsLoggedIn(true);
      toast({ title: "Login Successful", description: "Welcome to the Police Dashboard" });
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials. Use: police / admin123", variant: "destructive" });
    }
  };

  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId ? { ...report, status: newStatus as Report["status"] } : report
      )
    );

    const savedAlerts: Report[] = JSON.parse(localStorage.getItem("sosAlerts") || "[]");
    const updatedAlerts = savedAlerts.map(r =>
      r.id === reportId ? { ...r, status: newStatus as Report["status"] } : r
    );
    localStorage.setItem("sosAlerts", JSON.stringify(updatedAlerts));

    const savedDummyStatuses = JSON.parse(localStorage.getItem("dummyStatuses") || "{}");
    savedDummyStatuses[reportId] = newStatus;
    localStorage.setItem("dummyStatuses", JSON.stringify(savedDummyStatuses));

    toast({ title: "Status Updated", description: `Report ${reportId} status changed to ${newStatus}` });
  };

  const handleViewReport = (report: Report) => {
    if (report.category === "sos" && (report.latitude || report.longitude)) {
      setSelectedReport(report);
    } else {
      toast({
        title: "No Map Available",
        description: "Map view is only available for SOS alerts with GPS coordinates.",
      });
    }
  };

  const getStatusBadge = (status: string, priority: string) => {
    const colors: Record<string, string> = {
      received: "bg-blue-100 text-blue-800",
      "in-action": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      sos: "bg-red-100 text-red-800"
    };
    const priorityColors: Record<string, string> = {
      low: "border-l-4 border-green-500",
      medium: "border-l-4 border-yellow-500",
      high: "border-l-4 border-orange-500",
      critical: "border-l-4 border-red-500"
    };
    return (
      <div className={`flex items-center gap-2 ${priorityColors[priority] || ""}`}>
        <Badge className={colors[status] || "bg-gray-100 text-gray-800"}>
          {status === "sos" ? "🚨 SOS" : status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    );
  };

  const filteredReports = filter === "all" ? reports : reports.filter(r => r.status === filter);

  const stats = {
    total: reports.length,
    sos: reports.filter(r => r.status === "sos").length,
    inAction: reports.filter(r => r.status === "in-action").length,
    resolved: reports.filter(r => r.status === "resolved").length
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4">
          <Card className="card-shadow-lg bg-white">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Police Dashboard</CardTitle>
              <CardDescription>Secure access for law enforcement personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" placeholder="Enter username" value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))} required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Demo Credentials:</strong><br />Username: police<br />Password: admin123
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Map Modal */}
      {selectedReport && (
        <MapModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}

      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Police Command Center</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}
            className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{stats.total}</p></div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">Active SOS</p>
                <p className="text-2xl font-bold text-red-600">{stats.sos}</p></div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inAction}</p></div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p></div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent></Card>
        </div>

        {/* Reports Table */}
        <Card className="card-shadow">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Crime Reports</CardTitle>
                <CardDescription>Monitor and manage reported incidents · Auto-refreshes every 3s</CardDescription>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="sos">🚨 SOS Alerts</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="in-action">In Action</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className={report.status === "sos" ? "bg-red-50 border-red-200" : ""}>
                      <TableCell className="font-mono">{report.id}</TableCell>
                      <TableCell className="max-w-xs truncate">{report.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{report.category}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{report.location}</TableCell>
                      <TableCell>{getStatusBadge(report.status, report.priority)}</TableCell>
                      <TableCell>{report.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select value={report.status} onValueChange={(value) => handleStatusUpdate(report.id, value)}>
                            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="received">Received</SelectItem>
                              <SelectItem value="in-action">In Action</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant={report.category === "sos" && report.latitude ? "default" : "outline"}
                            onClick={() => handleViewReport(report)}
                            title={report.category === "sos" ? "View on Map" : "No map available"}
                          >
                            {report.category === "sos" && report.latitude
                              ? <MapPin className="h-4 w-4" />
                              : <Eye className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;