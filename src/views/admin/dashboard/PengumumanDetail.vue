<script setup>
/* eslint-disable */
import Api from "@/axios/axios";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
// import { useStoreAdmin } from "@/stores/admin";
import { ref } from "vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
moment.updateLocale("id", localization);
// const storeAdmin = useStoreAdmin();
// storeAdmin.setPagesActive("dashboard");
const dataAsli = ref([]);
const data = ref([]);
const getData = async () => {
    try {
        const response = await Api.get(`guest/pengumuman/${id}`);
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

const doKembali = (id) => {
    router.push({
        name: "admin-dashboard",
        params: { id: id },
    });
}
// alert(truncate(value,3000));
</script>
<template>
    <div class="p-10">
        <BreadCrumb />
        <div>
            <button class="btn btn-md btn-dark" @click="doKembali()">Kembali</button>
        </div>
        <div v-if="data" class="py-10 px-10">
            <article class="prose w-full lg:w-full">
                <h4>{{ data.title }}</h4>
            </article>
            <div>
                <div class="divider"></div>
                <article class="prose">
                    <div v-html="data.content"></div>

                    <div class="flex justify-end w-full space-x-2">
                        <p>{{ moment(data.createdAt).format("DD MMMM YYYY HH:mm:ss") }}</p>

                    </div>
                    <!-- ... -->
                </article>
            </div>
            <div class="divider"></div>
        </div>
    </div>

</template>