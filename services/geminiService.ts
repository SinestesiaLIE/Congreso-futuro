import { GoogleGenAI, Type } from "@google/genai";
import { CONGRESS_DATA_CONTEXT } from "../constants";
import type { QueryResult } from '../types';

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    congresses: {
      type: Type.ARRAY,
      description: "Lista de los congresos donde se trató el tema consultado.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nombre completo del congreso." },
          year: { type: Type.INTEGER, description: "Año de realización del congreso." },
          theme: { type: Type.STRING, description: "Temática principal del congreso." },
        },
        required: ["name", "year", "theme"],
      },
    },
    timeline_events: {
        type: Type.ARRAY,
        description: "Una lista cronológica de eventos clave (charlas) relacionados con la consulta. Ordenar por año, del más antiguo al más reciente.",
        items: {
            type: Type.OBJECT,
            properties: {
                year: { type: Type.INTEGER, description: "Año de la charla." },
                speaker: { type: Type.STRING, description: "Nombre del expositor." },
                talk_title: { type: Type.STRING, description: "Título de la charla." },
                congress_name: { type: Type.STRING, description: "Nombre del congreso." },
            },
            required: ["year", "speaker", "talk_title", "congress_name"],
        }
    },
    main_concepts: {
        type: Type.ARRAY,
        description: "Una lista de los 5 a 10 conceptos o palabras clave más importantes relacionados con la consulta del usuario. Deben ser concisos.",
        items: {
            type: Type.STRING,
            description: "Un único concepto o palabra clave."
        }
    },
    key_quotes: {
      type: Type.ARRAY,
      description: "Lista de ideas clave, qué se dijo y quién lo dijo sobre el tema.",
      items: {
        type: Type.OBJECT,
        properties: {
          quote: { type: Type.STRING, description: "Una cita o idea central de la charla, resumida." },
          speaker: { type: Type.STRING, description: "Nombre del expositor." },
          talk_title: { type: Type.STRING, description: "Título de la charla." },
          congress_name: { type: Type.STRING, description: "Nombre del congreso donde se dio la charla." },
        },
        required: ["quote", "speaker", "talk_title", "congress_name"],
      },
    },
    summary: {
      type: Type.STRING,
      description: "Una conclusión o resumen general que unifique todas las ideas presentadas sobre el tema en los diferentes congresos.",
    },
  },
  required: ["congresses", "timeline_events", "main_concepts", "key_quotes", "summary"],
};

export const queryCongressData = async (userQuery: string): Promise<QueryResult> => {
  const model = "gemini-2.5-pro";
  
  const prompt = `
    Analiza la siguiente BASE DE DATOS DE CONGRESOS FUTUROS y responde la pregunta del usuario.
    Tu respuesta DEBE ser un objeto JSON que se ajuste estrictamente al schema proporcionado.
    No incluyas \`\`\`json ni \`\`\` en tu respuesta.

    --- DATABASE START ---
    ${CONGRESS_DATA_CONTEXT}
    --- DATABASE END ---

    PREGUNTA DEL USUARIO: "${userQuery}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);

    // Basic validation to ensure the structure matches our type
    if (
      !parsedResult.congresses ||
      !parsedResult.timeline_events ||
      !parsedResult.main_concepts ||
      !parsedResult.key_quotes ||
      !parsedResult.summary
    ) {
      throw new Error("El formato de la respuesta de la IA es inválido.");
    }
    
    return parsedResult as QueryResult;
  } catch (error) {
    console.error("Error al consultar la API de Gemini:", error);
    let errorMessage = "Ocurrió un error al procesar tu solicitud.";
    if (error instanceof Error) {
        errorMessage = `Error: ${error.message}. Por favor, intenta de nuevo.`;
    }
    throw new Error(errorMessage);
  }
};
