<template>
  <div v-if="isLoading" class="spinner">
    <div class="ring">
      <flower-spinner :animation-duration="1300" :size="100" color="#272727" />
    </div>
  </div>
</template>

<script>
import { FlowerSpinner } from "epic-spinners";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("global", ["isLoading"]),
  },
  components: { FlowerSpinner },
};
</script>

<style scoped>
.spinner {
  z-index: 11111;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
