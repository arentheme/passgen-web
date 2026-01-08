"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";

// Generate static star positions on component mount
const generateStars = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
  }));
};

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; delay: number; duration: number }>>([]);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      setPassword("Please select at least one option");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password && password !== "Please select at least one option") {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate stars and initial password on mount
  useEffect(() => {
    setStars(generateStars());
    // Generate initial password
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let generatedPassword = "";
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Subtle cosmic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-900/0 to-slate-900/0"></div>

      {/* Animated stars - generated once on mount */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-lg relative z-10 bg-slate-950/90 backdrop-blur-xl border-purple-500/10 shadow-2xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Password Generator
          </CardTitle>
          <CardDescription className="text-slate-400">
            Create a secure password with custom options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Generated Password Display with Action Buttons */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-purple-500/10 min-h-[60px] flex items-center justify-center text-center break-all">
                <p className="text-lg font-mono text-purple-200">
                  {password || "Click generate to create password"}
                </p>
              </div>
              {copied && (
                <span className="absolute -bottom-6 right-2 text-xs text-green-400">
                  Copied!
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={generatePassword}
                className="h-full px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
              <Button
                onClick={copyToClipboard}
                disabled={!password || password === "Please select at least one option"}
                className="h-full px-4 bg-slate-800 hover:bg-slate-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Password Length Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Password Length</Label>
              <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                {length[0]}
              </span>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              min={4}
              max={64}
              step={1}
              className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-400"
            />
          </div>

          {/* Options - in a grid */}
          <div className="space-y-3">
            <Label className="text-slate-300">Include Characters</Label>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-900/30 transition-colors">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                  className="border-purple-500/50 data-[state=checked]:bg-purple-600"
                />
                <Label
                  htmlFor="uppercase"
                  className="text-sm font-normal cursor-pointer text-slate-300"
                >
                  Uppercase
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-900/30 transition-colors">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                  className="border-purple-500/50 data-[state=checked]:bg-purple-600"
                />
                <Label
                  htmlFor="lowercase"
                  className="text-sm font-normal cursor-pointer text-slate-300"
                >
                  Lowercase
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-900/30 transition-colors">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  className="border-purple-500/50 data-[state=checked]:bg-purple-600"
                />
                <Label
                  htmlFor="numbers"
                  className="text-sm font-normal cursor-pointer text-slate-300"
                >
                  Numbers
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-900/30 transition-colors">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  className="border-purple-500/50 data-[state=checked]:bg-purple-600"
                />
                <Label
                  htmlFor="symbols"
                  className="text-sm font-normal cursor-pointer text-slate-300"
                >
                  Symbols
                </Label>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
