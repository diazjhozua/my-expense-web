<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <div class="d-flex align-center">
        <v-img
          alt="My Expense Logo"
          class="shrink mr-2"
          contain
          src="./assets/expenses.png"
          transition="scale-transition"
          width="40"
        />

        <p class="text-h5 shrink mt-1 hidden-sm-and-down mt-4">My Expense</p>
      </div>

      <v-spacer></v-spacer>

      <logout-dialog v-if="isAuthenticated"></logout-dialog>
    </v-app-bar>

    <v-main>
      <alert-notification></alert-notification>
      <loading-spinner></loading-spinner>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AlertNotification from "@/components/global/AlertNotification.vue";
import LoadingSpinner from "./components/global/LoadingSpinner.vue";
import LogoutDialog from "./components/global/LogoutDialog.vue";

import { mapState } from "vuex";
export default {
  name: "App",
  metaInfo: {
    titleTemplate: "%s | My Expense",
  },
  components: { AlertNotification, LoadingSpinner, LogoutDialog },
  computed: {
    ...mapState("auth", ["isAuthenticated"]),
  },
};
</script>
