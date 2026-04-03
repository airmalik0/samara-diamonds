import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "npm:@google/genai";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const MODEL = "gemini-3.1-flash-image-preview";

// --- Prompt templates ---

const WHITE_PREFIX =
  "You are a professional jewelry photographer. Using the attached reference photo of a piece of jewelry, " +
  "generate a studio product photograph on a pure white background. " +
  "The jewelry must be shown in the exact same metal color (gold, white gold, rose gold, silver, platinum) " +
  "and with the exact same gemstone colors, cut, and arrangement as in the reference. " +
  "Use three-point studio lighting: soft diffused key light from upper-left, gentle fill from the right, " +
  "and rim light from behind to create elegant specular highlights on the metal surfaces and fire in any gemstones. " +
  "Add a subtle soft shadow beneath the piece for depth. " +
  "The image should look like a high-end e-commerce product photo. No text, no watermarks, no other objects.";

const MODEL_PREFIX =
  "You are a luxury jewelry campaign photographer. Using the attached reference photo of a piece of jewelry, " +
  "generate an elegant fashion photograph of a model wearing this exact piece of jewelry. " +
  "The model should be a young Central Asian woman with warm olive skin tone, dark hair, subtle natural makeup. " +
  "Soft warm studio lighting with a blurred neutral dark background (charcoal/deep brown). " +
  "The jewelry must match the exact metal color and gemstone arrangement from the reference photo — do NOT change any details. " +
  "Focus the composition on the jewelry area — crop and angle to emphasize the jewelry, not the model's face. " +
  "The image should look like a page from a luxury jewelry brand lookbook. No text, no watermarks.";

type Slug = "rings" | "earrings" | "pendants" | "sets" | "bracelets" | "necklaces";

const CATEGORY_SUFFIXES: Record<Slug, { white: string; model: string }> = {
  rings: {
    white:
      "Display the ring standing upright at a slight 3/4 angle, showing the setting and stone from above-front. " +
      "The ring should appear to stand on its band naturally, as in a classic jewelry product pose.",
    model:
      "Show the model's hand gracefully posed near her collarbone or resting on her shoulder, " +
      "with the ring clearly visible on her ring finger. Frame from mid-chest up, with the hand and ring as the focal point.",
  },
  earrings: {
    white:
      "Display the pair of earrings hanging naturally side by side, as if suspended from invisible hooks, " +
      "showing their full drop and movement. Show the complete earring including the post/hook. " +
      "If only one earring is visible in the reference, mirror it to show a matching pair.",
    model:
      "Show the model from chin to shoulders, head slightly turned to one side to showcase one earring prominently. " +
      "Hair pulled back or tucked behind the ear. The earring should be the sharpest element in the frame.",
  },
  pendants: {
    white:
      "Display the pendant hanging from its chain, centered vertically, showing the bail and the full pendant face. " +
      "The chain should drape naturally in a V shape above the pendant.",
    model:
      "Show the model from collarbone to chin, with the pendant resting at the center of her chest. " +
      "Neckline should be open to not compete with the pendant. The pendant is the focal point.",
  },
  sets: {
    white:
      "Display the full jewelry set arranged in an elegant flat-lay composition on white background, " +
      "with each piece clearly visible and slightly separated. Position the necklace/largest piece in center, " +
      "smaller pieces arranged symmetrically around it.",
    model:
      "Show the model wearing the complete set — all visible pieces should be shown. " +
      "Frame from above the chest to just below the shoulders. The composition should show how the pieces work together harmoniously.",
  },
  bracelets: {
    white:
      "Display the bracelet in a three-quarter circular pose, slightly open to show the clasp area, " +
      "as if resting on an invisible wrist form. Show the full circumference and any stone settings or details.",
    model:
      "Show the model's wrist and forearm elegantly posed, perhaps resting on her opposite shoulder or touching her neck. " +
      "The bracelet should be the clear focal point, sharp and well-lit against the skin.",
  },
  necklaces: {
    white:
      "Display the necklace draped in a natural U or V shape, fully extended to show the full design, " +
      "with the clasp at the top and the focal pendant or centerpiece at the bottom of the curve.",
    model:
      "Show the model from shoulders to chin, with the necklace draping across her collarbones. " +
      "The neckline should be clean and simple to let the necklace be the centerpiece. Slight head tilt away from camera.",
  },
};

const VALID_SLUGS = new Set<string>(Object.keys(CATEGORY_SUFFIXES));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function generateImage(prompt: string, imageBase64: string, mimeType: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      { text: prompt },
      { inlineData: { mimeType, data: imageBase64 } },
    ],
    config: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio: "3:4",
        imageSize: "1K",
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No response from Gemini");

  for (const part of parts) {
    if (part.inlineData?.data) {
      return part.inlineData.data;
    }
  }

  throw new Error("No image in Gemini response — possibly blocked by safety filters. Try a clearer photo.");
}

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { image, mimeType, slug } = await req.json();

    // Validate
    if (!image || typeof image !== "string") {
      return new Response(JSON.stringify({ error: "Missing image (base64)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!mimeType || !["image/png", "image/jpeg", "image/webp"].includes(mimeType)) {
      return new Response(JSON.stringify({ error: "Invalid mimeType" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!slug || !VALID_SLUGS.has(slug)) {
      return new Response(JSON.stringify({ error: `Invalid slug: ${slug}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const suffixes = CATEGORY_SUFFIXES[slug as Slug];
    const whitePrompt = `${WHITE_PREFIX} ${suffixes.white}`;
    const modelPrompt = `${MODEL_PREFIX} ${suffixes.model}`;

    // Generate both images in parallel
    const [whiteImage, modelImage] = await Promise.all([
      generateImage(whitePrompt, image, mimeType),
      generateImage(modelPrompt, image, mimeType),
    ]);

    return new Response(
      JSON.stringify({ white: whiteImage, model: modelImage }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("generate-images error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
