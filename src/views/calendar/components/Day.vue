<template>
  <v-card :hover="true" tile :loading="loading" class="py-5">
    <div class="d-flex py-0 my-0  align-center">
      <v-card-title class="py-0 my-0">
        {{ day }}
      </v-card-title>
      <v-card-subtitle class="px-0 py-0 my-0">
        {{
          new Date(
            new Date().getFullYear(),
            this.obj.month,
            this.obj.day
          ).toLocaleDateString("br", { weekday: "long" })
        }}
      </v-card-subtitle>
      <v-spacer></v-spacer>
      <v-icon class="mx-4" v-if="obj.image">
        mdi-image
      </v-icon>
    </div>
    <v-card-text class="py-0">
      <v-icon :color="obj.delivery ? 'red' : 'green'">
        mdi-hamburger
      </v-icon>
      {{
        obj.delivery
          ? "Você pediu delivery nesse dia :("
          : "Você não pediu delivery nesse dia!"
      }}
    </v-card-text>
    <v-card-text class="py-0">
      <v-icon :color="obj.water ? '#00cbff' : 'gray'">
        mdi-water
      </v-icon>
      {{
        obj.water
          ? "Você bebeu água nesse dia!"
          : "Você não bebeu água nesse dia :("
      }}
    </v-card-text>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          {{ `${day} de ${months[month - 1]} de ${new Date().getFullYear()}` }}
        </v-card-title>
        <v-divider class="mx-6"></v-divider>
        <v-card-text>
          <v-checkbox
            v-model="obj.delivery"
            :label="`Você pediu delivery nesse dia?`"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="obj.water"
            :label="`Você bebeu água nesse dia?`"
          ></v-checkbox>
          <div class="d-flex">
            <v-file-input
              label="File input"
              outlined
              dense
              @change="onFileSelected"
            ></v-file-input>
            <v-btn
              class="mx-5"
              color="primary"
              :loading="loadingUpload"
              @click="onUpload"
              :disabled="!selectedFile"
              >Enviar</v-btn
            >
            <v-spacer></v-spacer>
          </div>
          <img :src="obj.image" alt="" width="300" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import utils from "@/utils/months";
import dayServices from "@/services/dayServices";
export default {
  name: "Day",
  props: ["day", "month", "dayClicked"],
  data() {
    return {
      obj: {
        id: null,
        data: new Date(new Date().getFullYear(), this.month - 1, this.day)
          .toISOString()
          .substring(0, 10),
        month: this.month,
        day: this.day,
        image: null,
        delivery: false,
        water: false
      },
      months: utils,
      selectedFile: null,
      dialog: false,
      loading: false,
      loadingUpload: false
    };
  },
  methods: {
    handleDayClicked() {
      this.dialog = this.dayClicked == this.day ? true : false;
    },
    onFileSelected(event) {
      this.selectedFile = event;
    },
    async onUpload() {
      this.loadingUpload = true;
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);

      await dayServices.uploadImage(this.obj.id, fd).then(response => {
        console.log(response);
        this.obj.image = response.imageUrl;
      });

      this.loadingUpload = false;
    }
  },
  computed: {},
  watch: {
    dayClicked: {
      handler() {
        this.handleDayClicked();
      }
    },
    dialog: {
      async handler() {
        if (!this.dialog) {
          this.$emit("handle-dialog");
          //FAZ POST AQUI
          await dayServices.updateDay(this.obj.id, this.obj).then(response => {
            console.log(response);
          });
        }
      }
    }
  },
  async mounted() {
    this.loading = true;
    await dayServices
      .getDays({ month: this.obj.month, day: this.obj.day })
      .then(response => {
        this.obj.id = response.data._id;
        this.obj.delivery = response.data.delivery;
        this.obj.water = response.data.water;
        this.obj.image = response.data.image;
      });
    this.loading = false;

    // await dayServices.postDay(this.obj).then(response => {
    //   console.log(response.data);
    // });
  }
};
</script>

<style></style>
