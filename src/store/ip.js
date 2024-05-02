import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
export const useIpStore = defineStore('ip', () => {
    const ipsDataMap = ref(new Map());
    const ipsDataArray = computed(() => Array.from(ipsDataMap.value.values()));
    const hasIpsData = computed(() => Boolean(Array.from(ipsDataMap.value.values()).length));
    function setIpsData(newData) {
        newData.forEach((data) => setIpData(data));
    }
    function setIpData(newData) {
        ipsDataMap.value.set(newData.ip, newData);
    }
    function deleteIpsData(data) {
        data.forEach((ipData) => ipsDataMap.value.delete(ipData.ip));
    }
    return {
        ipsDataMap,
        ipsDataArray,
        hasIpsData,
        setIpsData,
        setIpData,
        deleteIpsData,
    };
});
//# sourceMappingURL=ip.js.map