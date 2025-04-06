import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareText, RefreshCw, Zap } from "lucide-react";

interface ChatHeaderProps {
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
  return (
    <header className="bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 h-20 px-4 sm:px-6 shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-center h-full max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full shadow-lg border border-white/30 backdrop-blur-sm">
            <MessageSquareText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Sales Co-Pilot</span>
              <span className="ml-2 bg-blue-400/20 rounded-full px-2 py-0.5 text-xs font-medium text-white border border-white/20 flex items-center shadow-inner">
                <Zap className="h-3 w-3 mr-1 text-blue-100" />
                AI Powered
              </span>
            </h1>
            <p className="text-blue-100 text-xs max-w-md">Generate pre-call reports with LinkedIn & website URLs</p>
          </div>
        </div>
        <Button 
          variant="secondary" 
          onClick={onClearChat}
          className="text-xs py-1.5 px-3 font-medium bg-white/10 text-white hover:bg-white/20 transition-all duration-200 shadow-md backdrop-blur-sm rounded-full border border-white/10 hover:scale-105 active:scale-95"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Reset Chat
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl -z-0 animate-pulse-slow"></div>
      <div className="absolute -top-10 left-1/3 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl -z-0"></div>
      <div className="absolute bottom-0 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl -z-0"></div>
    </header>
  );
};

export default ChatHeader;
