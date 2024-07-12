<template>
  <div v-if="details">
    <v-row align="center" class="mb-1">
      <v-col cols="auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <div class="text-h4">{{ details.title }}</div>
      </v-col>
    </v-row>

    <v-card class="mx-auto" max-width="auto">
      <v-carousel>
        <v-carousel-item
          v-for="(image, index) in details.images"
          :key="index"
          :src="image"
          cover
        ></v-carousel-item>
      </v-carousel>

      <v-tabs v-model="tab" align-tabs="center" bg-color="primary" stacked>
        <v-tab value="tab-1">
          <v-icon icon="mdi-account-box"></v-icon>

          Address
        </v-tab>

        <v-tab value="tab-2">
          <v-icon icon="mdi-phone"></v-icon>

          Main contact
        </v-tab>

        <v-tab value="tab-3">
          <v-icon icon="mdi-account-outline"></v-icon>

          Client
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="tab-1" class="mt-2">
          <site-address :address-items="addressItems" />
        </v-tabs-window-item>
        <v-tabs-window-item value="tab-2" class="mt-2">
          <main-contact :contact-items="contactItems" />
        </v-tabs-window-item>
        <v-tabs-window-item value="tab-3" class="mt-2">
          <client-profile :client-item="details.client" />
        </v-tabs-window-item>
      </v-tabs-window>

      <v-divider></v-divider>

      <div class="ma-5">
        <span class="tags-label">Site Tags:</span>
        <v-chip
          v-for="tag in details.tags"
          :key="tag"
          color="primary"
          variant="flat"
          class="ma-1"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-card>
    <p>Created at: {{ details.createdAt }}</p>
  </div>
  <div v-else>Loading details...</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { SitesService } from "@/services/sites.service";
import router from "@/router";
const sitesService = new SitesService();
const route = useRoute();

const tab = ref(null);
const details: any = ref(null);
const contactItems: any = ref([]);
const addressItems: any = ref([]);

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    try {
      const response = await sitesService.getById(id);
      details.value = response;
      if (details.value && details.value.contacts) {
        const contact = details.value.contacts.main;
        setupContactItems(contact);
      }
      if (details.value && details.value.address) {
        const address = details.value.address;
        setupAddressItems(address);
      }
    } catch (error) {
      console.error("Failed to load details:", error);
    }
  }
});

const goBack = () => {
  router.go(-1); // Navigates back to the previous page
};

function setupContactItems(contact: any) {
  contactItems.value = [
    { title: "First Name", value: contact.firstName, icon: "mdi-account" },
    { title: "Last Name", value: contact.lastName, icon: "mdi-account" },
    { title: "Email", value: contact.email, icon: "mdi-email" },
    { title: "Phone Number", value: contact.phoneNumber, icon: "mdi-phone" },
    { title: "Job Title", value: contact.jobTitle, icon: "mdi-briefcase" },
    { title: "Street", value: contact.address.street, icon: "mdi-road" },
    { title: "City", value: contact.address.city, icon: "mdi-city" },
    { title: "State", value: contact.address.state, icon: "mdi-map-marker" },
    { title: "Zip Code", value: contact.address.zipCode, icon: "mdi-zip-box" },
    { title: "Country", value: contact.address.country, icon: "mdi-flag" },
  ];
}

function setupAddressItems(address: any) {
  addressItems.value = [
    { title: "Street", value: address.street, icon: "mdi-road" },
    { title: "City", value: address.city, icon: "mdi-city" },
    { title: "State", value: address.state, icon: "mdi-map-marker" },
    { title: "Zip Code", value: address.zipCode, icon: "mdi-zip-box" },
    { title: "Country", value: address.country, icon: "mdi-flag" },
  ];
}
</script>
