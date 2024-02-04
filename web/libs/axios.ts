import Axios from 'axios';

const axios = Axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;
const reidrectPage = '/';

const refreshAccessToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = axios
      .post('/api/token/refresh', {})
      .then((response) => {
        // リフレッシュトークンが正常に取得された場合の処理をここに追加
        isRefreshing = false;
        return response;
      })
      .catch((error) => {
        isRefreshing = false;
        if (error?.response?.status === 401) {
          window.location.href = reidrectPage;
        }
        throw error;
      });
  }
  return refreshPromise;
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401 && error.config.url !== '/api/token/refresh') {
      try {
        await refreshAccessToken();
        // もとのリクエストを再試行
        return await axios.request(error.config);
      } catch (refreshError) {
        // リフレッシュトークンの取得に失敗した場合のエラーハンドリング
        window.location.href = reidrectPage;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
axios.interceptors.request.use((config) => config);

export default axios;