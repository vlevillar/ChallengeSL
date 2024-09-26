<template>
  <div class="input-container">
    <label v-if="title" class="input-title">{{ title }}</label>
    <div class="input-wrapper" :class="{ 'invalid': isInvalid }" :style="{ width: inputWidth, cursor: pointer ? 'pointer' : 'default' }">
      <input
        type="text"
        :value="isDate ? formattedDate : modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="input-field"
        :class="{ 'invalid': isInvalid }"
        :style="{ width: inputWidth, cursor: pointer ? 'pointer' : 'text' }"
        :readonly="isReadonly"
      />
      <span v-if="endIcon" class="end-content" :style="{ left: iconPosition }">
        <img :src="iconPath" class="input-icon" alt="End Icon" />
      </span>
    </div>
    <div class="error-container">
      <span v-if="isInvalid" class="error-message">Ingrese un formato válido de hora (HH:MM)</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ""
    },
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
    },
    pointer: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    isDate: {  // Nueva propiedad para determinar si es una fecha
      type: Boolean,
      default: false
    },
    isTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isInvalid: false
    }
  },
  computed: {
    iconPath() {
      return this.endIcon ? `/icons/${this.endIcon}` : null;
    },
    isReadonly() {
      return this.readonly;
    },
    formattedDate() {
      // Convertir de YYYY-MM-DD a DD/MM/YYYY
      if (!this.modelValue) return '';
      const [year, month, day] = this.modelValue.split('-');
      return `${day || ''}/${month || ''}/${year || ''}`;
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;

      if (this.isDate) {
        // Convertir de DD/MM/YYYY a YYYY-MM-DD para el modelo
        const parts = value.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          this.$emit('update:modelValue', `${year}-${month}-${day}`);
        } else {
          this.$emit('update:modelValue', value);
        }

        this.validateDate(value);
      } else {
        // Para otros tipos de entrada, manejar como antes
        this.$emit('update:modelValue', value);
      }

      // Validar solo si se trata de un formato de tiempo
      if (this.isTime) {
        this.validateTime(value);
      }
    },
    validateTime(value) {
      const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
      this.isInvalid = !timeRegex.test(value);
    },
    validateDate(value) {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[0-9]{2})$/;
      this.isInvalid = !dateRegex.test(value);
    }
  }
};
</script>

<style scoped>
@import "../styles/customInput/style.css";
</style>