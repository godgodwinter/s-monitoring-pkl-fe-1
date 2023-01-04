<script setup>
const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:8000/";
import Api from "@/axios/axios";
import { ref, computed } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import { useStore } from "vuex";
const store = useStore();
const getDataAuth = computed(() => store.state.dataAuth);
// import { useStoreAdmin } from "@/stores/admin";
// const storeAdmin = useStoreAdmin();
// storeAdmin.setPagesActive("penilai-siswa");
const router = useRouter();
const route = useRoute();



const id = ref(getDataAuth.value?.id);
const dataSiswa = ref([]);
const dataAsli = ref([]);
const tempatpkl = ref([]);
const anggota = ref([]);
const pembimbinglapangan = ref([]);
const pembimbingsekolah = ref([]);
const status = ref([]);
const dataPembayaran = ref([]);
const pembayaran_persen = ref(0);
const minimum = ref(0);


const getMyProfile = async () => {
    try {
        const response = await Api.get(`siswa/profile/get`);
        // console.log(response.data);
        id.value = response.data.id;
        pembayaran_persen.value = response.pembayaran_persen;
        minimum.value = response.minimum;
        getDataId();
        getDataPembayaran();
        getDataHasil();
        link.value = `${BASE_URL}api/admin/pkl/nilaiakhir/siswa/${id.value}/cetak`;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};
getMyProfile();

const getDataId = async () => {
    try {
        const response = await Api.get(`guru/datasiswa/profile/${id.value}`);
        // console.log(response.data);
        dataSiswa.value = response.data.siswa;
        tempatpkl.value = response.data.tempatpkl;
        anggota.value = response.data.anggota;
        status.value = response.data.status;
        dataAsli.value = response.data;
        // console.log(dataSiswa.value, tempatpkl.value, anggota.value, status.value);
        // dataDetail.value.siswa.label = ` ${dataAsli.value.nama} `;
        // dataSiswa.value.kelas = ` ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix} `;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};


const getDataPembayaran = async () => {
    try {
        const response = await Api.get(`admin/siswa/${id.value}`);
        // console.log(response.data);
        dataPembayaran.value = response.data;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};

const dataHasil = ref([]);
const getDataHasil = async () => {
    try {
        const response = await Api.get(`admin/pkl/nilaiakhir/siswa/${id.value}`);
        dataHasil.value = response.data;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};
const link = ref(`${BASE_URL}api/admin/pkl/nilaiakhir/siswa/${id.value}/cetak`);
const doCetak = (id = id) => {
    if (id === null) {
        Toast.danger("Warning", "Data tidak valid!");
    } else {
        window.open(
            link.value
        );
    }
};

</script>
<template>
    <div v-if="pembayaran_persen >= minimum">
        <div class="p-4 bg-white">
            <BreadCrumb />

            <article class="prose w-full lg:w-2/3">
                <span class="">
                    <h4>Rekap Penilaian Siswa </h4>
                    <!-- <button @click="doCetak(id)" class="btn btn-primary btn-sm"><svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
        </button> -->
                </span>
                <span v-if="dataSiswa">
                    <p>Nama : {{ dataSiswa.nama }}</p>
                    <p>Kelas : {{ dataSiswa.kelas_nama }}</p>
                    <p>Nomer Induk : {{ dataSiswa.nomeridentitas }}</p>
                    <p>Tempat PKL : {{ tempatpkl.nama }}</p>
                    <p>Status PKL : {{ status }}</p>
                    <p>Pembayaran: {{ dataPembayaran.pembayaran_persen }} % </p>
                    <button class="btn btn-info" @click="doCetak(id)">Cetak</button>
                </span>
            </article>

            <div class="p-4" v-if="dataHasil">
                <article class="prose w-full lg:w-2/3">
                    <h4>1. Penilaian Guru : {{ dataHasil.penilaian_guru_rekap }}</h4>
                </article>

                <div class="overflow-x-auto">
                    <table class="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in dataHasil.penilaian_guru" :key="item.id">
                                <th>{{ index + 1 }}</th>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.nilai }}</td>
                            </tr>

                            <tr>
                                <th></th>
                                <td>Rata-rata</td>
                                <td>{{ dataHasil.penilaian_guru_avg }}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Persentase</td>
                                <td>{{ dataHasil.penilaian_guru_setting_persentase }} %</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Nilai Akhir</td>
                                <td>{{ dataHasil.penilaian_guru_rekap }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="p-4">
                <article class="prose w-full lg:w-2/3">
                    <h4>2. Penilaian Pembimbing : {{ dataHasil.penilaian_pembimbinglapangan_rekap }}</h4>
                </article>


                <div class="overflow-x-auto">
                    <table class="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in dataHasil.penilaian_pembimbinglapangan" :key="item.id">
                                <th>{{ index + 1 }}</th>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.nilai }}</td>
                            </tr>

                            <tr>
                                <th></th>
                                <td>Rata-rata</td>
                                <td>{{ dataHasil.penilaian_pembimbinglapangan_avg }}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Persentase</td>
                                <td>{{ dataHasil.penilaian_pembimbinglapangan_setting_persentase }} %</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Nilai Akhir</td>
                                <td>{{ dataHasil.penilaian_pembimbinglapangan_rekap }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="p-4">
                <article class="prose w-full lg:w-2/3">
                    <h4>3. Nilai Absensi : {{ dataHasil.penilaian_absensi_rekap }}</h4>
                </article>

                <div class="overflow-x-auto">
                    <table class="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th></th>
                                <td>Nilai absensi</td>
                                <td>{{ dataHasil.penilaian_absensi }} </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Persentase</td>
                                <td>{{ dataHasil.penilaian_absensi_setting_persentase }} %</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Nilai Akhir</td>
                                <td>{{ dataHasil.penilaian_absensi_rekap }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
            <div class="p-4">
                <article class="prose w-full lg:w-2/3">
                    <h4>4. Nilai Jurnal : {{ dataHasil.penilaian_jurnal_rekap }}</h4>
                </article>

                <div class="overflow-x-auto">
                    <table class="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th></th>
                                <td>Nilai Jurnal</td>
                                <td>{{ dataHasil.penilaian_jurnal }} </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Persentase</td>
                                <td>{{ dataHasil.penilaian_jurnal_setting_persentase }} %</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Nilai Akhir</td>
                                <td>{{ dataHasil.penilaian_jurnal_rekap }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Nama Aspek</th>
                                <th>Nilai</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
            <div class="p-4">
                <article class="prose w-full lg:w-2/3">
                    <h4>Nilai Akhir : {{ dataHasil.nilaiakhir }}</h4>
                </article>

                <div class="overflow-x-auto">
                    <table class="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Kategori</th>
                                <th>Persentase</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Penilaian Guru</td>
                                <td>{{ dataHasil.penilaian_guru_setting_persentase }}</td>
                                <td>{{ dataHasil.penilaian_guru_rekap }}</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Penilaian PembimbingLapangan</td>
                                <td>{{ dataHasil.penilaian_pembimbinglapangan_setting_persentase }}</td>
                                <td>{{ dataHasil.penilaian_pembimbinglapangan_rekap }}</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Penilaian Absensi</td>
                                <td>{{ dataHasil.penilaian_absensi_setting_persentase }}</td>
                                <td>{{ dataHasil.penilaian_absensi_rekap }}</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>Penilaian Jurnal</td>
                                <td>{{ dataHasil.penilaian_jurnal_setting_persentase }}</td>
                                <td>{{ dataHasil.penilaian_jurnal_rekap }}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>Nilai Akhir</td>
                                <td>{{ dataHasil.penilaian_nilaiakhir_setting_persentase }}</td>
                                <td>{{ dataHasil.nilaiakhir }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Nama Kategori</th>
                                <th>Persentase</th>
                                <th>Nilai</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="p-10 ">
            <div class="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pemberitahuan ! Anda Belum memenuhi minimum pembayaran tagihan .</span>
                </div>
            </div>
            <span class="px-10 ">
                <p>Pembayaran Tagihan anda : {{ pembayaran_persen }} %</p>
                <p>Minimum : {{ minimum }} %</p>
            </span>
        </div>
    </div>
</template>