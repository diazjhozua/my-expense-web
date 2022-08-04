<template>
  <v-dialog
    v-model="expenseFormDialog"
    max-width="700px"
    @keydown.esc="closeDialogHandler"
    @click:outside="closeDialogHandler"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formText }}</span>
      </v-card-title>

      <v-form ref="form">
        <v-container class="px-10">
          <v-row>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                v-model="name"
                :rules="[rules.required, rules.minLength4]"
                dense
                color="#272727"
                outlined
                label="Expense"
                type="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="4">
              <v-autocomplete
                dense
                :rules="[rules.required]"
                v-model="type"
                :items="expenseTypes"
                outlined
                label="Type"
              >
                <template v-slot:selection="data">
                  <span class="text-subtitle-1">{{
                    data.item | splitCamelCase
                  }}</span>
                </template>
                <template v-slot:item="data">
                  <span class="text-caption font-weight-bold">{{
                    data.item | splitCamelCase
                  }}</span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    color="#272727"
                    :rules="[rules.required]"
                    v-model="returnDate"
                    dense
                    outlined
                    label="Date occured"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="#272727"
                  class="white--text"
                  v-model="returnDate"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                dense
                v-model="categoryId"
                :items="categories"
                :rules="[rules.required]"
                outlined
                label="Category"
                item-text="name"
                item-value="id"
              >
                <template v-slot:item="data">
                  <span class="text-caption font-weight-bold">{{
                    data.item.name
                  }}</span>
                </template>
              </v-autocomplete></v-col
            >
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                dense
                v-model.number="cost"
                :rules="[rules.required, rules.minValue1]"
                color="#272727"
                outlined
                hint="How much you spend in this specific expense"
                persistent-hint
                prepend-inner-icon="mdi-cash-multiple"
                label="Cost"
                type="number"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-textarea
                rows="4"
                v-model="description"
                outlined
                label="Description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#272727" text plain @click="closeDialogHandler">
            Cancel
          </v-btn>
          <v-btn
            color="#272727"
            class="white--text px-10"
            @click="submitFormHandler"
          >
            Record
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import { format, parseISO } from "date-fns";
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required",
        minLength4: (value) =>
          (value && value.length >= 4) ||
          "Value must have atleast 4 characters",
        minValue1: (value) =>
          (value && value > 0) || "Value must not be less than or equal to 0",
      },
      returnDate: "",
      menu2: false,
    };
  },
  created() {
    if (!this.isEditing) {
      this.returnDate = format(new Date(), "y-MM-dd");
    }
  },

  computed: {
    ...mapState("expense", [
      "expenseFormDialog",
      "isEditing",
      "expense",
      "expenseTypes",
      "categories",
    ]),
    ...mapFields("expense", [
      "expense.name",
      "expense.type",
      "expense.cost",
      "expense.categoryId",
      "expense.date",
      "expense.description",
    ]),

    formText() {
      if (this.isEditing) {
        return "Edit Expense";
      } else {
        return "Record Expense";
      }
    },
  },
  methods: {
    ...mapMutations("expense", ["closeExpenseForm"]),
    ...mapActions("expense", ["addExpenseAction", "updateExpenseAction"]),
    async submitFormHandler() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        if (this.isEditing) {
          await this.updateExpenseAction();
        } else {
          await this.addExpenseAction();
        }
        this.closeExpenseForm();
      } catch (error) {
        //
      }
    },
    closeDialogHandler() {
      this.$refs.form.reset();
      this.closeExpenseForm();
    },
  },
  filters: {
    splitCamelCase: function (value) {
      return value.replace(/([a-z])([A-Z])/g, "$1 $2");
    },
  },
  watch: {
    returnDate(newVal) {
      this.date = newVal;
    },
    date(newVal) {
      if (newVal) {
        try {
          this.returnDate = format(parseISO(this.date), "y-MM-dd");
        } catch (error) {
          this.returnDate = format(new Date(), "y-MM-dd");
        }
      }
    },
  },
};
</script>
