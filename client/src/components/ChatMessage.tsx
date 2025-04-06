import React from "react";
import { type Message } from "@/pages/Home";
import { cn } from "@/lib/utils";
import { MessageSquare, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAgent = message.sender === "agent";
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });

  return (
    <div className={cn(
      "flex items-start gap-3 my-4 px-2 transition-all duration-300 animate-fadeIn", 
      isAgent ? "" : "justify-end"
    )}>
      {isAgent && (
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg transform transition-transform duration-200 hover:scale-105">
            <MessageSquare className="h-5 w-5" />
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "rounded-2xl px-4 sm:px-5 py-3 w-auto max-w-[calc(100%-60px)] sm:max-w-[85%] md:max-w-lg lg:max-w-xl relative transition-all duration-300",
          isAgent 
            ? "bg-white text-gray-800 border border-blue-100 shadow-md" 
            : "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-900 border border-blue-200 shadow-md"
        )}
      >
        {/* Triangle for agent message */}
        {isAgent && (
          <div className="absolute top-4 -left-2 w-4 h-4 rotate-45 bg-white border-l border-t border-blue-100"></div>
        )}
        
        {/* Triangle for user message */}
        {!isAgent && (
          <div className="absolute top-4 -right-2 w-4 h-4 rotate-45 bg-blue-50 border-r border-t border-blue-200"></div>
        )}
        
        {/* Header for agent message */}
        {isAgent && (
          <div className="text-xs font-semibold text-blue-600 mb-1">
            Sales Co-Pilot
          </div>
        )}
        
        {/* Message text with markdown formatting for agent messages */}
        <div className={cn(
          isAgent ? "text-gray-800 prose prose-sm max-w-none break-words overflow-hidden prose-headings:font-bold prose-headings:text-blue-700 prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-a:text-blue-600 prose-a:break-words prose-a:overflow-hidden prose-strong:text-blue-700 prose-strong:font-semibold prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-code:text-xs prose-code:break-words prose-pre:text-xs prose-pre:whitespace-pre-wrap" 
                : "text-gray-900 font-medium whitespace-pre-line break-words"
        )}>
          {isAgent ? (
            <ReactMarkdown>{message.text}</ReactMarkdown>
          ) : (
            message.text
          )}
        </div>
        
        {/* Time indicator */}
        <div className={cn(
          "text-xs mt-2 text-right",
          isAgent ? "text-gray-400" : "text-blue-500"
        )}>
          {timeAgo}
        </div>
      </div>
      
      {!isAgent && (
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 shadow-md border border-blue-200 transform transition-transform duration-200 hover:scale-105">
            <User className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  );
};

// Animation is handled in index.css

export default ChatMessage;
