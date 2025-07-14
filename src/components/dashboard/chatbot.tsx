
'use client';

import { useState } from 'react';
import { Bot, Loader2, Send, Sparkles, X } from 'lucide-react';
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
import { currentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { teachingAssistant } from '@/ai/flows/teaching-assistant';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { stream, response } = await teachingAssistant({
        message: input,
        subjects: currentUser.subjects,
      });

      let assistantResponse = '';
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of stream) {
        assistantResponse += chunk.text;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantResponse;
          return newMessages;
        });
      }
      await response;
    } catch (error) {
      console.error('Error with teaching assistant:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: 'Could not get a response. Please try again.',
      });
      setMessages((prev) =>
        prev.slice(0, prev.length - (prev[prev.length - 1].role === 'assistant' ? 2 : 1))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerClick = () => {
    if (currentUser.isPremium) {
      setIsOpen(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Premium Feature',
        description:
          'This feature is only for Premium Tutors. Upgrade now to unlock your AI Assistant!',
      });
    }
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
        <div className="flex-grow overflow-y-auto pr-4 -mr-4">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-4 py-4 pr-4">
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
              {isLoading && (
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
        </div>
        <div className="mt-auto">
            {!currentUser.isPremium && (
                 <div className="text-center p-4 border-t">
                    <Sparkles className="mx-auto h-6 w-6 text-yellow-500 mb-2" />
                    <p className="font-semibold">This is a Premium Feature</p>
                    <p className="text-sm text-muted-foreground">Upgrade now to unlock your AI Assistant!</p>
                    <Button className="mt-4" size="sm">Upgrade Now</Button>
                </div>
            )}
           {currentUser.isPremium && (
             <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t pt-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
