import { GoogleGenAI, Type } from "@google/genai";
import { EmailCampaign } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      segment: {
        type: Type.STRING,
        description: 'The name of the customer segment this email is for.',
      },
      subjectA: {
        type: Type.STRING,
        description: 'The first subject line for A/B testing.',
      },
      subjectB: {
        type: Type.STRING,
        description: 'The second, distinct subject line for A/B testing.',
      },
      body: {
        type: Type.STRING,
        description: 'The full email body in HTML format. At the very top of the body, include an HTML comment placeholder: <!-- HEADER_IMAGE -->. Use appropriate tags like <h2>, <p>, <ul>, <li>, <strong>, and <a>. Highlight relevant products for the segment. Make it engaging and visually appealing with a clean, modern design. Ensure links have a placeholder href like "#".',
      },
      discountCode: {
        type: Type.STRING,
        description: 'A creative, dynamic discount code relevant to the segment or promotion (e.g., NEWYOU25, RUNFAST15).',
      },
      suggestedKPIs: {
        type: Type.STRING,
        description: 'A brief suggestion for 1-2 key performance indicators (KPIs) to track for this specific campaign and segment (e.g., "Primary: Click-through rate on product links. Secondary: Conversion rate.").',
      },
    },
    required: ['segment', 'subjectA', 'subjectB', 'body', 'discountCode', 'suggestedKPIs'],
  },
};

export async function generatePersonalizedEmails(
  customerData: string, 
  productData: string, 
  campaignGoal: string, 
  emailTone: string,
  brandName: string,
  generateImage: boolean
): Promise<EmailCampaign[]> {
  const prompt = `
    You are an expert marketing copywriter and strategist for the brand "${brandName}", a modern, futuristic e-commerce brand specializing in high-tech fitness and wellness products.
    Your task is to generate hyper-personalized email marketing campaigns for different customer segments.

    **Campaign Goal:**
    ${campaignGoal}

    **Desired Tone:**
    ${emailTone}

    **Customer Segment Data (CSV):**
    ${customerData}

    **Product Catalog Data (CSV):**
    ${productData}

    **Instructions:**
    1.  Analyze the provided customer segments, product catalog, campaign goal, and desired tone.
    2.  For EACH customer segment, create a tailored email newsletter that aligns with the campaign goal.
    3.  Adopt the specified tone consistently throughout the email.
    4.  Craft two distinct, compelling subject lines for A/B testing.
    5.  Write an engaging email body in HTML format. At the very top of the body, include an HTML comment placeholder: <!-- HEADER_IMAGE -->. Personalize the content by highlighting products from the catalog that are highly relevant to the customer's segment or past purchase history. The design should be clean and modern.
    6.  Generate a unique and catchy discount code for each segment.
    7.  Provide a suggestion for 1-2 key performance indicators (KPIs) to track for this campaign.
    8.  Return the output as a JSON array that strictly follows the provided schema. Do not include any markdown formatting like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    let parsedData: EmailCampaign[] = JSON.parse(jsonText);

    if (generateImage) {
      const imageGenerationPromises = parsedData.map(async (campaign) => {
        const imagePrompt = `A visually stunning, professional header image for an email marketing campaign from the brand "${brandName}". The style is futuristic, sleek, and high-tech, using abstract concepts related to fitness and wellness. The target audience is "${campaign.segment}". The campaign goal is "${campaignGoal}". Dominant colors should be cyan and indigo, with a clean aesthetic. The image should be abstract and inspiring, avoiding text.`;
        
        try {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: imagePrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '16:9',
                },
            });

            if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
              const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
              return { ...campaign, headerImage: base64ImageBytes };
            }
        } catch (imgError) {
            console.error(`Failed to generate image for segment: ${campaign.segment}`, imgError);
        }
        return campaign;
      });

      parsedData = await Promise.all(imageGenerationPromises);
    }

    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof TypeError && error.message.toLowerCase().includes('fetch')) {
      throw new Error("Could not connect to the AI service. This is often due to network issues or an API key that is not configured for browser access (CORS policy).");
    }
    throw new Error("Failed to generate emails. The AI model may be temporarily unavailable or the input data is invalid.");
  }
}