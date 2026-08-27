'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Sparkles, Share2, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function AboutPage() {
  const { data: session } = useSession();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does True Feedback keep sender identities 100% anonymous?",
      answer: "We do not store sender IP addresses, browser fingerprints, or personal identifiers when a message is submitted."
    },
    {
      question: "How do AI Suggestions work?",
      answer: "Our built-in AI assistant helps senders generate constructive, thoughtful, and creative feedback prompts automatically."
    },
    {
      question: "Can I stop receiving messages whenever I want?",
      answer: "Yes! In your personal Dashboard, you can toggle your 'Accept Messages' switch on or off instantly."
    },
    {
      question: "Is True Feedback free for all users?",
      answer: "Yes, True Feedback is completely free to create an account, generate custom links, and receive feedback."
    }
  ];

  return (
    <main className="flex-grow flex flex-col items-center justify-between px-4 md:px-24 py-12 bg-gray-800 text-white gap-16">
      
      {/* Header Section */}
      <section className="text-center max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          About True Feedback
        </h1>
        <p className="text-base md:text-lg text-gray-300">
          Where honest conversations find freedom and security.
        </p>
      </section>

      {/* Mission Banner */}
      <section className="max-w-4xl w-full bg-gray-900 border border-gray-700 p-8 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold text-white">Our Mission</h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          True Feedback is designed to bridge the gap between people and genuine, unfiltered truth. 
          We provide a safe, secure space for friends, teams, and creators to give and receive constructive feedback without fear of bias or judgment.
        </p>
      </section>

      {/* Pillars Grid */}
      <section className="max-w-5xl w-full space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-gray-300" />
              <CardTitle className="text-lg">Identity Shield</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              No IPs or session data attached to messages. Express honest thoughts with complete privacy.
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <Sparkles className="w-6 h-6 text-gray-300" />
              <CardTitle className="text-lg">AI Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              Integrated AI assists in drafting constructive questions to encourage positive interactions.
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <Share2 className="w-6 h-6 text-gray-300" />
              <CardTitle className="text-lg">Share Anywhere</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              Get your unique URL (`/u/username`) to share on your social media profiles or bio.
            </CardContent>
          </Card>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl w-full space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left flex justify-between items-center font-medium text-white hover:bg-gray-800 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaqIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-300 border-t border-gray-800 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl w-full text-center bg-gray-900 border border-gray-700 p-8 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">Ready to Start Receiving Feedback?</h2>
        <div className="flex justify-center gap-4 pt-2">
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-slate-100 text-black hover:bg-slate-200" variant="outline">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <Button className="bg-slate-100 text-black hover:bg-slate-200" variant="outline">
                Create Account
              </Button>
            </Link>
          )}
        </div>
      </section>

    </main>
  );
}
