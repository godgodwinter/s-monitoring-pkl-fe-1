import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { async } from "postcss-js";
// import { useStoreDataProfile } from "@/stores/data/dataProfile";
import { computed } from "vue";
// const storeDataProfile = useStoreDataProfile();

// const dataAsli = computed(() => storeDataProfile.getData);

const getData = async () => {
    try {
        const response = await Api.get(`siswa/pkl/absen`);
        let res = response.data;
        // storeDataProfile.setData(res);
        console.log(res);

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

// const doUpdate = async (data): Promise<boolean> => {
//     let dataForm = {
//         // id: 1,
//         name: data.name,
//         position: data.position,
//         about_me: data.about_me,
//         education: data.education,
//         hobbi: data.hobbi,
//         phone: data.phone,
//         email: data.email,
//         ig: data.ig,
//         fb: data.fb,
//         linkin: data.linkin,
//         since: data.since,

//     }
//     try {

//         const response = await Api.put(`profile/1`, dataForm);
//         // console.log(dataForm, data.name);
//         // console.log(response);

//         // storeDataProfile.setData(dataForm);
//         return true;
//     } catch (error) {
//         console.error(error);
//     }
// }

const ApiAbsensi = {
    getData,
    doAbsenStore,
    doBatalkan
    // doUpdate
};
export default ApiAbsensi;