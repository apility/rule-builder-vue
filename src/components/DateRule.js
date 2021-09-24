import { makeRule } from '../utilities.js'
import { v4 as uuid } from 'uuid'

import RuleWidget from './RuleWidget.vue'
import AddRule from './AddRule.vue'

const DateRangeRule = async () => await import('./rules/DateRangeRule.vue')
const DayOfWeekRule = async () => await import('./rules/DayOfWeekRule.vue')
const GroupRule = async () => await import('./rules/GroupRule.vue')
const NotRule = async () => await import('./rules/NotRule.vue')
const RecurringDateRangeRule = async () => await import('./rules/RecurringDateRangeRule.vue')

const components = {
    dateRange: DateRangeRule,
    dayOfWeek: DayOfWeekRule,
    group: GroupRule,
    not: NotRule,
    recurringDateRange: RecurringDateRangeRule
}

export default {
    functional: true,

    name: 'DateRule',

    render (h, { props, listeners }) {
        const { value = {} } = props
        const { name = null, type = null } = value || {}

        if (value && !value.id) {
            listeners['input']({
                ...value,
                id: uuid()
            })
        }

        if (props.value) {
            const component = h(components[type], {
                props,
                on: listeners,
            })

            return h(RuleWidget,
                {
                    props: {
                        name,
                        type,
                        readOnly: props.readOnly !== undefined ? props.removeable : false,
                        root: props.level === 0
                    },

                    on: {
                        input (name) {
                            listeners.input({
                                ...value,
                                name
                            })
                        },

                        wrap () {
                            listeners.input({
                                ...makeRule('group'),
                                children: [value]
                            })
                        },

                        delete () {
                            listeners.remove()
                        }
                    }
                },
                [component]
            )
        }

        return h(AddRule, {
            props: {
                disabled: props.depth >= props.maxDepth,
            },
            on: {
                add(rule) {
                    listeners.input(rule)
                }
            }
        })
    }
}