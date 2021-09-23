<template>
    <div>
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
                <option value="weekly">Weekly</option>
            </select>
        </div>
        <div class="form-group">
            <label class="mb-2">
                Rule:
            </label>
            <div>
                <date-rule
                    v-model="child"
                    :depth="depth + 1"
                    :max-depth="maxDepth"
                    @remove="remove"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { makeRule } from '../../utilities.js'
import DateRule from '../DateRule.js'

export default {
    name: 'RecurringRule',

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

    computed: {
        interval: {
            get() {
                return this.value.interval
            },

            set(interval) {
                this.$emit('input', {
                    ...this.value,
                    interval
                })
            }
        },

        child: {
            get () {
                return this.value.child
            },

            set (child) {
                this.$emit('input', {
                    ...this.value,
                    child
                })
            }
        }
    },

    methods: {
        remove () {
            this.child = null
        },
    }
}
</script>