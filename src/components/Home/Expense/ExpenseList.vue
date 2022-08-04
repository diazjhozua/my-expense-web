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
      <v-data-table :headers="headers" :search="search" :items="expenses || []">
        <template v-slot:[`item.date`]="{ item }">
          <div>{{ item.date | ddMmmmY }}</div>
        </template>
        <template v-slot:[`item.cost`]="{ item }">
          <div>{{ item.cost | toPhp }}</div>
        </template>

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
import { mapState, mapActions, mapMutations } from "vuex";
import { format, parseISO } from "date-fns";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Expense",
          align: "start",
          value: "name",
        },
        { text: "Cost", value: "cost" },
        { text: "Type", value: "type" },
        { text: "Category", value: "category.name" },
        { text: "Description", value: "description" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      deleteId: null,
    };
  },
  async created() {
    await this.getExpensesAction();
  },
  computed: {
    ...mapState("expense", ["expenses"]),
  },
  methods: {
    ...mapActions("expense", [
      "getExpensesAction",
      "createExpenseAction",
      "getExpenseByIdAction",
      "deleteExpenseAction",
    ]),
    ...mapMutations("expense", ["openCategoryForm", "setIsEditing"]),
    ...mapMutations("global", ["setDeleteDialog"]),
    createItem() {
      this.openCategoryForm();
      this.setIsEditing(false);
    },
    async editItem(item) {
      try {
        await this.getCategoryByIdAction(item.id);
        this.openCategoryForm();
        this.setIsEditing(true);
      } catch (error) {
        //
      }
    },
    openDeleteConfirmation(item) {
      this.deleteId = item.id;
      this.setDeleteDialog({
        visible: true,
        title: "Delete category confirmation",
        message: `Are you sure you want to delete this category(${item.name})? `,
      });
    },

    async deleteItem() {
      try {
        await this.deleteCategoryAction(this.deleteId);
        this.setDeleteDialog({
          visible: false,
          title: "",
          message: "",
        });
      } catch (error) {
        //
      }
    },
  },
  filters: {
    ddMmmmY: function (dateTime) {
      if (!dateTime) return "";
      return format(parseISO(dateTime), "MMMM dd,  y");
    },
    toPhp(value) {
      if (isNaN(value)) {
        value = 0;
      }
      return `₱ ${value.toLocaleString()}`;
    },
  },
};
</script>

<style scoped></style>
