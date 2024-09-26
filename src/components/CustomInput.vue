<template>
  <div class="input-container">
    <label v-if="title" class="input-title">{{ title }}</label>
    <div class="input-wrapper" :style="{ width: inputWidth }">
      <input
        type="text"
        v-model="inputValue"
        :placeholder="placeholder"
        class="input-field"
        :style="{ width: inputWidth }"
      />
      <span v-if="endIcon" class="end-content" :style="{ left: iconPosition }">
        <img :src="iconPath" class="input-icon" alt="End Icon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Type something...",
    },
    endIcon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    inputWidth: {
      type: String,
      default: "100%",
    },
    iconPosition: {
      type: String,
      default: "",
    }
  },
  computed: {
    iconPath() {
      return this.endIcon ? `/icons/${this.endIcon}` : null;
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>

<style scoped>
@import "../styles/customInput/style.css";
</style>
