<template>
  <v-container class="mt-5">
    <header class="d-flex justfiy-space-between">
      <h1 class="text-h5">Expenses</h1>
      <v-spacer></v-spacer>
      <v-btn @click="createItem" class="white--text mb-3 px-10" color="#272727"
        >Create <v-icon class="ml-3">mdi-clipboard-plus</v-icon></v-btn
      >
    </header>

    <p class="text-subtitle-1 mt-4">
      These are the list of expenses in your account.
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
      <v-data-table
        :headers="headers"
        :search="search"
        :items="categories || []"
      >
        <!-- <template v-slot:[`item.dateCreated`]="{ item }">
          <div>{{ item.dateCreated | ddMmmmYHhSsA }}</div>
        </template>
        <template v-slot:[`item.limit`]="{ item }">
          <div>{{ item.limit | toPhp }}</div>
        </template> -->

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteConfirmation(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped></style>
