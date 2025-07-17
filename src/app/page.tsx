"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

export default function Home() {
  const [activeTab, setActiveTab] = useState("students");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 scroll-smooth">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SC</span>
            </div>
            <span className="font-semibold text-xl">StudentConnect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#students" className="text-muted-foreground hover:text-foreground transition-colors">
              For Students
            </a>
            <a href="#companies" className="text-muted-foreground hover:text-foreground transition-colors">
              For Companies
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#waitlist" className="text-muted-foreground hover:text-foreground transition-colors">
              Join Waitlist
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 hover:bg-secondary/80 transition-colors">
            Coming Soon - Join the Waitlist
          </Badge>

          {/* Toggle Tabs at Top */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-sm mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students" className="text-base">
                For Students
              </TabsTrigger>
              <TabsTrigger value="companies" className="text-base">
                For Companies
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            StudentConnect
          </h1>
          
          {/* Dynamic Hero Copy */}
          {activeTab === "students" ? (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Turn Your Assignments Into Career Opportunities
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Work on real business challenges, build your portfolio, and connect with industry professionals while earning academic credit.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Get Fresh Perspectives on Business Challenges
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Partner with universities to have students tackle your real-world problems with innovative solutions and academic rigor.
              </p>
            </div>
          )}

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 text-base"
                disabled={isSubmitted}
              />
              <Button 
                type="submit" 
                size="lg" 
                className="px-8 hover:scale-105 transition-transform"
                disabled={isSubmitted}
              >
                {isSubmitted ? "Thanks! ✓" : "Join Waitlist"}
              </Button>
            </form>
            {isSubmitted && (
              <p className="text-sm text-muted-foreground mt-2 text-center animate-in fade-in duration-300">
                Thanks for joining! We'll keep you updated on our launch.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Students Value Proposition Section */}
      <section id="students" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollFadeIn className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                For Students
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform Your Education Into Real-World Impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bridge the gap between classroom learning and industry experience through meaningful projects that matter.
              </p>
            </ScrollFadeIn>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ScrollFadeIn delay={100}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <span className="text-2xl">💼</span>
                    </div>
                    <CardTitle className="text-xl">Build Your Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Work on real business challenges and create a portfolio that showcases your problem-solving skills to future employers.
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
              
              <ScrollFadeIn delay={200}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <CardTitle className="text-xl">Earn Academic Credit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Complete assignments that count toward your degree while gaining practical experience that complements your coursework.
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
              
              <ScrollFadeIn delay={300}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <CardTitle className="text-xl">Network With Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Connect with professionals and mentors who can guide your career path and provide valuable industry insights.
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
            </div>

            <ScrollFadeIn delay={400} className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">Ready to get started?</span>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Join the waitlist
                </Button>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Companies Value Proposition Section */}
      <section id="companies" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollFadeIn className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                For Companies
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Access Fresh Talent & Innovative Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Partner with universities to solve real business challenges while identifying and nurturing future talent.
              </p>
            </ScrollFadeIn>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ScrollFadeIn delay={100}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-2xl">💡</span>
                    </div>
                    <CardTitle className="text-xl">Innovation & Fresh Perspectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Get creative solutions from students who bring new ideas, unburdened by "how things have always been done."
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
              
              <ScrollFadeIn delay={200}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <CardTitle className="text-xl">Cost-Effective Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Access high-quality research and problem-solving at a fraction of consulting costs while supporting education.
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
              
              <ScrollFadeIn delay={300}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                      <span className="text-2xl">🌟</span>
                    </div>
                    <CardTitle className="text-xl">Talent Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Identify and cultivate relationships with top talent before they graduate, creating a pipeline for future hires.
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
            </div>

            <ScrollFadeIn delay={400} className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">Ready to partner with us?</span>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Get in touch
                </Button>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollFadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose StudentConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A platform designed to create meaningful connections between academic learning and real-world business needs.
            </p>
          </ScrollFadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollFadeIn delay={100}>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <CardTitle>Academic Excellence</CardTitle>
                  <CardDescription>
                    Projects aligned with curriculum standards and learning objectives
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollFadeIn>
            
            <ScrollFadeIn delay={200}>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">💼</span>
                  </div>
                  <CardTitle>Industry Relevance</CardTitle>
                  <CardDescription>
                    Real business problems that matter to companies and their growth
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollFadeIn>
            
            <ScrollFadeIn delay={300}>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <CardTitle>Meaningful Connections</CardTitle>
                  <CardDescription>
                    Build relationships between students and industry professionals
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Section */}
      <section id="waitlist" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollFadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join the Waitlist
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Be the first to know when StudentConnect launches. Get early access and exclusive updates.
              </p>
            </ScrollFadeIn>
            
            {/* Email Signup Form */}
            <ScrollFadeIn delay={200} className="max-w-md mx-auto">
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 text-base bg-background"
                  disabled={isSubmitted}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8 hover:scale-105 transition-transform"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? "Thanks! ✓" : "Join Waitlist"}
                </Button>
              </form>
              {isSubmitted && (
                <p className="text-sm text-muted-foreground mt-3 text-center animate-in fade-in duration-300">
                  🎉 Thanks for joining! We'll keep you updated on our launch progress.
                </p>
              )}
            </ScrollFadeIn>
            
            <ScrollFadeIn delay={400} className="mt-8 text-sm text-muted-foreground">
              <p>No spam, unsubscribe anytime. We respect your privacy.</p>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SC</span>
              </div>
              <span className="font-semibold text-xl">StudentConnect</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            © 2024 StudentConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
