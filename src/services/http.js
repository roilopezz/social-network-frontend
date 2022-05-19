import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

// check is the server is running or another error //
axios.interceptors.response.use(null, (error) => {
  console.dir(error);
  const { response } = error;

  if (!response) {
    toast.error("Bad connection to server please Refresh the Page");
  }

  if (response && response.status >= 403) {
    // toast.error("An unexpected error occurred");
    // window.location.reload();
    window.location = "/";
  }
  // if the server fail return reject if i not return reject to front the front cant Know if we have problem withe the server(Back-end) //
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
