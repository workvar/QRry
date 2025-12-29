
import { GoogleGenAI, Type } from "@google/genai";
import { BrandingSuggestion } from "../types";

export const getBrandingInsights = async (url: string): Promise<BrandingSuggestion> => {
    // Note: In Next.js, process.env.API_KEY is server-side only unless prefixed with NEXT_PUBLIC_
    // If this is used on the client, it should be NEXT_PUBLIC_API_KEY, but be warned about exposing keys.
    // Ideally, this should be a Server Action.
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY });

    const prompt = `Analyze the following URL and suggest a professional QR code branding style. 
  URL: ${url}
  
  Suggest a color palette (hex), a dot style (dots, rounded, classy, classy-rounded, square, extra-rounded), 
  and a corner square style (dot, square, extra-rounded). 
  Provide a brief reasoning for the choice.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    primaryColor: { type: Type.STRING, description: 'Primary hex color for QR dots' },
                    secondaryColor: { type: Type.STRING, description: 'Secondary hex color for corner squares' },
                    dotStyle: { type: Type.STRING, description: 'One of the specified dot types' },
                    cornerStyle: { type: Type.STRING, description: 'One of the specified corner styles' },
                    reasoning: { type: Type.STRING, description: 'A short explanation for the branding choice' }
                },
                required: ['primaryColor', 'secondaryColor', 'dotStyle', 'cornerStyle', 'reasoning']
            }
        }
    });

    return JSON.parse(response.text || '{}');
};
