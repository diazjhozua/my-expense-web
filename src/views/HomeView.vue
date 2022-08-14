<template>
  <section class="overflow-hidden mx-auto" height="100%">
    <v-bottom-navigation
      v-model="bottomNavigation"
      absolute
      horizontal
      color="grey darken-4"
    >
      <v-spacer></v-spacer>
      <v-btn color="teal" text>
        <span>Home</span>
        <v-icon>mdi-google-analytics</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="teal" text>
        <span>Expenses</span>

        <v-icon>mdi-cash</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="teal" text>
        <span>Categories</span>

        <v-icon>mdi-shape</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-bottom-navigation>

    <v-responsive class="overflow-y-auto" style="height: 90vh">
      <v-responsive min-height="200">
        <analytics-section v-if="bottomNavigation == 0"></analytics-section>
        <expense-list v-if="bottomNavigation == 1"></expense-list>
        <category-list v-if="bottomNavigation == 2"></category-list>
      </v-responsive>
    </v-responsive>
  </section>
</template>

<script>
import AnalyticsSection from "@/components/Home/Analytics/AnalyticsSection.vue";
import ExpenseList from "@/components/Home/Expense/ExpenseList.vue";
import CategoryList from "@/components/Home/Category/CategoryList.vue";
export default {
  name: "HomeView",
  metaInfo: {
    title: "Home",
  },
  components: {
    AnalyticsSection,
    ExpenseList,
    CategoryList,
  },
  data() {
    return {
      bottomNavigation: 0,
    };
  },
};
</script>
