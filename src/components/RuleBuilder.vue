<template>
    <div class="RuleBuilder">
        <date-rule
            v-model="rule"
            :depth="0"
            :readOnly="readOnly"
            :max-depth="maxDepth"
            :colors="colors"
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

    data: () => ({
        collapsed: []
    }),

    props: {
        colors: {
            type: Array,
            default: ['#c4eed6', '#bfdaf4', '#de9f8e', '#f8f789', '#fca3fa']
        },

        readOnly: {
            type: Boolean,
            default: true,
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