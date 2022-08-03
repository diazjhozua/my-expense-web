<template>
  <v-dialog v-model="categoryFormDialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formText }}</span>
      </v-card-title>

      <v-container class="px-10">
        <v-text-field
          dense
          color="#272727"
          outlined
          label="Category"
          type="text"
        ></v-text-field>

        <v-text-field
          dense
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
        <v-btn color="#272727" text plain @click="closeCategoryForm">
          Cancel
        </v-btn>
        <v-btn color="#272727" class="white--text px-10"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("category", ["categoryFormDialog", "isEditing"]),

    formText() {
      if (this.editing) {
        return "Edit Category";
      } else {
        return "Create Category";
      }
    },
  },
  methods: {
    ...mapMutations("category", ["closeCategoryForm"]),
  },
};
</script>

<style scoped></style>
