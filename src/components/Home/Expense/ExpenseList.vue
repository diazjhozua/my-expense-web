<template>
  <v-container class="mt-5">
    <header class="d-flex justfiy-space-between">
      <h1 class="text-h5">Expenses</h1>
      <v-spacer></v-spacer>
      <v-btn @click="createItem" class="white--text mb-3 px-10" color="#272727"
        >Record <v-icon class="ml-3">mdi-clipboard-plus</v-icon></v-btn
      >
    </header>

    <v-row class="mt-4">
      <v-col cols="12" md="4" sm="4">
        <v-card shaped outlined class="py-3 px-3" elevation="3">
          <div class="d-flex justify-space-between">
            <v-icon x-large>mdi-calendar</v-icon>
            <div>
              <v-card-title>{{ expensesThisDay | toPhp }}</v-card-title>
              <v-card-subtitle>Total expense this day</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="4">
        <v-card shaped outlined class="py-3 px-3" elevation="3">
          <div class="d-flex justify-space-between">
            <v-icon x-large>mdi-calendar-month</v-icon>
            <div>
              <v-card-title>{{ expensesThisMonth | toPhp }}</v-card-title>
              <v-card-subtitle>Total expense this month</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="4">
        <v-card shaped outlined class="py-3 px-3" elevation="3">
          <div class="d-flex justify-space-between">
            <v-icon x-large>mdi-calendar-blank-multiple</v-icon>
            <div>
              <v-card-title>{{ expensesThisYear | toPhp }}</v-card-title>
              <v-card-subtitle>Total expense this year</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <p class="text-subtitle-1 mt-4">
      These are the list of expenses in your account.
    </p>

    <v-card class="mb-15">
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
        <template v-slot:[`item.type`]="{ item }">
          <div>{{ item.type | splitCamelCase }}</div>
        </template>
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
    <expense-form></expense-form>
    <delete-dialog @deleteHandler="deleteItem"></delete-dialog>
  </v-container>
</template>

<script>
import ExpenseForm from "./ExpenseForm.vue";
import DeleteDialog from "@/components/global/DeleteDialog.vue";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
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
  components: {
    ExpenseForm,
    DeleteDialog,
  },
  async created() {
    await this.getExpensesAction();
  },
  computed: {
    ...mapState("expense", ["expenses"]),
    ...mapGetters("expense", [
      "expensesThisDay",
      "expensesThisMonth",
      "expensesThisYear",
    ]),
  },
  methods: {
    ...mapActions("expense", [
      "getExpensesAction",
      "createExpenseAction",
      "getExpenseByIdAction",
      "deleteExpenseAction",
    ]),
    ...mapMutations("expense", ["openExpenseForm", "setIsEditing"]),
    ...mapMutations("global", ["setDeleteDialog"]),
    async createItem() {
      await this.createExpenseAction();
      this.openExpenseForm();

      this.setIsEditing(false);
    },
    async editItem(item) {
      try {
        await this.getExpenseByIdAction(item.id);
        await this.createExpenseAction();
        this.openExpenseForm();
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
        await this.deleteExpenseAction(this.deleteId);
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
      return `???${value.toLocaleString()}`;
    },
    splitCamelCase: function (value) {
      if (!value) return "";
      return value.replace(/([a-z])([A-Z])/g, "$1 $2");
    },
  },
};
</script>

<style scoped></style>
