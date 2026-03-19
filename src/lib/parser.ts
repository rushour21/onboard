
export async function parsePDF(file: File): Promise<string> {
  // @ts-ignore - The types are for 'pdf-parse', not the inner file.
  const pdfModule = await import("pdf-parse/lib/pdf-parse.js")
  const pdf = pdfModule.default || pdfModule

  const buffer = Buffer.from(await file.arrayBuffer())

  const data = await pdf(buffer, {
    // prevent rendering features that require DOM APIs
    pagerender: async (pageData: any) => {
      const textContent = await pageData.getTextContent()
      return textContent.items.map((item: any) => item.str).join(" ")
    },
  })

  if (!data.text) throw new Error("Failed to parse PDF")

  return data.text
}