import { useIpStore } from "@/store/ip";
import { useIpAdapter } from "@/api/get-ip-adapter";
import { IpDataStatus } from "@/core/entities/ip";
class GetIpsDataUseCase {
    storage;
    adapter;
    constructor() {
        this.storage = useIpStore();
        this.adapter = useIpAdapter();
    }
    async getIpsData(ips) {
        this.storage.setIpsData(ips.map((ip) => ({ ip, status: IpDataStatus.Pending })));
        ips.forEach((ip) => {
            this.getIpData(ip);
        });
    }
    async getIpData(ip) {
        const data = await this.adapter.getIpData(ip);
        this.storage.setIpData(data);
    }
}
let getIpsDataUseCase = null;
export function useGetIpsDataUseCase() {
    if (!getIpsDataUseCase) {
        getIpsDataUseCase = new GetIpsDataUseCase();
    }
    return getIpsDataUseCase;
}
//# sourceMappingURL=get-ips-data.js.map