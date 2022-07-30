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
          outlined
          label="Email"
          type="email"
          prepend-inner-icon="mdi-at"
          data-test="email-input"
        ></v-text-field>

        <v-text-field
          outlined
          class="mt-4"
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
          color="#272727"
          large
          class="white--text"
          elevation="2"
          data-test="login-button"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="mt-5">
      <v-btn color="dark lighten-2" text plain>
        NEW uSER? Click to register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      passwordShow: "",
    };
  },
};
</script>

<style scoped></style>
