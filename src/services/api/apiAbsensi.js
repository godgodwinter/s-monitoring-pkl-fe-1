import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { computed } from "vue";


const getData = async () => {
    try {
        const response = await Api.get(`siswa/pkl/absen`);
        let res = response.data;
        // storeDataProfile.setData(res);
        // console.log(res);

        return res;
    } catch (error) {
        console.error(error);
    }
};

const doAbsenStore = async (data) => {
    try {
        // console.log(data);
        const response = await Api.post(`siswa/pkl/absen`, data);
        let res = response.data;
        if (response.success) {
            Toast.success("Info", "Absen berhasil");
            // console.log(response, res);
            return true;
        } else {
            Toast.danger("Info", "Anda Sudah Absen!");
            // console.log(response, res);
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}

const doBatalkan = async (data) => {
    try {
        const response = await Api.post(`siswa/pkl/absen/batalkan`);
        let res = response.data;
        Toast.success("Info", "Absen dan Jurnal berhasil Dibatalkan");
        return true;
    } catch (error) {
        console.error(error);
    }
}


const doJurnalStore = async (data) => {
    try {
        // console.log(data);
        const response = await Api.post(`siswa/pkl/jurnal`, data);
        let res = response.data;
        if (response.success) {
            Toast.success("Info", "Upload Jurnal berhasil");
            // console.log(response, res);
            return true;
        } else {
            Toast.danger("Info", "Anda Sudah Upload Jurnal!");
            // console.log(response, res);
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}

const ApiAbsensi = {
    getData,
    doAbsenStore,
    doBatalkan,
    doJurnalStore
    // doUpdate
};
export default ApiAbsensi;