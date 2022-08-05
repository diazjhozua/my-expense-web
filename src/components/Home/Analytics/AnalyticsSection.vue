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
        <v-col cols="12" sm="5">
          <v-card class="px-2 pb-5" style="height: 100%">
            <div class="d-flex justify-space-between align-center mb-3">
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

        <v-col cols="12" sm="7">
          <v-card class="px-4 py-5">
            <line-chart
              :chart-data="averageExpenseChartData"
              :styles="lineStyles"
              :chart-options="lineChartOptions"
            />
          </v-card>
        </v-col>

        <v-col cols="12" sm="7">
          <v-card class="px-4 py-5">
            <v-card-subtitle class="font-weight-black">
              Budget per category overview ({{ thisMonth }})
            </v-card-subtitle>
            <bar-chart
              :chart-options="barChartOptions"
              :chart-data="categorySummaryChartData"
            />
          </v-card>
        </v-col>

        <v-col cols="12" sm="5">
          <v-card class="px-4 py-5">
            <v-card-subtitle class="font-weight-black">
              Budget Summary ({{ thisMonth }})
            </v-card-subtitle>
            <pie-chart
              :chart-data="budgetLimitChartData"
              :chart-options="pieChartOptions"
            />
          </v-card>
        </v-col>
      </v-row>
    </section>
    <expense-form></expense-form>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { Line, Pie, Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

import ExpenseForm from "../Expense/ExpenseForm.vue";
import { format } from "date-fns";

export default {
  components: {
    ExpenseForm,
    "line-chart": Line,
    "pie-chart": Pie,
    "bar-chart": Bar,
  },

  data() {
    return {
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      barChartOptions: {
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
      },
    };
  },
  async created() {
    await this.getExpensesAction();
    await this.getAverageExpenseAction();
    await this.getBudgetLimitThisMonthAction();
    await this.getCategorySummaryThisMonthAction();
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("expense", ["latestExpenses"]),
    ...mapGetters("analytics", [
      "averageExpenseChartData",
      "budgetLimitChartData",
      "categorySummaryChartData",
    ]),
    lineStyles() {
      return {
        height: `320px`,
      };
    },
    thisMonth() {
      return format(new Date(), "MMMM");
    },
  },
  methods: {
    ...mapActions("expense", ["getExpensesAction", "createExpenseAction"]),
    ...mapActions("analytics", [
      "getAverageExpenseAction",
      "getBudgetLimitThisMonthAction",
      "getCategorySummaryThisMonthAction",
    ]),
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
