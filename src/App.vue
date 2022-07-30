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

      <v-btn target="_blank" text>
        <span class="mr-2">Logout</span>
        <v-icon small>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    titleTemplate: "%s | My Expense",
  },

  data: () => ({
    //
  }),
};
</script>
