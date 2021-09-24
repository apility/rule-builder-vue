<template>
    <div class="RuleBuilder_DayOfWeekRule form-group">
        <label class="mb-2">
            Days:
        </label>
        <div>
            <div
                v-for="day in daysOfWeek"
                :key="day.id"
                class="form-check"
            >
                <input
                    :id="`dayOfWeek-${_uid}-${day.id}`"
                    class="form-check-input"
                    type="checkbox"
                    :checked="isDayChecked(day.id)"
                    @change="toggleDay(day.id)"
                >
                <label
                    class="form-check-label"
                    :for="`dayOfWeek-${_uid}-${day.id}`"
                >
                    {{ day.label }}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { makeRule } from '../../utilities.js'

export default {
    name: 'DayOfWeekRule',

    props: {
        value: {
            type: Object,
            default: () => makeRule('dayOfWeek')
        },
        depth: Number,
        maxDepth: Number,
    },

    computed: {
        daysOfWeek () {
            return [
                { id: 1, label: 'Monday' },
                { id: 2, label: 'Tuesday' },
                { id: 3, label: 'Wednesday' },
                { id: 4, label: 'Thursday' },
                { id: 5, label: 'Friday' },
                { id: 6, label: 'Saturday' },
                { id: 0, label: 'Sunday' },
            ]
        },

        days: {
            get () {
                return this.value.days
            },

            set (days) {
                this.$emit('input', {
                    ...this.value,
                    days
                })
            }
        },
    },

    methods: {
        isDayChecked (day) {
            return this.days.includes(parseInt(day, 10))
        },

        toggleDay (day) {
            if (this.isDayChecked(day)) {
                this.days = this.days.filter(value => value !== day)
            } else {
                this.days = [...this.days, day]
            }
        }
    }
}
</script>