'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import Link from 'next/link';

const initialCompletionString =
  "What's a hobby you've always wanted to try?||If you could have dinner with any historical figure, who would it be?||What's a simple pleasure that makes your day better?";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split('||');
};

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string>(
    initialCompletionString
  );

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-me', {
        ...data,
        username,
      });

      toast({
        title: 'Success!',
        description: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post('/api/suggest-message');
      const text = typeof response.data === 'string' ? response.data : response.data?.text;
      if (text) {
        setSuggestedMessages(text);
      }
      if (response.data?.warning) {
        toast({
          title: 'AI Key Notice',
          description: response.data.warning,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Failed to fetch AI suggested questions.';
      toast({
        title: 'AI Suggestion Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSuggestLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl shadow-md text-black">
      <h1 className="text-4xl font-bold text-center mb-6">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Write your anonymous message here..."
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 text-black min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-4 flex items-center gap-2"
            disabled={isSuggestLoading}
            variant="outline"
          >
            {isSuggestLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-purple-600" />
            )}
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            {parseStringMessages(suggestedMessages).map((message, index) => (
              <Button
                key={index}
                variant="outline"
                className="mb-2 text-wrap text-left h-auto py-3 px-4 justify-start text-gray-800 hover:bg-gray-100"
                onClick={() => handleMessageClick(message)}
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
      <hr className="my-6 border-gray-200" />
      <div className="text-center">
        <div className="mb-4 font-semibold">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}