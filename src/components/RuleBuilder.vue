<template>
    <div class="RuleBuilder">
        <date-rule
            v-model="rule"
            :depth="0"
            :readOnly="readOnly"
            :max-depth="maxDepth"
            :is-collapsed="isCollapsed"
            @remove="remove"
            @toggle-collapsed="toggleCollapsed"
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
        },

        isCollapsed (id) {
            return this.collapsed.includes(id)
        },

        toggleCollapsed (id) {            
            this.$set(this, 'collapsed', this.isCollapsed(id)
                ? [...this.collapsed.filter(collapsed => collapsed !== id)]
                : [...this.collapsed, id]
            )
        }
    }
}
</script>