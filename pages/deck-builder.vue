<script>
  export default {
    data: () => ({
      cards : ["a", "b"],
      card_number: ""
    }),

    methods: {
      addList () {
        this.cards.push(this.card_number)
      },
      removeList(cardNumber) {
        let index = this.cards.indexOf(cardNumber)
        if (index !== -1) {
          this.cards.splice(index, 1)
        }
      }
    }
  }
</script>

<template>
  <v-row>
    <v-col style="background: red">
      <v-row>
        <v-col align-self="center">
          <v-text-field
              label="卡片編號"
              hide-details="auto"
              v-model="card_number"
          ></v-text-field>
        </v-col>
        <v-col align-self="center">
          <v-btn
              @click="addList()"
          >
            <v-icon
                icon="mdi-plus"
            ></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col style="background: green">
        <span v-for="card in cards">
          <v-row>
            <v-col align-self="center" cols="2">
              <v-btn
                  @click="removeList(card)"
              >
                <v-icon
                    icon="mdi-minus"
                ></v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-left" align-self="center">
              {{ card }}
            </v-col>
          </v-row>
        </span>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>