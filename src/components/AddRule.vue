<template>
    <div class="d-flex">
        <div class="ms-auto">
            <div class="d-flex">
                <div class="dropdown me-3">
                    <button
                        class="btn btn-primary dropdown-toggle"
                        :disabled="disabled"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        + Add rule
                    </button>
                    <ul class="dropdown-menu">
                        <li
                            v-for="rule in rules"
                            :key="rule.type"
                        >
                            <a
                                class="dropdown-item"
                                href="#"
                                @click="add(rule.type)"
                            >
                                {{ rule.label }}
                            </a>
                        </li>
                    </ul>
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
import rules from '../config/rules.js'
import { makeRule } from '../utilities.js'

export default {
    name: 'AddRule',

    props: {
        disabled: Boolean
    },

    data: () => ({
        rules: rules.filter(rule => !rule.hasChildren),
    }),

    methods: {
        add(rule) {
            this.$emit('add', makeRule(rule));
        }
    }
}
</script>