import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserPreferences, GeneratedPlan } from "../types";

// Helper to get the API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API Key is missing. Please ensure process.env.API_KEY is set.");
    return "";
  }
  return key;
};

// Define the schema for the output
const contentPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    weekGoal: {
      type: Type.STRING,
      description: "The primary marketing goal for this week's content plan.",
    },
    schedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Day of the week (e.g., Monday)" },
          theme: { type: Type.STRING, description: "Short theme title for the day" },
          postType: { type: Type.STRING, description: "Format: Reel, Photo, Carousel, Story" },
          contentIdea: { type: Type.STRING, description: "Detailed description of what to create" },
          captionEnglish: { type: Type.STRING, description: "Engaging caption in English with emojis" },
          captionArabic: { type: Type.STRING, description: "Engaging caption in Arabic (Modern Standard or generic dialet) with emojis" },
          hashtags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of 5-10 relevant hashtags"
          },
          bestTime: { type: Type.STRING, description: "Suggested posting time" },
        },
        required: ["day", "theme", "postType", "contentIdea", "captionEnglish", "captionArabic", "hashtags", "bestTime"]
      }
    }
  },
  required: ["weekGoal", "schedule"]
};

export const generateContentPlan = async (prefs: UserPreferences): Promise<GeneratedPlan> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Create a 7-day social media content plan for a small business.
    
    Business Details:
    - Name: ${prefs.businessName}
    - Type: ${prefs.businessType}
    - Niche/Specialty: ${prefs.niche}
    - Location: ${prefs.location}
    - Target Audience: ${prefs.targetAudience}
    
    Requirements:
    - Platforms: Instagram, TikTok, Facebook (create content suitable for all three).
    - Captions: Provide BOTH English and Arabic captions. The Arabic should be natural and engaging, not robotic.
    - Hashtags: specific to the niche and location.
    - The content should be varied (educational, entertaining, promotional).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contentPlanSchema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as GeneratedPlan;
      return data;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
