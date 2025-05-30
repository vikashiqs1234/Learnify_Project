const API_KEY = 'AIzaSyARpXIwCV-r40oWbxYRfQxyxNzdhkH1exQ' // Safer in environment variables
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const googleGeminiService = {
  generateContent: async (prompt) => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }

      const data = await response.json();

      // return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return data;
    } catch (error) {
      console.error('Error generating content:', error.message);
      throw error;
    }
  }
};

export default googleGeminiService;
