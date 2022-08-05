<template>
  <v-container class="mt-5">
    <header class="text-h5">
      Hi
      <span class="font-weight-bold"
        >{{ user.firstName }} {{ user.lastName }}
      </span>
      !
    </header>

    <section class="mt-4">
      <v-row>
        <v-col cols="5">
          <v-card class="px-2 pb-5" min-height="120">
            <div class="d-flex justify-space-between align-center">
              <v-card-subtitle class="font-weight-black">
                Latest Expenses
              </v-card-subtitle>

              <v-btn x-small text plain @click="createExpenseHandler"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              >
            </div>

            <v-card
              v-for="(expense, index) in latestExpenses"
              :key="index"
              class="mx-6 px-4 mb-3"
              outlined
            >
              <div class="d-flex justify-space-between align-center">
                <div class="text-overline">{{ expense.name }}</div>
                <div class="text-caption font-weight-bold">
                  {{ expense.cost | toPhp }}
                </div>
              </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <expense-form></expense-form>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import ExpenseForm from "../Expense/ExpenseForm.vue";
export default {
  components: {
    ExpenseForm,
  },
  async created() {
    await this.getExpensesAction();
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("expense", ["latestExpenses"]),
  },
  methods: {
    ...mapActions("expense", ["getExpensesAction", "createExpenseAction"]),
    ...mapMutations("expense", ["openExpenseForm", "setIsEditing"]),

    async createExpenseHandler() {
      await this.createExpenseAction();
      this.openExpenseForm();
      this.setIsEditing(false);
    },
  },
  filters: {
    toPhp(value) {
      if (isNaN(value)) {
        value = 0;
      }
      return `₱${value.toLocaleString()}`;
    },
  },
};
</script>

<style scoped></style>
