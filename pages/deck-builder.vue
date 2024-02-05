<script>
import cardList from '~/src/cards_list.json'
import axios from "axios";
import Dexie from 'dexie';

const db = new Dexie('azurlaneTcg');

export default {
  data: () => ({
    cards: {},
    card_code: "",
    card_autocomplete: []
  }),

  methods: {
    async addList() {
      console.log
      if (this.cards[this.card_code] !== undefined) {
        this.addCardNumber(this.card_code)
        return;
      }
      let card = await db.cards.where({code: this.card_code}).first();
      if (typeof card === "undefined") {
        return;
      }
      card.number = 1;
      this.cards[card.code] = card;
    },
    addCardNumber(index) {
      if (this.cards[index].number >= 4) {
        return;
      }
      this.cards[index].number++;
    },
    reduceCardNumber(index) {
      this.cards[index].number--;
      if (this.cards[index].number <= 0) {
        delete this.cards[index]
      }
    },
  },
  async mounted() {
    const runtimeConfig = useRuntimeConfig();
    db.version(1).stores({
      cards: '++id, card_id, name, img, code, colour, camp, ' +
          'force, type, explain, recommend, money, attack, rarity, ' +
          'support_type, support_value, ship_type, skillentry, durable, access, ' +
          'type_name, color_name, ship_type_name, force_name, camp_name', // Primary key and indexed props
    });
    await db.cards.clear();
    for (let index in cardList) {
      let cards = await axios.get(runtimeConfig.public.baseURL + '/json/' + cardList[index]).then(res => res.data);
      for (let cardIndex in cards) {
        await db.cards.add(cards[cardIndex])
        this.card_autocomplete.push(cards[cardIndex].code)
      }
    }

  }
}
</script>

<template>
  <v-container fluid>
    <v-row style="background: red">
      <v-col align-self="center" cols="2">
        <v-autocomplete
            label="卡片編號"
            v-model="card_code"
            :items="card_autocomplete"
        ></v-autocomplete>
      </v-col>
      <v-col align-self="center" cols="2">
        <v-btn
            @click="addList()"
        >
          <v-icon
              icon="mdi-plus"
          ></v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row style="background: green">
      <v-col v-for="(card, index) in cards" cols="6">
        <v-btn
            @click="addCardNumber(index)"
        >
          <v-icon
              icon="mdi-plus"
          ></v-icon>
        </v-btn>
        <v-label class="mx-3 text-h5"> {{ card.number }} </v-label>
        <v-btn
            @click="reduceCardNumber(index)"
        >
          <v-icon
              icon="mdi-minus"
          ></v-icon>
        </v-btn>
        <v-label class="mx-3 text-h5"> {{ card.code }} : {{ card.name }} </v-label>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>