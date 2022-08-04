<template>
  <v-card class="mx-auto my-15" max-width="500" outlined>
    <v-card-title class="text-h4" color="dark">Login</v-card-title>

    <v-card-text>
      <div class="text-subtitle-1">
        Welcome! Login to access manage your existing expense tracker.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-form ref="loginForm" class="mt-10 mx-5">
        <v-text-field
          color="#272727"
          v-model="loginForm.email"
          outlined
          :rules="[rules.required, rules.email]"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-at"
          data-test="email-input"
        ></v-text-field>

        <v-text-field
          outlined
          v-model="loginForm.password"
          class="mt-4"
          :rules="[rules.required, rules.minLength8]"
          color="#272727"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          label="Password"
          prepend-inner-icon="mdi-lock"
          data-test="password-input"
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>

        <v-btn
          block
          @click="submitFormHandler"
          color="#272727"
          large
          class="white--text mt-4"
          elevation="2"
          data-test="login-button"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="mt-5">
      <v-btn color="dark lighten-2" to="/register" text plain>
        NEW USER? CLICK TO REGISTER
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginView",
  metaInfo: {
    title: "Login",
  },
  data() {
    return {
      passwordShow: "",
      loginForm: {
        email: "sample@gmail.com",
        password: "sample123",
      },
      rules: {
        required: (value) => !!value || "Required",
        minLength8: (value) =>
          (value && value.length >= 8) ||
          "Value must have atleast 8 characters",
        email: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      },
    };
  },
  computed: {
    ...mapState("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["loginAction"]),
    async submitFormHandler() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      await this.loginAction(this.loginForm);

      if (this.isAuthenticated) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped></style>
