import axiosInstance from "./axiosInstance";
export const aIvsAi = async (players) =>{
    const response = await axiosInstance.post('games/',players)
    return response
  }
  export const playerMoves = async (id ,playerMove) => {
    const resp = await axiosInstance.put(`games/${id}`, { move: playerMove })
      return resp
  }
  export const getGames = async (id)=>{
  const resp = await axiosInstance.get(`/matches/${id}/games/`) 
  return resp
  }
  export const getGame = async (idGame)=>{
    const resp = await axiosInstance.get(`/games/${idGame}`) 
    return resp
    }
    export const getplayers = async () => {
   const resp = await   axiosInstance.get("/players");
   return resp
    };
export const getTournaments = async () => {
  const resp = await axiosInstance.get("/tournaments/");
  return resp
}
export const getTournamentsById = async (id) => {
  const resp = await axiosInstance.get(`/tournaments/${id}`);
  return resp
}

  