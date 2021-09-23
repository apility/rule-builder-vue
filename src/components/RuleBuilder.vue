<template>
    <div>
        <date-rule
            v-model="rule"
            :depth="0"
            :removeable="removeable"
            :max-depth="maxDepth"
            @remove="remove"
        />
    </div>
</template>

<script>
import { makeRule } from '../utilities.js'
import DateRule from './DateRule.js'

export default {
    name: 'RuleBuilder',
    
    components: {
        DateRule
    },

    props: {
        removeable: {
            type: Boolean,
            default: false,
        },

        maxDepth: {
            type: Number,
            default: () => Infinity
        },

        value: {
            type: Object,
            default: () => makeRule('group')
        }
    },

    computed: {
        rule: {
            get () {
                return this.value
            },

            set (value) {
                this.$emit('input', value)
            }
        }
    },

    methods: {
        remove () {
            this.rule = null
        }
    }
}
</script>