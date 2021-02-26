<template>
  <div>
    <Navbar />
    <v-tabs fixed-tabs background-color="black" dark v-model="tab">
      <v-tab v-for="(tab, index) in months" :key="index">
        {{ months[index] }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(tab, index) in months" :key="index">
        <Month :key="index" :month="index + 1" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import utils from "@/utils/months";
import Navbar from "../../components/Navbar";
import Month from "./components/Month";
export default {
  name: "Calendar",
  components: { Navbar, Month },
  data() {
    return {
      months: utils,
      tab: new Date().getMonth()
    };
  }
};
</script>

<style></style>
