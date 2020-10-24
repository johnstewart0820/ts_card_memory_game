import axios from "axios";

const createAxios = () => {
  const config = {
    headers: { Accept: "application/json" },
  };
  const instance = axios.create(config);

  return instance;
};

export const POST = (url, data) =>
  createAxios().post(url, data);
export const GET = (url, params) =>
  createAxios().get(url, { params });

export const updateBestScore = async (score: number) => {
  let apiAddr = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/score`;
  let data = await POST(apiAddr, {score: score});
  return data;
};


export const getBestScore = async () => {
  let apiAddr = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/score`;
  let data = await GET(apiAddr, {});
  return data;
};

