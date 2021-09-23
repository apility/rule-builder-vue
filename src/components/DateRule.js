import { makeRule } from '../utilities.js'

import RuleWidget from './RuleWidget.vue'
import AddRule from './AddRule.vue'

const DateRangeRule = async () => await import('./rules/DateRangeRule.vue')
const DayOfWeekRule = async () => await import('./rules/DayOfWeekRule.vue')
const GroupRule = async () => await import('./rules/GroupRule.vue')
const NotRule = async () => await import('./rules/NotRule.vue')
const RecurringRule = async () => await import('./rules/RecurringRule.vue')

const components = {
    dateRange: DateRangeRule,
    dayOfWeek: DayOfWeekRule,
    group: GroupRule,
    not: NotRule,
    recurring: RecurringRule
}

export default {
    functional: true,

    name: 'DateRule',

    render (h, { props, listeners }) {
        const { value = {} } = props
        const { name = null, type = null } = value || {}

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
                        removeable: props.removeable === undefined ? true : props.removeable,
                        root: props.level === 0,
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