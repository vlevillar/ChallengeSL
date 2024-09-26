<template>
  <div class="reserveContainer">
    <p class="reserveTitle">RESERVAR</p>
    <div class="input-group">
      <CustomInput title="Nombre" placeholder="" inputWidth="400px"/>
      <CustomInput title="Fecha" placeholder="" inputWidth="200px" endIcon="calendar.png" iconPosition="190px"/>
      <CustomInput title="Desde" placeholder="" inputWidth="100px" endIcon="clock.png" iconPosition="100px"/>
      <CustomInput title="Hasta" placeholder="" inputWidth="100px" endIcon="clock.png" iconPosition="100px"/>
      <button class="button-save">Guardar</button>
    </div>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";

export default {
  components: {
    CustomInput,
  },
};
</script>

<style>
@import "../styles/reserve/style.css";
</style>
