<template>
  <div class="RuleBuilder_DateRangeRule form-group">
    <label class="mb-2">
      Date range:
    </label>
    <div class="form-control">
      <date-picker
          v-model="dateRange"
          is-range
          :columns="layout.columns"
          :locale="nb"
          :first-day-of-week="2"
          :is-expanded="layout['is-expanded']"
          class="border-0"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {makeRule} from '../../utilities.js'
import breakpoints from '../../mixins/breakpoints'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import locales from 'v-calendar/src/utils/defaults/locales'
export default {
  name: 'DateRangeRule',

  mixins: [breakpoints],

  components: {
    DatePicker
  },

  data: () => ({
    nb: locales.nb
  }),
  props: {
    value: {
      type: Object,
      default: () => makeRule('dateRange')
    },
    depth: Number,
    maxDepth: Number,
  },

  computed: {
    layout() {
      return {
        'is-expanded': true,
        'columns': this.breakpoints.sm ? 1 : 2
      }
    },

    dateRange: {
      get() {
        return {
          start: this.value.from ? dayjs(this.value.from).format('YYYY-MM-DD') : null,
          end: this.value.to ? dayjs(this.value.to).subtract(1, 'day').format('YYYY-MM-DD') : null
        }
      },

      set({start, end}) {
        this.$emit('input', {
          ...this.value,
          from: start ? dayjs(start).format('YYYY-MM-DD') : null,
          to: end ? dayjs(end).add(1, 'day').format('YYYY-MM-DD') : null
        })
      }
    }
  },
}
</script>
