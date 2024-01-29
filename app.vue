<template>
  <NuxtLayout>
    <v-app class="rounded rounded-md">
      <v-app-bar>
        <span class="ma-2 text-center">
          AZURLANE TCG BUILDER
        </span>

        <v-btn-toggle
            v-model="navToggle"
            rounded="0"
            color="deep-purple-accent-3"
            group
        >
          <v-btn value="index" to="/">
            Home
          </v-btn>
          <v-btn value="about" to="/about">
            About
          </v-btn>
          <v-btn value="builder" to="/deck-builder">
            Builder
          </v-btn>
        </v-btn-toggle>
      </v-app-bar>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <NuxtPage/>
      </v-main>
    </v-app>
  </NuxtLayout>
</template>
<script setup lang="ts">

</script>
<script lang="ts">
export default {
  data () {
    return {
      navToggle: ""
    }
  },
}
</script>