<template>
    <div class="RuleBuilder_AddRule d-flex">
        <div class="ms-auto">
            <div class="d-flex">
                <div
                    v-click-outside="() => showDropdown = false"
                    class="me-2"
                >
                    <button
                        :disabled="disabled"
                        @click="showDropdown = !showDropdown"
                        class="btn btn-primary dropdown-toggle"
                    >
                        + Add rule
                    </button>

                    <div 
                        v-if="!disabled && showDropdown"
                        class="card p-1 position-absolute shadow-sm"
                    >
                        <ul class="nav flex-column">
                            <li
                                v-for="rule in rules"
                                :key="rule.type"
                                class="ms-1 nav-item"
                            >
                                <a
                                    class="nav-link"
                                    href="#"
                                    @click="add(rule.type)"
                                >
                                    {{ rule.label }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <button
                    :disabled="disabled"
                    class="btn btn-primary"
                    @click="add('group')"
                >
                    + Add group
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

import rules from '../config/rules.js'
import { makeRule } from '../utilities.js'

export default {
    name: 'AddRule',

    directives: {
        ClickOutside
    },

    props: {
        disabled: Boolean
    },

    data: () => ({
        showDropdown: false,
        rules: rules.filter(rule => !rule.hasChildren),
    }),

    methods: {
        add(rule) {
            this.showDropdown = false
            this.$emit('add', makeRule(rule))
        }
    }
}
</script>