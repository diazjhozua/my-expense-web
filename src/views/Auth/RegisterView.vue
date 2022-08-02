<template>
  <v-card class="mx-auto my-15" max-width="500" outlined>
    <v-card-title class="text-h4" color="dark"
      >Create your account</v-card-title
    >

    <v-card-text>
      <div class="text-subtitle-1">
        Interested in managing your expense? Register today!
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-form ref="registerForm" class="mt-10 mx-5">
        <v-text-field
          color="#272727"
          v-model="registerForm.firstName"
          outlined
          :rules="[rules.required, rules.maxLength100]"
          label="First Name"
          type="text"
          prepend-inner-icon="mdi-account-box"
        ></v-text-field>

        <v-text-field
          color="#272727"
          v-model="registerForm.lastName"
          outlined
          :rules="[rules.required, rules.maxLength100]"
          label="Last Name"
          type="text"
          prepend-inner-icon="mdi-account-box"
        ></v-text-field>

        <v-text-field
          color="#272727"
          v-model="registerForm.email"
          outlined
          :rules="[rules.required, rules.email]"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-at"
        ></v-text-field>

        <v-text-field
          outlined
          v-model="registerForm.password"
          :rules="[rules.required, rules.minLength8]"
          color="#272727"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          label="Password"
          prepend-inner-icon="mdi-lock"
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>

        <v-text-field
          outlined
          v-model="registerForm.confirmPassword"
          :rules="[rules.required, rules.minLength8, rules.matchPassword]"
          color="#272727"
          :append-icon="confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="confirmPasswordShow ? 'text' : 'password'"
          label="Confirm password"
          prepend-inner-icon="mdi-lock"
          @click:append="confirmPasswordShow = !confirmPasswordShow"
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
          Register
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="mt-5">
      <v-btn color="dark lighten-2" to="/login" text plain>
        Already registered? Click to login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { register } from "@/services";
export default {
  name: "RegisterView",
  metaInfo: {
    title: "Register",
  },
  data() {
    return {
      passwordShow: "",
      confirmPasswordShow: "",
      registerForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        required: (value) => !!value || "Required",
        minLength8: (value) =>
          (value && value.length >= 8) ||
          "Value must have atleast 8 characters",
        maxLength100: (value) =>
          (value && value.length < 100) ||
          "Value must not be greater than 100 characters",
        email: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
        matchPassword: (value) =>
          (value &&
            this.registerForm.password &&
            value == this.registerForm.password) ||
          "Password is not matched",
      },
    };
  },
  methods: {
    async submitFormHandler() {
      if (!this.$refs.registerForm.validate()) {
        return;
      }

      try {
        await register(this.registerForm);
        this.$router.push("/login");
      } catch (error) {
        //
      }
    },
  },
};
</script>

<style scoped></style>
