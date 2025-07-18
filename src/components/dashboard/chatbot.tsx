
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bot, Loader2, Send, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { teachingAssistant } from '@/ai/flows/teaching-assistant';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { User as AppUser } from '@/lib/data';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const MESSAGE_LIMIT = 50;

type ChatbotProps = {
  user: AppUser;
}

export function Chatbot({ user }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isLimitReached = !user.isPremium && userMessageCount >= MESSAGE_LIMIT;

  useEffect(() => {
    // Load message count from localStorage when component mounts
    const savedCount = localStorage.getItem(`messageCount_${user.id}`);
    setUserMessageCount(savedCount ? parseInt(savedCount, 10) : 0);
  }, [user.id]);

  useEffect(() => {
    if (isOpen) {
      // Reset messages, but not the permanent message count
      setMessages([]);
      setInput('');
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLimitReached) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Increment and save the message count for non-premium users
    if (!user.isPremium) {
      const newCount = userMessageCount + 1;
      setUserMessageCount(newCount);
      localStorage.setItem(`messageCount_${user.id}`, newCount.toString());
    }
    
    setInput('');
    setIsLoading(true);

    try {
      const stream = await teachingAssistant({
        message: input,
        subjects: user.subjects,
      });

      let assistantResponse = '';
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: !done });
        assistantResponse += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantResponse;
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Error with teaching assistant:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: 'Could not get a response. Please try again.',
      });
       setMessages((prev) => {
        // Remove the empty assistant message placeholder on error
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.role === 'assistant' && lastMessage.content === '') {
            return prev.slice(0, prev.length -1);
        }
        return prev;
       });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={handleTriggerClick}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
          aria-label="Ask AI"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="pr-10">
          <SheetTitle>AI Teaching Assistant</SheetTitle>
        </SheetHeader>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </SheetClose>
        <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef as any}>
            <div className="flex flex-col gap-4 py-4 pr-4">
              {messages.length === 0 && !isLimitReached && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted">
                    Hello! How can I help you with your {user.subjects.join(' or ')} lessons today?
                  </div>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length -1]?.role === 'assistant' && (
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="rounded-lg p-3 bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                </div>
              )}
            </div>
        </ScrollArea>
        <div className="mt-auto border-t pt-4">
            {isLimitReached ? (
                 <div className="text-center p-4">
                    <Sparkles className="mx-auto h-6 w-6 text-yellow-500 mb-2" />
                    <p className="font-semibold">You've reached the message limit.</p>
                    <p className="text-sm text-muted-foreground">Upgrade to Premium for unlimited AI access.</p>
                    <Button asChild className="mt-4" size="sm">
                      <Link href="/dashboard/upgrade">Upgrade to Premium</Link>
                    </Button>
                </div>
            ) : (
             <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask for teaching help..."
                    className="flex-grow"
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
           )}
           {!user.isPremium && (
            <div className="text-xs text-muted-foreground text-center mt-2">
                {userMessageCount}/{MESSAGE_LIMIT} messages used.
            </div>
           )}
            {user.isPremium && (
            <div className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-accent" />
                <span>Premium Member: Unlimited access.</span>
            </div>
           )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
