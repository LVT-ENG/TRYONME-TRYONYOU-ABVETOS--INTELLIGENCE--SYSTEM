import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send, Sparkles, Heart, Gift, Shirt } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

type InteractionType = "outfit_suggestion" | "donation_advice" | "exchange_guidance" | "care_tips" | "style_consultation" | "general_chat";

interface Message {
  id: string;
  role: "user" | "pau";
  content: string;
  timestamp: Date;
}

export default function PauAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "pau",
      content: "Hi! I'm Pau, your TRYONYOU Intelligent Wardrobe Assistant. I'm here to help you with outfit suggestions, wardrobe optimization, donation advice, and more. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedType, setSelectedType] = useState<InteractionType>("general_chat");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat history
  const { data: chatHistory = [] } = trpc.pau.getHistory.useQuery();

  // Chat mutation
  const chatMutation = trpc.pau.chat.useMutation({
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `pau-${Date.now()}`,
          role: "pau",
          content: response.response,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      setIsLoading(false);
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ]);

    // Send to Pau
    chatMutation.mutate({
      message: userMessage,
      type: selectedType,
    });
  };

  const suggestedPrompts: { type: InteractionType; icon: React.ReactNode; title: string; prompt: string }[] = [
    {
      type: "outfit_suggestion",
      icon: <Shirt className="w-4 h-4" />,
      title: "Outfit Suggestion",
      prompt: "I have a casual day planned. What outfit would you suggest from my wardrobe?",
    },
    {
      type: "donation_advice",
      icon: <Gift className="w-4 h-4" />,
      title: "Donation Advice",
      prompt: "Which items in my wardrobe should I consider donating?",
    },
    {
      type: "care_tips",
      icon: <Heart className="w-4 h-4" />,
      title: "Care Tips",
      prompt: "How should I care for my delicate fabrics to make them last longer?",
    },
    {
      type: "style_consultation",
      icon: <Sparkles className="w-4 h-4" />,
      title: "Style Consultation",
      prompt: "Help me develop my personal style. What should I focus on?",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Pau Assistant</h1>
          </div>
          <p className="text-lg text-slate-600">Your intelligent wardrobe companion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Chat with Pau</CardTitle>
                <CardDescription>Get personalized wardrobe advice and suggestions</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-slate-100 text-slate-900 rounded-bl-none"
                        }`}
                      >
                        {msg.role === "pau" ? (
                          <Streamdown>{msg.content}</Streamdown>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg rounded-bl-none">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Ask Pau anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Type Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conversation Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { value: "outfit_suggestion" as const, label: "Outfit Suggestions" },
                    { value: "donation_advice" as const, label: "Donation Advice" },
                    { value: "exchange_guidance" as const, label: "Exchange Guidance" },
                    { value: "care_tips" as const, label: "Care Tips" },
                    { value: "style_consultation" as const, label: "Style Consultation" },
                    { value: "general_chat" as const, label: "General Chat" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={option.value}
                        checked={selectedType === option.value}
                        onChange={(e) => setSelectedType(e.target.value as InteractionType)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt.type}
                    onClick={() => {
                      setSelectedType(prompt.type);
                      setInput(prompt.prompt);
                    }}
                    className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {prompt.icon}
                      <span className="font-medium text-slate-900">{prompt.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{prompt.prompt}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">About Pau</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Pau learns from your wardrobe, wear history, and preferences to provide personalized recommendations for outfits, donations, and style improvements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
