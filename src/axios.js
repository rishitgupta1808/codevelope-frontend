import Axios from "axios";
import basUrl from "./baseUrl";

const axios = Axios.create({
   baseURL: basUrl
});

export default axios;
