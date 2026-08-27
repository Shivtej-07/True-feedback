'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Mail, ShieldCheck, Sparkles, Share2, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is sending feedback truly 100% anonymous?",
      answer: "Yes! Senders are completely anonymous. We do not store IP addresses, device identifiers, or user tracking data for senders."
    },
    {
      question: "How do I share my feedback link?",
      answer: "Once signed up, your dashboard gives you a unique link (e.g. `yourdomain.com/u/username`). Copy and paste it into your social media bio!"
    },
    {
      question: "Can I stop receiving messages whenever I want?",
      answer: "Yes, in your dashboard you can toggle 'Accept Messages' on or off anytime, and permanently delete any unwanted message."
    }
  ];

  return (
    <main className="flex-grow flex flex-col items-center justify-between px-4 md:px-24 py-12 bg-gray-800 text-white gap-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-300">
          True Feedback - Where your identity remains a secret.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-slate-100 text-black hover:bg-slate-200" variant="outline">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-up">
                <Button className="bg-slate-100 text-black hover:bg-slate-200" variant="outline">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                  Learn More
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Carousel for Messages */}
      <section className="w-full max-w-lg md:max-w-xl space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-center">Recent Anonymous Feedback</h2>
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-gray-900 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-gray-400 mt-1" />
                    <div>
                      <p className="text-gray-200">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex text-black bg-slate-100" />
          <CarouselNext className="hidden md:flex text-black bg-slate-100" />
        </Carousel>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl w-full space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-gray-300" />
              <CardTitle className="text-lg">100% Anonymous</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              Identity protection guaranteed. No IP tracking or metadata logged.
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <Sparkles className="w-6 h-6 text-gray-300" />
              <CardTitle className="text-lg">AI Prompt Assistance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              Built-in AI suggestions to help senders craft thoughtful feedback prompts.
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <Share2 className="w-6 h-6 text-gray-300" />
              <CardTitle className="text-lg">Custom Link Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              Share your custom URL on Instagram, Twitter, or Discord bios easily.
            </CardContent>
          </Card>

        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl w-full space-y-8 bg-gray-900 p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-black font-bold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h3 className="font-semibold text-white">Register Account</h3>
            <p className="text-xs text-gray-400">Sign up and claim your unique username.</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-black font-bold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h3 className="font-semibold text-white">Share Your Link</h3>
            <p className="text-xs text-gray-400">Post your profile URL across social media platforms.</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-black font-bold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h3 className="font-semibold text-white">Receive Feedback</h3>
            <p className="text-xs text-gray-400">Read and manage incoming anonymous messages in your dashboard.</p>
          </div>
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

    </main>
  );
}