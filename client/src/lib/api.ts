const WEBHOOK_URL = "https://hook.eu2.make.com/wgxs44a6ij6dddtlimfii9cuvyf70ilj";

export interface SendMessageRequest {
  message: string; // Will be sent as currentMessage
  conversationHistory: string;
}

export interface SendMessageResponse {
  response: string;
}

export const sendMessage = async (
  data: SendMessageRequest
): Promise<SendMessageResponse> => {
  try {
    console.log("Sending to webhook:", {
      currentMessage: data.message,
      conversationHistory: data.conversationHistory
    });
    
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentMessage: data.message,
        conversationHistory: data.conversationHistory,
      }),
    });

    console.log("Webhook response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Webhook error:", errorText);
      throw new Error(`Failed to send message: ${response.status} ${errorText}`);
    }

    // Get the response as text first
    const responseText = await response.text();
    console.log("Raw response text:", responseText);
    
    // Try to parse it as JSON
    try {
      const responseData = JSON.parse(responseText);
      console.log("Parsed webhook JSON response:", responseData);
      return responseData;
    } catch (jsonError) {
      console.log("Not valid JSON, using text response");
      
      // If not valid JSON, use the text directly
      return { 
        response: responseText 
      };
    }
  } catch (error) {
    console.error("Error in sendMessage:", error);
    if (error instanceof Error) {
      return { 
        response: `Error: ${error.message}. Please try again later.` 
      };
    } else {
      return { 
        response: "An unknown error occurred. Please try again later."
      };
    }
  }
};
