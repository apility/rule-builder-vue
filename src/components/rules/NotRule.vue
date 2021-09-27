<template>
    <div class="RuleBuilder_NotRule form-group">
        <label class="mb-2">
            Rule:
        </label>
        <div>
            <date-rule
                v-model="child"
                :depth="depth + 1"
                :max-depth="maxDepth"
                :colors="colors"
                @remove="remove"
            />
        </div>
    </div>
</template>

<script>
import { makeRule } from '../../utilities.js'
import DateRule from '../DateRule.js'

export default {
    name: 'NotRule',

    components: {
        DateRule,
    },

    props: {
        value: {
            type: Object,
            default: () => makeRule('not')
        },
        colors: {
            type: Array,
            default: ['#c4eed6', '#bfdaf4', '#de9f8e', '#f8f789', '#fca3fa']
        },
        depth: Number,
        maxDepth: Number,
        isCollapsed: [Function, null],
    },

    computed: {
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