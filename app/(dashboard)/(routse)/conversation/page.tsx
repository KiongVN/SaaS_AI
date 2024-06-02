"use client"

import ToolsNavigation from "@/components/dashboard/tools-navigation";
import { useRef } from "react"
import { useChat } from 'ai/react';
import UserMessage from "@/components/dashboard/user-message";
import AiResponse from "@/components/dashboard/ai-response";
import MarkdownResponse from "@/components/dashboard/markdown-response";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ConversationPage() {
  const containeRef = useRef(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    setMessages
  } = useChat({
    api: "/api/conversation"
  });

  const handleClearChat =() => {
    setMessages([])
  }
    return (
      <div className="h-full relative flex flex-col justify-between"> 
        <div 
        ref={containeRef}
        className="overflow-y-auto space-y-10 scroll-smooth h-[calc(100vh-180px)] "
        >
          {
            messages.length >0 ?
            <>
              {messages.map (m => (
                <div key={m.id} className="whitespace-pre-wrap">
                  {
                    m.role =="user" ?
                    <UserMessage>
                      <MarkdownResponse content={m.content} />
                    </UserMessage>
                    :
                    <AiResponse>
                      <MarkdownResponse content={m.content} />
                    </AiResponse>
                  }
                </div>
              ))}
              <div className="absolute  left-0 bottom-20 text-right w-full pr-3">
                <Button
                size="sm"
                variant="outline"
                onChange={handleClearChat}
                >
                  Clear chat
                </Button>
              </div>
            </>:
            <ToolsNavigation title="Conversation"/>
          }
        </div>
        <div className="mb-[13px]">
          <form 
          onSubmit={isLoading ? stop: handleSubmit}
          className="flex items-center w-full relative"
          >
            <Textarea 
            placeholder="Do you have questins today ?"
            value={input}
            onChange={handleInputChange}
            className="min-h1 resize-none"
            />
            <Button 
            type="submit"
            disabled={!input}
            className="absolute right-2 gradient-btn"
            >
              {
                isLoading ? "Stop" : <Send/>
              }
            </Button>
          </form>
        </div>
      </div>
    )
  }
  