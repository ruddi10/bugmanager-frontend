import axios from "axios";
function createAxiosIntercepter() {
  const interceptor = axios.interceptors.response.use(null, (error) => {
    if (!error.response || error.response.status == 500) {
      console.log(error.response);
      // axios.interceptors.response.eject(interceptor);
      // console.log("yoooo");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location = "/servererror";
      return Promise.reject(error);
    }
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    axios.interceptors.response.eject(interceptor);
    console.log("interceptor working");
    return axios
      .post("http://127.0.0.1:8000/api/refresh/", {
        refresh: localStorage.getItem("refresh"),
      })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        error.response.config.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access");
        return axios(error.response.config);
      })
      .catch((ex) => {
        if (ex.response.status == 401) {
          localStorage.removeItem("refresh");
          localStorage.removeItem("access");
          console.log("hi");
          window.location = "/";
        }
        return Promise.reject(ex);
      })
      .finally(createAxiosIntercepter);
  });
}
createAxiosIntercepter();

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
