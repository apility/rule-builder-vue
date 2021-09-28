<template>
  <div v-if="current && old" class="DateDiffer">
    <div class="row">
      <div class="col-12" v-if="newDates.length || removedDates.length">
        <div style="" class="d-flex flex-column gap-2 DateDiffer__container">
          <div v-for="date in this.newDates" class="DateDiffer__element DateDiffer__element--added p-2 d-flex flex-row align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="" style="height: 30px; width: 30px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>
                {{ date |format }}
            </span>

          </div>
          <div v-for="date in this.removedDates" class="DateDiffer__element DateDiffer__element--removed p-2 d-flex flex-row align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="" style="height: 30px; width: 30px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>
                {{ date |format }}
            </span>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {format} from "date-fns";

export default {
  name: "DateDiffer",
  props: {
    old: Array,
    current: Array
  },
  computed: {
    newDates() {
      if (!this.current || !this.old) {
        return []
      }
      let parsed = this.old.map(date => date.toDateString())
      return this.current.filter(date => parsed.includes(date.toDateString()) === false)
    },
    removedDates() {
      if (!this.current || !this.old)
        return []

      let parsed = this.current.map(date => date.toDateString())
      return this.old.filter(date => parsed.includes(date.toDateString()) === false)
    },

  },
  filters: {
    format: (d) => format(d, "d MMMM yyyy")
  }
}
</script>

<style scoped>
</style>
