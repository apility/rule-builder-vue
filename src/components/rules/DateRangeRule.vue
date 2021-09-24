<template>
    <div class="RuleBuilder_DateRangeRule form-group">
        <label class="mb-2">
            Date range
        </label> 
        <div class="form-control">
            <date-picker
                v-model="dateRange"
                is-range
                class="border-0"
            />
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { makeRule } from '../../utilities.js'

import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
    name: 'DateRangeRule',

    components: {
        DatePicker
    },

    props: {
        value: {
            type: Object,
            default: () => makeRule('dateRange')
        },
        depth: Number,
        maxDepth: Number,
    },

    computed: {
        dateRange: {
            get () {
                return {
                    start: this.value.from ? dayjs(this.value.from).format('YYYY-MM-DD') : null,
                    end: this.value.to ? dayjs(this.value.to).subtract(1, 'day').format('YYYY-MM-DD') : null
                }
            },

            set ({ start, end }) {
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