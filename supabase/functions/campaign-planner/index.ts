import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PlannerRequest {
  members: {
    id: string;
    name: string;
    platform: string;
    followers: string;
    engagementRate: string;
  }[];
  campaignGoal?: string;
  budget?: number;
  duration?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { members, campaignGoal, budget, duration } = await req.json() as PlannerRequest;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const memberSummary = members.map(m => 
      `- ${m.name}: ${m.platform}, ${m.followers} followers, ${m.engagementRate} engagement`
    ).join("\n");

    const systemPrompt = `You are an expert campaign planning assistant for influencer marketing. 
You help brands create effective campaign plans by analyzing their creator/member roster and providing strategic recommendations.

Your recommendations should include:
1. Optimal member mix (which creators to include and why)
2. Budget allocation strategy
3. Timeline recommendations
4. Content angle suggestions
5. Expected outcomes

Be specific, actionable, and data-driven in your recommendations.`;

    const userPrompt = `Based on the following members in our roster:
${memberSummary}

${campaignGoal ? `Campaign Goal: ${campaignGoal}` : ""}
${budget ? `Available Budget: $${budget}` : ""}
${duration ? `Preferred Duration: ${duration}` : ""}

Please provide a comprehensive campaign plan recommendation including:
1. Recommended member mix and why each was selected
2. Budget split across different activities (creator fees, content production, amplification)
3. Suggested timeline with key milestones
4. Content angles and themes that would resonate
5. Key performance indicators to track

Format your response as a structured campaign plan.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_campaign_plan",
              description: "Generate a structured campaign plan with all recommendations",
              parameters: {
                type: "object",
                properties: {
                  campaignName: {
                    type: "string",
                    description: "Suggested campaign name"
                  },
                  summary: {
                    type: "string",
                    description: "Brief overview of the campaign strategy"
                  },
                  recommendedMembers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        memberId: { type: "string" },
                        memberName: { type: "string" },
                        role: { type: "string", description: "e.g., Lead Creator, Supporting Creator, Micro-influencer" },
                        rationale: { type: "string" }
                      },
                      required: ["memberName", "role", "rationale"]
                    }
                  },
                  budgetSplit: {
                    type: "object",
                    properties: {
                      creatorFees: { type: "number", description: "Percentage for creator fees" },
                      contentProduction: { type: "number", description: "Percentage for content production" },
                      amplification: { type: "number", description: "Percentage for paid amplification" },
                      contingency: { type: "number", description: "Percentage for contingency" }
                    },
                    required: ["creatorFees", "contentProduction", "amplification", "contingency"]
                  },
                  timeline: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        phase: { type: "string" },
                        duration: { type: "string" },
                        activities: { type: "array", items: { type: "string" } }
                      },
                      required: ["phase", "duration", "activities"]
                    }
                  },
                  contentAngles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        angle: { type: "string" },
                        description: { type: "string" },
                        platforms: { type: "array", items: { type: "string" } }
                      },
                      required: ["angle", "description", "platforms"]
                    }
                  },
                  kpis: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        metric: { type: "string" },
                        target: { type: "string" },
                        rationale: { type: "string" }
                      },
                      required: ["metric", "target"]
                    }
                  },
                  estimatedReach: { type: "string" },
                  estimatedEngagement: { type: "string" }
                },
                required: ["campaignName", "summary", "recommendedMembers", "budgetSplit", "timeline", "contentAngles", "kpis"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_campaign_plan" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data, null, 2));

    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall && toolCall.function?.arguments) {
      const plan = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ success: true, plan }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback to content if no tool call
    const content = data.choices?.[0]?.message?.content;
    return new Response(JSON.stringify({ success: true, rawContent: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Campaign planner error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
