<template>
    <div class="RuleBuilder_RecurringRule">
        <div class="form-group">
            <label class="mb-2">
                Interval:
            </label>
            <select
                class="form-select mb-3"
                v-model="interval"
            >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
            </select>
        </div>
        <div class="form-check mb-3">
            <input
                :id="`recurring-range-${_uid}`"
                class="form-check-input me-2"
                type="checkbox"
                v-model="range"
            >
            <label
                :for="`recurring-range-${_uid}`"
                class="form-check-label"
            >
                Range
            </label>
        </div>
        <div class="row">
            <div
                v-if="value.from"
                class="col-12 form-group"
                :class="{ 'col-sm-6': range }"
            >
                <label class="mb-2">
                    <template v-if="!range">
                        Day:
                    </template>
                    <template v-else>
                        From:
                    </template>
                </label>
                <select
                    v-if="interval === 'yearly'"
                    class="form-select mb-3"
                    v-model="fromMonth"
                >
                    <option
                        v-for="month in months"
                        :key="month.id"
                        :value="month.id"
                    >
                        {{ month.name }}
                    </option>
                </select>
                <select
                    class="form-select mb-3"
                    v-model="fromDay"
                >
                    <option
                        v-for="day in daysInMonth(value.from)"
                        :key="day"
                        :value="day"
                    >
                        {{ day }}
                    </option>
                </select>
            </div>
            <div
                v-if="value.to && range"
                class="col-12 col-sm-6 form-group"
            >
                <label class="mb-2">
                    To:
                </label>
                <select
                    v-if="interval === 'yearly'"
                    class="form-select mb-3"
                    v-model="toMonth"
                >
                    <option
                        v-for="month in months"
                        :key="month.id"
                        :value="month.id"
                    >
                        {{ month.name }}
                    </option>
                </select>
                <select
                    class="form-select mb-3"
                    v-model="toDay"
                >
                    <option
                        v-for="day in daysInMonth(value.to)"
                        :key="day"
                    >
                        {{ day }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import { makeRule } from '../../utilities.js'
import dayjs from 'dayjs'
import DateRule from '../DateRule.js'

window.dayjs = dayjs

export default {
    name: 'RecurringDateRangeRule',

    components: {
        DateRule,
    },

    props: {
        value: {
            type: Object,
            default: () => makeRule('recurring')
        },
        depth: Number,
        maxDepth: Number,
    },

    data: () => ({
        months: [
            { id: 0, name: 'January' },
            { id: 1, name: 'February' },
            { id: 2, name: 'March' },
            { id: 3, name: 'April' },
            { id: 4, name: 'May' },
            { id: 5, name: 'June' },
            { id: 6, name: 'July' },
            { id: 7, name: 'August' },
            { id: 8, name: 'September' },
            { id: 9, name: 'October' },
            { id: 10, name: 'November' },
            { id: 11, name: 'December' },
        ],
    }),

    computed: {
        range: {
            get () {
                return dayjs(this.value.from).add(1, 'day').format('YYYY-MM-DD') !== dayjs(this.value.to).format('YYYY-MM-DD')
            },

            set (value) {
                if (!value) {
                    this.value.to = dayjs(this.value.from)
                        .add(1, 'day')
                        .format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                } else {
                    this.value.to = dayjs(this.value.from)
                        .add(2, 'day')
                        .format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                }
            }
        },

        fromMonth: {
            get() {
                return this.value.from ? dayjs(this.value.from).month(): 0
            },

            set(month) {
                let year = 1901
                
                if (month > this.toMonth) {
                    year = 1902
                }

                let to = this.value.to
                    ? dayjs(this.value.to).year(year).format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                    : null

                const from = dayjs(this.value.from)
                    .month(month)
                    .format('YYYY-MM-DD')
                    .replace('1901', '0001')
                    .replace('1902', '0002')
                
                if (!this.range) {
                    to = dayjs(from).add(1, 'day')
                        .format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                }

                this.$emit('input', {
                    ...this.value,
                    from,
                    to
                })
            }
        },

        fromDay: {
            get() {
                return this.value.from ? dayjs(this.value.from).date(): 1
            },

            set(day) {
                let month = 0
                
                if (day > this.toDay) {
                    month = 1
                }

                let to = this.value.to
                    ? dayjs(this.value.to).month(month).format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                    : null

                const from = dayjs(this.value.from)
                        .date(day)
                        .month(this.interval === 'monthly' ? 0 : this.fromMonth)
                        .format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                
                if (!this.range) {
                    to = dayjs(from).add(1, 'day')
                        .format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                }

                this.$emit('input', {
                    ...this.value,
                    from,
                    to
                })
            }
        },

        toMonth: {
            get() {
                return this.value.to ? dayjs(this.value.to).month(): 0
            },

            set(month) {
                let year = 1901
                
                if (month < this.fromMonth) {
                    year = 1902
                }

                this.$emit('input', {
                    ...this.value,
                    to: dayjs(this.value.to)
                        .month(month)
                        .year(year)
                        .format('YYYY-MM-DD')
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                })
            }
        },

        toDay: {
            get() {
                return this.value.to ? dayjs(this.value.to).date(): 1
            },

            set(day) {
                let month = 0
                
                if (day < this.fromDay) {
                    month = 1
                }

                this.$emit('input', {
                    ...this.value,
                    to: dayjs(this.value.to)
                        .date(day)
                        .month(month)
                        .format(`YYYY-MM-DD`)
                        .replace('1901', '0001')
                        .replace('1902', '0002')
                })
            }
        },

        interval: {
            get() {
                return this.value.interval
            },

            set(interval) {
                const MM = interval === 'monthly' ? '01' : 'MM'
                const from = this.value.from
                    ? dayjs(this.value.from).format(`YYYY-${MM}-DD`).replace('1901', '0001').replace('1902', '0002')
                    : null
                const to = this.value.to
                    ? dayjs(this.value.to).format(`YYYY-${MM}-DD`).replace('1901', '0001').replace('1902', '0002')
                    : null

                this.$emit('input', {
                    ...this.value,
                    interval,
                    from,
                    to,
                })
            }
        }
    },

    mounted () {
        if (!this.value.from || !this.value.to) {
            this.$emit('input', {
                ...this.value,
                interval: this.value.interval ? this.value.interval : 'yearly',
                from: this.value.from ? this.value.from : '0001-01-01',
                to: this.value.to ? this.value.to : '0001-01-02'
            })
        }
    },

    methods: {
        daysInMonth (date) {
            return new Array(dayjs(date)
                .year(1901)
                .daysInMonth())
                .fill(null)
                .map((_, i) => i + 1)
        }
    }
}
</script>