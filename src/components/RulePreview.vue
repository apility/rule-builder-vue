<template>
  <div class="row" v-if="rules">
    <div class="col-12">
      <DatePicker
          v-model="selectedDate"
          :available-dates="enabledDates"
          :first-day-of-week="2"
          :locale="nb"
          :rows="2"
          @update:from-page="setFrom"
          @update:to-page="setTo"
      ></DatePicker>
    </div>
    <div class="col-12 d-flex flex-row gap-2" v-if="showChanges">
      <a class="btn btn-primary mt-4 mr-2" @click.prevent="syncInitial" v-if="showSync">Sync</a>
      <a class="btn btn-primary mt-4" @click.prevent="diff">
        Kalkuler endringer
      </a>
    </div>
    <div class="node-list pt-5" v-if="showChanges">
      <DateDiffer :old="initialResults" :current="rulesResults"></DateDiffer>
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd.js'
import locales from 'v-calendar/src/utils/defaults/locales'
import { parse } from '@apility/rule-builder/dist/tsc/browser'
import DateDiffer from "./DateDiffer";
export default {
  name: "RulePreview",
  props: {
    rules: Object,
    showSync: Boolean,
    showChanges: Boolean,
    default: () => null
  },
  data: () => ({
    initialRule: null,
    selectedDate: null,
    error: null,
    from: null,
    to: null,
    nb: locales.nb,
    initialResults: [],
    rulesResults: []
  }),
  mounted() {
    this.initialRule = this.rules
  },
  computed: {
    enabledDates() {
      if(!this.from || !this.to) {
        return []
      }

      let rule = parse(this.rules)
      let date = new Date(this.from.getTime())
      let enabled = [ new Date(date.getDate() - 1)]
      do {
        if(rule.validate(date)) {
          enabled.push(new Date(date.getTime()))

        }
        date.setDate(date.getDate() + 1)
      } while(date < this.to)

      return enabled
    },
    explainer() {
      if(this.selectedDate && this.rules) {
        try {
          return parse(this.rules).explain(this.selectedDate)
        } catch (e) {
          return null
        }
      }
      return null
    },
  },
  methods: {
    setFrom({month, year}) {
      this.from = new Date(`${year}-${month}-01`)
    },
    setTo({month, year}) {
      if(month == 12) {
        year += 1
        month = 0
      }
      this.to = new Date(`${year}-${month+1}-01`)
    },
    syncInitial() {
      this.$set(this, 'initialRule', JSON.parse(JSON.stringify(this.rules)))
      this.diff()
    },
    async diff() {
      if(!this.rules || !this.initialRule || !this.showChanges) {
        return undefined
      }
      let date = new Date(new Date(Date.now()).getFullYear().toString() + "-01-01")
      const nextYear = new Date((new Date(Date.now()).getFullYear() + 1).toString() + "-01-01")

      try {
        const parsedRules = parse(this.rules)
        const initialRules = parse(this.initialRule)


        let parsedResults = []
        let initialResults = []
        do {
          if(parsedRules.validate(date)) {
            parsedResults.push(new Date(date.getTime()))
          }

          if(initialRules.validate(date)) {
            initialResults.push(new Date(date.getTime()))
          }

          date.setDate(date.getDate() + 1)
        } while(date < nextYear)

        this.initialResults = initialResults
        this.rulesResults = parsedResults
      } catch (e) {
        return undefined
      }
    }
  },
  watch: {
    deep: true,
    rules(n, p) {
      if(!this.initialRule) {
        this.$set(this, 'initialRule', JSON.parse(JSON.stringify(n)))
      }
    }
  },
  components: {
    DatePicker,
    DateDiffer
  }
}
</script>

<style scoped>

</style>
