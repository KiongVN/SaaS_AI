import { auth } from "@clerk/nextjs";
import OpenAI from 'openai';
import { openai } from '@ai-sdk/openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
import { StreamingTextResponse, streamText } from 'ai';
import { NextResponse } from "next/server";
const configuration = {
  apiKey: process.env.OPENAI_API_KEY!,
};

// const openai = new OpenAI(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!userId) {
      return new NextResponse("Un authorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("Miss OpenAI API Key.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }


    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   stream: true,
    //   messages,
    // });

    // const stream = OpenAIStream(response, {
    //   onCompletion: async () => {
    //     if (!isPro) {
    //       await incrementUserLimit();
    //     }
    //   },
    // });

    // return new StreamingTextResponse(stream);
    const result = await streamText({
        model: openai('gpt-4-turbo'),
        messages,
      });
    
      return result.toAIStreamResponse();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}