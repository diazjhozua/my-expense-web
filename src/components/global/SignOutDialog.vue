<template>
  <div>
    <v-btn @click.stop="dialog = true" text>
      <span class="mr-2">Logout</span>
      <v-icon small>mdi-open-in-new</v-icon>
    </v-btn>

    <v-dialog persistent v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6"> Confirm sign out? </v-card-title>

        <v-card-text>
          Are you sure you want to sign out? You will be returned to the login
          screen.
        </v-card-text>

        <v-card-actions>
          <v-row no-gutters class="text-center">
            <v-col>
              <v-btn
                color="grey darken-4"
                plain
                :disabled="isLoading"
                @click="dialog = false"
              >
                Cancel
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                :loading="isLoading"
                :disabled="isLoading"
                color="#B61228"
                class="px-5 white--text"
                @click="signOutHandler"
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
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      loader: null,
      isLoading: false,
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapMutations("alert", ["setAlert"]),
    ...mapActions("auth", ["logoutAction"]),

    async signOutHandler() {
      this.loader = "isLoading";

      await this.logoutAction();

      this.loader = "";

      if (this.isAuthenticated) {
        this.setAlert({
          visible: true,
          type: "error",
          text: "There was an error with the request",
        });
      } else {
        this.dialog = false;

        this.setAlert({
          visible: true,
          type: "success",
          text: "Logout success",
        });

        this.$router.push("/login");
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>
