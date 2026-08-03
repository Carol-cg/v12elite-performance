import api from "./api";

const askAssistant = async (question) => {
  const response = await api.post("/ai/ask", {
    question,
  });

  return response.data;
};

const aiService = {
  askAssistant,
};

export default aiService;