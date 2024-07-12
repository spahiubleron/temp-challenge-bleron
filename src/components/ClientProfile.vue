<template>
<v-card
    class="mx-auto text-white"
    color="dark"
    max-width="auto"
    prepend-icon="mdi-account"
    title="Client information"
  >
    <template v-slot:prepend>
      <v-icon size="x-large"></v-icon>
    </template>

    <v-card-text class="text-h5 py-2">
      <span class="text-decoration-overline">Known for good:</span> {{clientItem.tags.join(', ') }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            :image="clientItem.logo"
          ></v-avatar>
        </template>

        <v-list-item-title>{{ clientItem.givenName }}</v-list-item-title>

        <v-list-item-subtitle>Joined since: {{ clientItem.createdAt }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
  </v-card>  
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type ClientItem = {
  givenName: string;
  logo: string;
  tags: string[];
  createdAt: string;
};

const props = defineProps<{
  clientItem: ClientItem;
}>();
</script>