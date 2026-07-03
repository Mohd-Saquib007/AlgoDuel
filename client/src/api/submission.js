import api from "./axios";

export const submitSolution = async (token, data) => {

    const response = await api.post(
        "/submissions",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};