import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function analyzeWithLLM(
  resumeText: string,
  jdText: string
) {
  const prompt = `
Analyze the resume against the job description.

Return ONLY valid JSON in this format:
{
  "score": 0, // Integer 0-100 representing realistic ATS match score
  "suggestions": {
    "improvements": ["", "", "", "", ""],
    "missingSkills": ["", "", ""],
    "rewrittenPoints": ["", ""]
  }
}

Rules:
- Give a realistic ATS score out of 100 based on keyword match, experience relevance, and formatting.
- Be specific with improvements
- No explanation outside JSON

Resume:
${resumeText.slice(0, 4000)}

Job Description:
${jdText.slice(0, 4000)}
`

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    response_format: { type: "json_object" }
  })

  const content = response.choices[0].message.content || "{}"

  try {
    return JSON.parse(content)
  } catch {
    return {
      score: 0,
      suggestions: {
        improvements: [],
        missingSkills: [],
        rewrittenPoints: [],
      }
    }
  }
}