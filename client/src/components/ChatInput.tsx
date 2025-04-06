import React, { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send as SendIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = () => {
    if (message.trim() && !disabled) {
      console.log("Sending message:", message.trim());
      onSendMessage(message.trim());
      setMessage("");
      
      // Focus back to textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gradient-to-b from-white to-blue-50 p-3 sm:p-4 shadow-lg relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2 sm:gap-3">
          <div className="flex-1 relative rounded-xl border border-blue-200 bg-white shadow-md hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300 transition-all duration-200">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={2}
              className="resize-none border-0 bg-transparent py-2.5 sm:py-3 px-3 sm:px-4 focus:outline-none focus:ring-0 text-sm text-gray-800"
              disabled={disabled}
            />
          </div>
          
          <Button
            type="button"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg flex-shrink-0 rounded-full p-0 flex items-center justify-center transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Send message"
          >
            <SendIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
        
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs">
          <p className="text-blue-600 font-medium">
            <span className="hidden xs:inline">Use the </span><span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Send</span><span className="hidden xs:inline"> button to send message</span>
          </p>
          <p className="text-gray-500">
            {message.length} characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
