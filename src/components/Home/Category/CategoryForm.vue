<template>
  <v-dialog
    v-model="categoryFormDialog"
    max-width="500px"
    @keydown.esc="closeDialogHandler"
    @click:outside="closeDialogHandler"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formText }}</span>
      </v-card-title>

      <v-form ref="form">
        <v-container class="px-10">
          <v-text-field
            v-model="name"
            :rules="[rules.required, rules.minLength4]"
            dense
            color="#272727"
            outlined
            label="Category"
            type="text"
          ></v-text-field>

          <v-text-field
            dense
            v-model.number="limit"
            :rules="[rules.required, rules.minValue1]"
            color="#272727"
            outlined
            hint="Limit is used when determining if you are exceeding your expense during a specified month."
            persistent-hint
            label="Limit"
            type="number"
          ></v-text-field>
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
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
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
    };
  },
  computed: {
    ...mapState("category", ["categoryFormDialog", "isEditing", "category"]),
    ...mapFields("category", ["category.name", "category.limit"]),

    formText() {
      if (this.isEditing) {
        return "Edit Category";
      } else {
        return "Create Category";
      }
    },
  },
  methods: {
    ...mapMutations("category", ["closeCategoryForm"]),
    ...mapActions("category", ["addCategoryAction", "updateCategoryAction"]),
    async submitFormHandler() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        if (this.isEditing) {
          await this.updateCategoryAction();
        } else {
          await this.addCategoryAction();
        }
        await this.addCategoryAction();
        this.closeCategoryForm();
      } catch (error) {
        //
      }
    },
    closeDialogHandler() {
      this.$refs.form.reset();
      this.closeCategoryForm();
    },
  },
};
</script>

<style scoped></style>
