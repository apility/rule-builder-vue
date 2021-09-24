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
                @remove="remove"
            />
        </div>
    </div>
</template>

<script>
import { makeRule } from '../../utilities.js'

export default {
    name: 'NotRule',

    components: {
        DateRule: () => import('../DateRule.js')
    },

    props: {
        value: {
            type: Object,
            default: () => makeRule('not')
        },
        depth: Number,
        maxDepth: Number,
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