import {useAxiosInstance} from "@/api/axios";
import {IpData, IpDataStatus} from "@/core/entities/ip";
import {AxiosInstance} from "axios";

export type WithError<T> = T & {
    error?: Error
}

export interface IpService {
    getIpData: (ip: string) => Promise<WithError<IpData>>
}

class IpAdapter implements IpService {
    private axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = useAxiosInstance()
    }

    async getIpData(ip: string): Promise<WithError<IpData>> {
        try {
            const { city, country } = (await this.axiosInstance.get(`/json/${ip}`)).data

            return {
                ip,
                city,
                country,
                status: IpDataStatus.Loaded,
            }
        } catch (e) {
            console.error(e)
            return {
                ip,
                status: IpDataStatus.Error,
                error: e as Error
            }
        }
    }
}

let ipAdapter: IpService | null = null

export function useIpAdapter(): IpService {
    if (!ipAdapter) {
        ipAdapter = new IpAdapter()
    }

    return ipAdapter
}