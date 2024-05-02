export type IpData = {
    ip: string
    country?: string
    city?: string
    status: IpDataStatus
}

export enum IpDataStatus {
    Loaded = 'loaded',
    Pending = 'pending',
    Error = 'error',
}

export const IPS_QUERY_PARAM = 'ips'
