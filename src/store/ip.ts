import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'
import {IpData} from "@/core/entities/ip";

export const useIpStore = defineStore('ip', () => {
    const ipsDataMap: Ref<Map<string, IpData>> = ref(new Map())
    const ipsDataArray = computed(() => Array.from(ipsDataMap.value.values()))
    const hasIpsData = computed(() => Boolean(Array.from(ipsDataMap.value.values()).length))

    function setIpsData(newData: IpData[]) {
        newData.forEach((data) => setIpData(data))
    }

    function setIpData(newData: IpData) {
        ipsDataMap.value.set(newData.ip, newData)
    }

    function deleteIpsData(data: IpData[]) {
        data.forEach((ipData) => ipsDataMap.value.delete(ipData.ip))
    }

    return {
        ipsDataMap,
        ipsDataArray,
        hasIpsData,
        setIpsData,
        setIpData,
        deleteIpsData,
    }
})