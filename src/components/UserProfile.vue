<template>
<div v-if="userData">
  <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
              color="brown"
              size="large"
            >
              <span class="text-h5">{{ userData.givenName[0] }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5">{{ userData.givenName[0] }}</span>
              </v-avatar>
              <h3>{{ userData.givenName }}</h3>
              <p class="text-caption mt-1">
                {{ userData.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <p class="text-caption mt-1">
                username: {{ userData.username }}
              </p>
              <v-divider class="my-3"></v-divider>
              <p class="text-caption mt-1">
                Located: {{ userData.locale }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
</div>
</template>

<script setup lang="ts">

import { UserService } from '@/services/user.service';
import { onMounted, Ref, ref } from 'vue';

const userService = new UserService();

type UserItem = {
    givenName: string;
    email: string;
    username: string;
    avatar: string;
    locale: string;
};

const userData: UserItem | Ref<null> = ref(null);

const loadCurrentUser = async () => {
  try {
    const data = await userService.getCurrent();
    userData.value = data;
  } catch (error) {
    console.error("Failed to fetch items:", error);
  }
};

onMounted(async () => {
  await loadCurrentUser();
});
</script>