import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Zap, Clock, CheckCircle2 } from "lucide-react";
import { crimeClassifier } from "@/utils/crimeClassifier";

const AIClassificationDemo = () => {
  const [inputText, setInputText] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<{
    category: string;
    confidence: number;
    method: 'ai' | 'keyword';
    suggestions?: string[];
  } | null>(null);

  const sampleTexts = [
    "Someone stole my wallet from my bag while I was at the coffee shop. It had my credit cards and cash in it.",
    "A person has been following me home from work for the past week and sending threatening messages on social media.",
    "I was attacked by a group of people outside the metro station. They hit me and I got injured.",
    "I received fake emails claiming to be from my bank asking for my account details and passwords."
  ];

  const handleClassify = async (text?: string) => {
    const textToClassify = text || inputText;
    if (!textToClassify.trim()) return;

    setIsClassifying(true);
    try {
      const classification = await crimeClassifier.classifyText(textToClassify);
      setResult(classification);
    } catch (error) {
      console.error('Classification failed:', error);
    } finally {
      setIsClassifying(false);
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="card-shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Crime Classification Demo
          </CardTitle>
          <CardDescription>
            Test our AI-powered crime categorization system. It uses both advanced ML models and keyword analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Crime Description
              </label>
              <Textarea
                placeholder="Describe the crime incident in detail..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            
            <Button 
              onClick={() => handleClassify()}
              disabled={isClassifying || !inputText.trim()}
              className="w-full"
            >
              {isClassifying ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Classify Crime
                </>
              )}
            </Button>
          </div>

          {/* Sample Texts */}
          <div>
            <h3 className="text-sm font-medium mb-3">Try Sample Cases:</h3>
            <div className="grid gap-2">
              {sampleTexts.map((text, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputText(text);
                    handleClassify(text);
                  }}
                  className="text-left justify-start h-auto p-3 whitespace-normal"
                  disabled={isClassifying}
                >
                  <div className="truncate">
                    {text.substring(0, 80)}...
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Classification Result
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Category:</span>
                        <Badge className={getCategoryColor(result.category)}>
                          {result.category.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Method:</span>
                        <Badge variant="outline">
                          {result.method === 'ai' ? 'AI Model' : 'Keyword Analysis'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-2">Suggestions:</h4>
                    <ul className="space-y-1">
                      {result.suggestions?.map((suggestion, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Info Alert */}
          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              <strong>How it works:</strong> The system first attempts to use advanced AI models for classification. 
              If unavailable, it falls back to intelligent keyword analysis. 
              This ensures fast, reliable categorization in all environments.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIClassificationDemo;