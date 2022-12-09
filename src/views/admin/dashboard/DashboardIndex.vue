<script setup>
/* eslint-disable */
import Api from "@/axios/axios";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
// import { useStoreAdmin } from "@/stores/admin";
import { ref } from "vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { useRouter } from "vue-router";
const router = useRouter();
moment.updateLocale("id", localization);
// const storeAdmin = useStoreAdmin();
// storeAdmin.setPagesActive("dashboard");
const dataAsli = ref([]);
const data = ref([]);
const getData = async () => {
    try {
        const response = await Api.get(`guest/pengumuman`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();

function truncate(value, length) {
    return value.substring(0, 300);
}

const doPengumuman = (id) => {
    router.push({
        name: "admin-pengumuman-detail",
        params: { id: id },
    });
}
// alert(truncate(value,3000));
</script>
<template>
    <div class="p-10">
        <BreadCrumb />
        <article class="prose w-full lg:w-full">
            <h4>Pengumuman :</h4>
        </article>
        <div v-for="item, index in data" :key="item.id">
            <div class="divider"></div>
            <article class="prose">
                <h3>{{ item.title }}</h3>
                <div v-html="truncate(item.content)"></div>

                <div class="flex justify-end w-full space-x-2">
                    <p>{{ moment(item.createdAt).format("DD MMMM YYYY HH:mm:ss") }}</p>
                    <button class="btn btn-md " @click="doPengumuman(item.id)"> Baca
                        Selengkapnya</button>
                </div>
                <!-- ... -->
            </article>
        </div>
        <div class="divider"></div>
    </div>

</template>