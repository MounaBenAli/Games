import axiosInstance from "./axiosInstance";

export const createNewGame = async () => {
  try {
    const response = await axiosInstance.post("games/");
    return response.data;
  } catch (error) {
    console.error("Error creating new game:", error);
    throw error;
  }
};

export const makeMove = async (gameId: number, move: number) => {
  try {
    console.log(`Sending move ${move} for game ID ${gameId}`);
    const response = await axiosInstance.put(`games/${gameId}`, { move });
    return response.data;
  } catch (error) {
    console.error("Error making move:", error);
    throw error;
  }
};
