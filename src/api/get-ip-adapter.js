import { useAxiosInstance } from "@/api/axios";
import { IpDataStatus } from "@/core/entities/ip";
class IpAdapter {
    axiosInstance;
    constructor() {
        this.axiosInstance = useAxiosInstance();
    }
    async getIpData(ip) {
        try {
            const { city, country } = (await this.axiosInstance.get(`/json/${ip}`)).data;
            return {
                ip,
                city,
                country,
                status: IpDataStatus.Loaded,
            };
        }
        catch (e) {
            console.error(e);
            return {
                ip,
                status: IpDataStatus.Error,
                error: e
            };
        }
    }
}
let ipAdapter = null;
export function useIpAdapter() {
    if (!ipAdapter) {
        ipAdapter = new IpAdapter();
    }
    return ipAdapter;
}
//# sourceMappingURL=get-ip-adapter.js.map