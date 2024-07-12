<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-sitemap"></v-icon> &nbsp;
      Sites

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    @update:options="loadItems"
    mobile-breakpoint="600"
    dense
  >
      <template v-slot:[`item.images`]="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`${item.images[0]}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>
      
      <template v-slot:[`item.clientId`]="{ item }">
        {{ item.client.givenName }}
      </template>

      <template v-slot:[`item.details`]="{ item }">
          <v-btn icon @click="openDetails(item)" v-tooltip="'See details'">
            <v-icon>mdi-subdirectory-arrow-right</v-icon>
          </v-btn>
        </template>

    </v-data-table-server>
  </v-card>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, watch, onMounted, toRaw } from "vue";
import { SitesService } from "../services/sites.service";
import RouteNameEnum from '../common/route'

const sitesService = new SitesService();
const itemsPerPage = ref(10);
const serverItems = ref([]);
const totalItems = ref(0);
const loading = ref(false);
const search = ref("");

const headers = ref([
  { title: "#", value: "images" },
  { title: "Title", align: "start", value: "title", sortable: true },
  { title: "Client ID", value: "clientId", sortable: true },
  { title: "Details", value: "details", sortable: false }
]);

const loadItems = async (options: any) => {
  const rawSortBy = toRaw(options.sortBy);
  loading.value = true;
  try {
    const data = await sitesService.getAll({
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      search: search.value,
      sortBy: rawSortBy
    });
    serverItems.value = data;

    // Only fetch total on initial load or if necessary
    if (totalItems.value === 0) {
      totalItems.value = await sitesService.fetchTotalCount();
    }
  } catch (error) {
    console.error("Failed to fetch items:", error);
  } finally {
    loading.value = false;
  }
};

const openDetails = (item: any) => {
  router.push({ name: RouteNameEnum.SiteDetails, params: { id: item.id } });
}

// Initial fetch for total count
onMounted(async () => {
  await loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [], sortDesc: [], search: '' });
});

</script>
