import axios from "axios";
let axiosInstance = null;
export function useAxiosInstance() {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            baseURL: 'http://ip-api.com'
        });
    }
    return axiosInstance;
}
//# sourceMappingURL=axios.js.map