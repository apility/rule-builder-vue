<template>
    <div class="RuleBuilder_GroupRule">
        <div>
            <div class="form-group">
                <label class="mb-2">
                    Must match:
                </label>
                <select
                    class="form-select"
                    v-model="countType"
                >
                    <option value="all">All rules</option>
                    <option value="any">Any rule</option>
                    <option value="count">
                        Amount of rules
                    </option>
                </select>
                <div class="input-group mt-3">
                    <input
                        ref="value"
                        class="form-control"
                        :disabled="countType !== 'count'"
                        type="number"
                        :max="children.length"
                        v-model="count"
                    >
                    <span class="input-group-text">
                        rules
                    </span>
                </div>
            </div>
            <div class="form-group mt-3">
                <label class="mb-2">
                    Rules:
                </label>
                <draggable
                    v-model="children"
                    handle=".handle"
                    ghost-class="ghost"
                    @start="drag=true"
                    @end="drag=false"
                    group="GroupRule"
                >
                    <date-rule
                        v-for="(rule, i) in children"
                        :key="i" 
                        v-model="children[i]"
                        :depth="depth + 1"
                        :max-depth="maxDepth"
                        :is-collapsed="isCollapsed"
                        @toggle-collapsed="$emit('toggle', rule.id)"
                        @remove="remove(rule)"
                    />
                </draggable>
                <add-rule
                    @add="add"
                    :disabled="depth >= maxDepth"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable'
import AddRule from '../AddRule.vue'
import DateRule from '../DateRule.js'
import { makeRule } from '../../utilities.js'

export default {
    name: 'GroupRule',

    components: {
        Draggable,
        AddRule,
        DateRule,
    },

    props: {
        value: {
            type: Object,
            default: () => makeRule('group')
        },
        isCollapsed: [Function, null],
        depth: Number,
        maxDepth: Number,
    },

    data: () => ({
        countValue: 0,
    }),

    computed: {
        children: {
            get () {
                return this.value.children
            },

            set (children) {
                this.$emit('input', {
                    ...this.value,
                    children
                })
            }
        },

        countType: {
            get () {
                if (!['all', 'any'].includes(this.value.count)) {
                    return 'count'
                }

                return this.value.count
            },

            set (count) {
                if (!['all', 'any'].includes(count)) {
                    count = parseInt(count, 10)
                }

                this.$emit('input', {
                    ...this.value,
                    count
                })
            }
        },

        count: {
            get () {
                let count = this.value.count || 0
                count = parseInt(count, 10)
                count = !isFinite(count) || isNaN(count) ? 0 : count

                return count
            },

            set (count) {
                if (!['all', 'any'].includes(count)) {
                    count = parseInt(count, 10)
                    count = !isFinite(count) || isNaN(count) ? 0 : count
                    count = count > this.children.length ? this.children.length : count
                    this.$emit('input', {
                        ...this.value,
                        count
                    })
                }
            }
        },
    },

    methods: {
        add(rule) {
            this.children = [
                ...this.children,
                rule
            ]
        },

        remove(rule) {
            this.children = this.children.filter(child => child !== rule)
        },
    }
}
</script>