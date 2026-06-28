import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Shield, CheckCircle2, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { crimeClassifier } from "@/utils/crimeClassifier";

const CrimeReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    isAnonymous: false,
    evidence: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    confidence: number;
    suggestions?: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "theft", label: "Theft / चोरी" },
    { value: "harassment", label: "Harassment / उत्पीड़न" },
    { value: "violence", label: "Violence / हिंसा" },
    { value: "fraud", label: "Fraud / धोखाधड़ी" },
    { value: "cybercrime", label: "Cybercrime / साइबर अपराध" },
    { value: "other", label: "Other / अन्य" },
  ];

  // AI-powered category suggestion
  useEffect(() => {
    const analyzeDescription = async () => {
      if (formData.description.length > 50 && !formData.category) {
        setIsAnalyzing(true);
        try {
          const result = await crimeClassifier.classifyText(formData.description);
          setAiSuggestion(result);
        } catch (error) {
          console.error('AI analysis failed:', error);
        } finally {
          setIsAnalyzing(false);
        }
      } else {
        setAiSuggestion(null);
      }
    };

    const debounceTimer = setTimeout(analyzeDescription, 1000);
    return () => clearTimeout(debounceTimer);
  }, [formData.description, formData.category]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const acceptAiSuggestion = () => {
    if (aiSuggestion) {
      handleInputChange("category", aiSuggestion.category);
      setAiSuggestion(null);
      toast({
        title: "Category Applied",
        description: `Set category to ${aiSuggestion.category.toUpperCase()}`,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'theft': 'bg-orange-100 text-orange-800',
      'harassment': 'bg-purple-100 text-purple-800',
      'violence': 'bg-red-100 text-red-800',
      'fraud': 'bg-blue-100 text-blue-800',
      'cybercrime': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['other'];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, evidence: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Report Submitted Successfully",
      description: "Your report has been submitted and will be reviewed by authorities.",
    });

    // Generate report ID
    const reportId = `SR${Date.now().toString().slice(-6)}`;
    localStorage.setItem('lastReportId', reportId);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="card-shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="mx-auto bg-success/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-12 w-12 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Report Submitted Successfully</h2>
              <p className="text-muted-foreground mb-6">
                Your report has been received and assigned ID: <strong>SR{Date.now().toString().slice(-6)}</strong>
                <br />
                Authorities will review and take appropriate action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)}>
                  Submit Another Report
                </Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Submit Crime Report
          </h1>
          <p className="text-xl text-muted-foreground">
            Your information is secure and can be submitted anonymously
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Report Details
                </CardTitle>
                <CardDescription>
                  Please provide as much detail as possible to help authorities investigate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Incident Title *</Label>
                    <Input
                      id="title"
                      placeholder="Brief summary of the incident"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crime category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the incident (what, when, where, who)"
                      className="min-h-[120px]"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                    
                    {/* AI Analysis Results */}
                    {isAnalyzing && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Brain className="h-4 w-4 animate-pulse" />
                        Analyzing description...
                      </div>
                    )}
                    
                    {aiSuggestion && !formData.category && (
                      <Alert className="border-primary/20 bg-primary/5">
                        <Zap className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>
                                <strong>AI Suggestion:</strong> This appears to be{" "}
                                <Badge className={getCategoryColor(aiSuggestion.category)}>
                                  {aiSuggestion.category.toUpperCase()}
                                </Badge>
                                {" "}({Math.round(aiSuggestion.confidence * 100)}% confidence)
                              </span>
                              <Button
                                size="sm"
                                onClick={acceptAiSuggestion}
                                className="ml-2"
                              >
                                Use Suggestion
                              </Button>
                            </div>
                            {aiSuggestion.suggestions && (
                              <div className="text-xs text-muted-foreground">
                                <strong>Tips:</strong> {aiSuggestion.suggestions[0]}
                              </div>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Evidence Upload (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload photos, videos, or documents (Max 10MB)
                      </p>
                      <Input
                        type="file"
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="max-w-xs mx-auto"
                      />
                      {formData.evidence && (
                        <p className="mt-2 text-sm text-success">
                          File selected: {formData.evidence.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onCheckedChange={(checked) => handleInputChange("isAnonymous", checked)}
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Submit this report anonymously
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting || !formData.title || !formData.description || !formData.category}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">End-to-End Encryption</p>
                    <p className="text-sm text-muted-foreground">All data is encrypted before transmission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Anonymous Option</p>
                    <p className="text-sm text-muted-foreground">Choose to keep your identity private</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Secure Storage</p>
                    <p className="text-sm text-muted-foreground">Data stored with bank-level security</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertDescription>
                <strong>Emergency?</strong> If this is an ongoing emergency, please call 100 (Police) or 112 (Emergency Services) immediately.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeReport;