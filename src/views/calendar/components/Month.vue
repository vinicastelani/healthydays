<template>
  <v-container fluid>
    <v-row class="my-0">
      <v-col cols="12">
        <div>
          <p class="text-h2 my-0">
            {{ months[month - 1] }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col
        class="px-0 py-0"
        v-for="(day, index) in daysInMonth"
        :key="index"
        cols="12"
        xl="2"
        lg="2"
        md="4"
        sm="4"
        @click="handleClick(index + 1)"
      >
        <Day
          :day="index + 1"
          :month="month"
          :dayClicked="dayClicked"
          v-on:handle-dialog="handleDialog"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import utils from "@/utils/months";
import Day from "./Day";
export default {
  name: "Month",
  components: { Day },
  props: ["month"],
  data() {
    return {
      months: utils,
      dayClicked: null
    };
  },
  computed: {
    daysInMonth() {
      return new Date(new Date().getFullYear(), this.month, 0).getDate();
    }
  },
  methods: {
    handleClick(index) {
      this.dayClicked = index;
    },
    handleDialog() {
      this.dayClicked = null;
    }
  }
};
</script>

<style></style>
