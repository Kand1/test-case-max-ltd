import {useIpStore} from "@/store/ip";
import {IpService, useIpAdapter} from "@/api/get-ip-adapter";
import {IpDataStatus} from "@/core/entities/ip";

export interface GetIpsDataService {
    getIpsData(ips: string[]): Promise<void>
}

class GetIpsDataUseCase implements GetIpsDataService {
    private storage
    private adapter: IpService
    constructor() {
        this.storage = useIpStore()
        this.adapter = useIpAdapter()
    }

    public async getIpsData(ips: string[]): Promise<void> {
        this.storage.setIpsData(ips.map((ip) => ({ ip, status: IpDataStatus.Pending})))

        ips.forEach((ip) => {
            this.getIpData(ip)
        })
    }

    private async getIpData(ip: string): Promise<void> {
        const data = await this.adapter.getIpData(ip)

        this.storage.setIpData(data)
    }
}

let getIpsDataUseCase: GetIpsDataService | null = null

export function useGetIpsDataUseCase(): GetIpsDataService {
    if (!getIpsDataUseCase) {
        getIpsDataUseCase = new GetIpsDataUseCase()
    }

    return getIpsDataUseCase
}