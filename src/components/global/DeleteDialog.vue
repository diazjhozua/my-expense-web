<template>
  <div>
    <v-dialog
      v-model="deleteDialog.visible"
      @keydown.esc="closeDialog"
      @click:outside="closeDialog"
      class="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h6"> {{ deleteDialog.title }}</v-card-title>

        <v-card-text>{{ deleteDialog.message }}</v-card-text>

        <v-card-actions>
          <v-row no-gutters class="text-center">
            <v-col>
              <v-btn
                :disabled="isLoading"
                color="grey darken-4"
                plain
                @click="closeDialog"
              >
                Cancel
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                :loading="isLoading"
                :disabled="isLoading"
                color="#272727"
                class="px-5 white--text"
                @click="submitHandler"
              >
                Confirm
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    dialog: false,
    isLoading: false,
  }),
  methods: {
    ...mapMutations("global", ["setDeleteDialog"]),
    submitHandler() {
      this.$emit("deleteHandler");
    },

    closeDialog() {
      this.setDeleteDialog({ visible: false, message: "", title: "" });
    },
  },
  computed: {
    ...mapState("global", ["deleteDialog"]),
  },
};
</script>

<style scoped>
.dialog {
  z-index: 1 !important;
}
</style>
