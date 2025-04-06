import { useState, useRef, useEffect } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Bookmark, Share2, Briefcase, LineChart, UserCircle, Building2, LinkIcon } from "lucide-react";

export type Message = {
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      console.log("Webhook response received:", data);
      if (data && data.response) {
        addMessage(data.response, "agent");
      } else {
        console.error("Invalid response format:", data);
        toast({
          title: "Response Error",
          description: "Received an invalid response format",
          variant: "destructive",
        });
        addMessage("I received a response but couldn't process it correctly. Please try again.", "agent");
      }
    },
    onError: (error) => {
      console.error("Webhook error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      
      addMessage("I'm sorry, there was an error processing your request. Please try again.", "agent");
    }
  });

  const addMessage = (text: string, sender: "user" | "agent") => {
    setMessages((prev) => [...prev, { text, sender, timestamp: new Date() }]);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    console.log("Sending message:", text);
    
    addMessage(text, "user");
    
    // Generate conversation history for the API
    const conversationHistory = messages
      .map((msg) => `${msg.sender === "user" ? "User" : "Agent"}: ${msg.text}`)
      .join("\n");
    
    console.log("Conversation history:", conversationHistory);
    
    mutate({
      message: text,
      conversationHistory,
    });
  };

  const handleClearChat = () => {
    setMessages([]);
    
    // Focus back to input after clearing
    if (chatContainerRef.current) {
      const inputElement = chatContainerRef.current.querySelector('textarea');
      if (inputElement) {
        setTimeout(() => inputElement.focus(), 100);
      }
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-blue-50" ref={chatContainerRef}>
      <div className="flex-shrink-0">
        <ChatHeader onClearChat={handleClearChat} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0">
        <div className="flex flex-col space-y-6 max-w-4xl mx-auto relative">
          {/* Enhanced background effects */}
          <div className="absolute -top-10 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-40 left-10 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-50/40 rounded-full blur-xl -z-10"></div>
        
          {messages.length === 0 && !isPending && (
            <div className="flex items-center justify-center h-full my-8 sm:my-12">
              <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl max-w-sm sm:max-w-md text-center border border-blue-100 w-full mx-4 sm:mx-0">
                <div className="mx-auto mb-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-105">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">Welcome to Sales Co-Pilot</h2>
                <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                  Generate comprehensive pre-call reports instantly by providing LinkedIn and website URLs.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                    <UserCircle className="h-5 w-5 text-blue-600 mb-1 mx-auto" />
                    <p className="text-xs text-blue-700 font-medium">Personal Insights</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                    <Building2 className="h-5 w-5 text-blue-600 mb-1 mx-auto" />
                    <p className="text-xs text-blue-700 font-medium">Company Details</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                    <LineChart className="h-5 w-5 text-blue-600 mb-1 mx-auto" />
                    <p className="text-xs text-blue-700 font-medium">Market Position</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                    <Bookmark className="h-5 w-5 text-blue-600 mb-1 mx-auto" />
                    <p className="text-xs text-blue-700 font-medium">Key Takeaways</p>
                  </div>
                </div>
                
                <div className="text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg shadow-md transform transition-all duration-300 hover:scale-102">
                  <div className="flex items-center justify-center mb-1">
                    <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
                    <span>How to use</span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Paste LinkedIn URL and website URL below and click Send
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {isPending && (
            <div className="flex items-start gap-2 sm:gap-3 my-3 sm:my-4 px-2 animate-fadeIn">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="rounded-2xl px-3 sm:px-5 py-3 sm:py-4 bg-white border border-blue-100 shadow-md relative w-auto max-w-[calc(100%-50px)] sm:max-w-none">
                <div className="absolute top-3 sm:top-4 -left-2 w-3 sm:w-4 h-3 sm:h-4 rotate-45 bg-white border-l border-t border-blue-100"></div>
                <div className="text-[10px] sm:text-xs font-semibold text-blue-600 mb-1 sm:mb-2">
                  Sales Co-Pilot
                </div>
                <div className="flex space-x-2 sm:space-x-3">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2">
                  Generating pre-call report...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="flex-shrink-0 w-full">
        <ChatInput onSendMessage={handleSendMessage} disabled={isPending} />
      </div>
    </div>
  );
};

export default Home;
