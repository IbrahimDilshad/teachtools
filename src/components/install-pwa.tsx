"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Download, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const InstallPWA = () => {
  const [prompt, setPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
      
      // Check if the app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
      }
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setPrompt(null);
        setIsVisible(false);
      });
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Optional: could save to localStorage to not show again
  }

  if (!isVisible || !isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-12 duration-500">
      <div className="bg-background border rounded-lg shadow-lg p-4 w-full max-w-md mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src="/icons/icon-72x72.png" alt="TeachTools Logo" className="w-12 h-12" />
          <div>
            <h4 className="font-semibold">Install TeachTools</h4>
            <p className="text-sm text-muted-foreground">Add to home screen for a better experience.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={handleInstallClick} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Install
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-9 w-9">
                <X className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
