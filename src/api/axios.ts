import axios, {AxiosInstance} from "axios";

let axiosInstance: AxiosInstance | null = null;

export function useAxiosInstance(): AxiosInstance {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            baseURL: 'http://ip-api.com'
        })
    }

    return axiosInstance;
}