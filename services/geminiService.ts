import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not set. Using fallback poem.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const generateConfessionPoem = async (): Promise<string> => {
  if(!apiKey) {
    return getFallbackPoem();
  }

  try {
    const prompt = `Hãy viết một lời tỏ tình thật lãng mạn cho dịp Tết Trung Thu. Bắt đầu bằng một câu hỏi dịu dàng về việc cùng nhau ngắm trăng, sau đó dẫn vào 4 câu thơ ngọt ngào, so sánh tình yêu của anh dành cho em với ánh trăng đêm rằm. Lời tỏ tình phải thể hiện sự chân thành và một mong ước được cùng em đi hết quãng đời còn lại.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (text) {
      return text;
    }
    return getFallbackPoem();
  } catch (error) {
    console.error("Error generating confession poem:", error);
    return getFallbackPoem();
  }
};

const getFallbackPoem = (): string => {
    return `Đêm nay trăng thật tròn, em nhỉ?
Anh có điều này muốn nói...

Trăng kia chỉ sáng đêm rằm,
Tình anh trao em sáng mãi vạn năm.
Nguyện cùng em tay nắm tay,
Đi qua bao tháng, bao ngày về sau.`;
}