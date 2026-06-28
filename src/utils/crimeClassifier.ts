import { pipeline } from '@huggingface/transformers';

// Crime classification using Hugging Face Transformers
class CrimeClassifier {
  private classifier: any = null;
  private isInitialized = false;
  private keywordRules: Record<string, string[]> = {
    'theft': [
      'steal', 'stolen', 'theft', 'robbery', 'rob', 'burglary', 'burglar', 
      'shoplifting', 'pickpocket', 'money', 'wallet', 'purse', 'phone', 
      'laptop', 'jewelry', 'cash', 'credit card', 'took my', 'stole my'
    ],
    'harassment': [
      'harass', 'harassment', 'stalking', 'stalk', 'follow', 'threaten', 
      'threat', 'intimidate', 'bully', 'abuse', 'verbal', 'mental', 
      'emotional', 'disturb', 'annoy', 'unwanted', 'inappropriate'
    ],
    'violence': [
      'violence', 'violent', 'hit', 'attack', 'assault', 'fight', 'beat', 
      'punch', 'kick', 'slap', 'hurt', 'injured', 'physical', 'bleeding', 
      'weapon', 'knife', 'gun', 'shot', 'murder', 'kill', 'domestic'
    ],
    'fraud': [
      'fraud', 'scam', 'cheat', 'fake', 'identity', 'phishing', 'online', 
      'cyber', 'banking', 'transaction', 'credit', 'debit', 'account', 
      'password', 'hacking', 'spam', 'email', 'sms', 'call center'
    ],
    'cybercrime': [
      'cyber', 'hacking', 'malware', 'virus', 'phishing', 'spam', 
      'online fraud', 'digital', 'internet', 'website', 'social media', 
      'facebook', 'instagram', 'whatsapp', 'email hack', 'password'
    ]
  };

  // Initialize AI model (fallback to keyword-based if model fails)
  async initialize() {
    try {
      console.log('Initializing AI crime classifier...');
      
      // Try to load a general text classification model
      this.classifier = await pipeline(
        'zero-shot-classification',
        'facebook/bart-large-mnli',
        { 
          device: 'webgpu',
          // Fallback to CPU if WebGPU not available
          dtype: 'fp32'
        }
      );
      
      this.isInitialized = true;
      console.log('AI classifier initialized successfully');
    } catch (error) {
      console.warn('AI model failed to load, using keyword-based classification:', error);
      this.isInitialized = false;
    }
  }

  // Keyword-based classification (fast fallback)
  private classifyByKeywords(text: string): { label: string; confidence: number } {
    const normalizedText = text.toLowerCase();
    const scores: Record<string, number> = {
      'theft': 0,
      'harassment': 0,
      'violence': 0,
      'fraud': 0,
      'cybercrime': 0,
      'other': 0
    };

    // Count keyword matches for each category
    for (const [category, keywords] of Object.entries(this.keywordRules)) {
      for (const keyword of keywords) {
        if (normalizedText.includes(keyword)) {
          scores[category] += 1;
        }
      }
    }

    // Find the category with highest score
    const maxCategory = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    );

    const maxScore = maxCategory[1];
    const confidence = maxScore > 0 ? Math.min(0.6 + (maxScore * 0.1), 0.95) : 0.3;

    return {
      label: maxScore > 0 ? maxCategory[0] : 'other',
      confidence
    };
  }

  // AI-based classification using Hugging Face model
  private async classifyByAI(text: string): Promise<{ label: string; confidence: number }> {
    try {
      const categories = ['theft', 'harassment', 'violence', 'fraud', 'cybercrime', 'other'];
      
      const result = await this.classifier(text, categories);
      
      return {
        label: result.labels[0],
        confidence: result.scores[0]
      };
    } catch (error) {
      console.warn('AI classification failed, falling back to keywords:', error);
      return this.classifyByKeywords(text);
    }
  }

  // Main classification method
  async classifyText(text: string): Promise<{ 
    category: string; 
    confidence: number; 
    method: 'ai' | 'keyword';
    suggestions?: string[];
  }> {
    if (!text || text.trim().length < 10) {
      return {
        category: 'other',
        confidence: 0.1,
        method: 'keyword',
        suggestions: ['Please provide more details about the incident']
      };
    }

    let result: { label: string; confidence: number };
    let method: 'ai' | 'keyword' = 'keyword';

    if (this.isInitialized && this.classifier) {
      try {
        result = await this.classifyByAI(text);
        method = 'ai';
      } catch {
        result = this.classifyByKeywords(text);
        method = 'keyword';
      }
    } else {
      result = this.classifyByKeywords(text);
    }

    // Generate suggestions based on classification
    const suggestions = this.generateSuggestions(result.label, text);

    return {
      category: result.label,
      confidence: result.confidence,
      method,
      suggestions
    };
  }

  // Generate helpful suggestions based on category
  private generateSuggestions(category: string, text: string): string[] {
    const suggestions: Record<string, string[]> = {
      'theft': [
        'Include details about what was stolen',
        'Mention the approximate time and location',
        'Describe any witnesses present'
      ],
      'harassment': [
        'Document dates and times of incidents',
        'Save any messages or evidence',
        'Consider reporting to local authorities'
      ],
      'violence': [
        'Seek immediate medical attention if injured',
        'Contact emergency services if in danger',
        'Preserve any evidence of the incident'
      ],
      'fraud': [
        'Change passwords for affected accounts',
        'Contact your bank or financial institution',
        'Document all fraudulent transactions'
      ],
      'cybercrime': [
        'Secure your digital accounts immediately',
        'Document all digital evidence',
        'Report to cyber crime cell'
      ],
      'other': [
        'Provide as much detail as possible',
        'Include relevant dates and locations',
        'Mention any evidence you have'
      ]
    };

    return suggestions[category] || suggestions['other'];
  }

  // Batch processing for multiple texts
  async classifyBatch(texts: string[]): Promise<Array<{
    text: string;
    category: string;
    confidence: number;
    method: 'ai' | 'keyword';
  }>> {
    const results = await Promise.all(
      texts.map(async (text) => {
        const result = await this.classifyText(text);
        return {
          text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
          category: result.category,
          confidence: result.confidence,
          method: result.method
        };
      })
    );

    return results;
  }
}

// Export singleton instance
export const crimeClassifier = new CrimeClassifier();

// Initialize on module load
crimeClassifier.initialize().catch(console.error);