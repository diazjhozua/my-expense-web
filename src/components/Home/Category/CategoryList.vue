<template>
  <v-container class="mt-5">
    <div class="d-flex justfiy-space-between">
      <header class="text-h5">Category List</header>
      <v-spacer></v-spacer>
      <v-btn class="white--text mb-3 px-10" color="#272727"
        >Create <v-icon class="ml-3">mdi-clipboard-plus</v-icon></v-btn
      >
    </div>

    <p class="text-subtitle-1 mt-4">
      These are the list of category in your account. Once you are a registered
      user, the system will generate five default categories. You can modify or
      add any categories you want.
    </p>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :search="search"></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Category",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Limit", value: "limit" },
        { text: "Date", value: "fat" },
        { text: "Action", value: "actions", sortable: false },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
