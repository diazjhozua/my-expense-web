<template>
  <v-alert
    shaped
    style="width: 80%"
    v-model="alert.visible"
    dismissible
    :type="alert.type"
    border="left"
    class="custom-alert mt-5 ml-auto"
    transition="scale-transition"
    elevation="5"
    colored-border
  >
    <template v-slot:close="{ attrs }">
      <v-icon v-bind="attrs" :color="alert.type" @click="hideAlert">
        mdi-close-circle
      </v-icon>
    </template>
    {{ alert.text }}
  </v-alert>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("global", ["alert"]),
  },
  methods: {
    ...mapMutations("global", ["closeAlert"]),

    hideAlert() {
      this.closeAlert();
    },
  },
};
</script>

<style scoped>
.custom-alert {
  position: fixed;
  width: 80%;
  left: 50%;
  bottom: 75%;
  transform: translate(-45%, -50%);
  z-index: 1;
  margin: 0 auto;
}
</style>
