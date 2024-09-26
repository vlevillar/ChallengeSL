<template>
  <div class="reserveContainer">
    <p class="reserveTitle">Reservar Turno</p>
    <div class="input-group">
      <CustomInput
        v-model="name"
        title="Nombre"
        placeholder=""
        inputWidth="400px"
      />
      <div class="date-picker-container">
        <CustomInput
          v-model="formattedDate"
          title="Fecha"
          placeholder="Seleccionar fecha"
          inputWidth="200px"
          endIcon="calendar.png"
          iconPosition="190px"
          @click="toggleDatePicker"
          :readonly="true"
          :pointer="true"
          :isDate="true"
        />
        <div v-if="showDatePicker" class="date-picker-wrapper">
          <VDatePicker
            v-model="date"
            :popover="{ placement: 'bottom' }"
            @hide="showDatePicker = false"
            @input="updateFormattedDate"
          />
        </div>
      </div>
      <CustomInput
        v-model="startTime"
        title="Desde"
        placeholder="HH:MM"
        inputWidth="100px"
        endIcon="clock.png"
        iconPosition="100px"
        :isTime="true"
      />
      <CustomInput
        v-model="endTime"
        title="Hasta"
        placeholder="HH:MM"
        inputWidth="100px"
        endIcon="clock.png"
        iconPosition="100px"
        :isTime="true"
      />
      <button @click="reserveTurn" class="button-save">Reservar</button>
    </div>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";
import { DatePicker as VDatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

export default {
  data() {
    return {
      name: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      showDatePicker: false,
    };
  },
  watch: {
    name() {
      this.emitCurrentReservation();
    },
    date() {
      this.emitCurrentReservation();
    },
    startTime() {
      this.emitCurrentReservation();
    },
    endTime() {
      this.emitCurrentReservation();
    },
  },
  computed: {
    formattedDate() {
      return this.date ? this.formatDate(this.date) : "Seleccionar fecha";
    },
  },
  methods: {
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    updateFormattedDate(date) {
      this.date = date;
      this.showDatePicker = false;
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },
    clearFields() {
      this.name = "";
      this.date = new Date();
      this.startTime = "";
      this.endTime = "";
    },
    reserveTurn() {
      if (this.name && this.date && this.startTime && this.endTime) {
        const newTurn = {
          name: this.name,
          date: this.formatDate(this.date),
          startTime: this.startTime,
          endTime: this.endTime,
        };
        this.$emit("add-turn", newTurn);
        this.clearFields();
      } else {
        alert("Complete todos los campos para reservar un turno.");
      }
    },
    emitCurrentReservation() {
      if (this.name && this.date && this.startTime && this.endTime) {
        this.$emit("update-current-reservation", {
          name: this.name,
          date: this.formatDate(this.date),
          startTime: this.startTime,
          endTime: this.endTime,
        });
      } else {
        this.$emit("update-current-reservation", null);
      }
    },
  },
  components: {
    CustomInput,
    VDatePicker,
  },
};
</script>

<style scoped>
@import "../styles/reserve/style.css";

.date-picker-wrapper {
  position: absolute;
  z-index: 100;
}
</style>
