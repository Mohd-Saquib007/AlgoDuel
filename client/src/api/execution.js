import api from "./axios";

export const runCode = async (data) => {
  const response = await api.post("/execution/run", data);
  return response.data;
};
