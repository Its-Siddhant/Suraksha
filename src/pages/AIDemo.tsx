import AIClassificationDemo from "@/components/AIClassificationDemo";

const AIDemo = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          AI Classification Demo
        </h1>
        <p className="text-xl text-muted-foreground">
          Test the AI-powered crime categorization system
        </p>
      </div>
      <AIClassificationDemo />
    </div>
  );
};

export default AIDemo;