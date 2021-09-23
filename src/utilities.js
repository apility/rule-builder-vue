import { v4 as uuid } from 'uuid'
import rules from './config/rules.js'

export function makeRule(type) {
    const ruleDefinition = rules.find(rule => rule.type === type)

    if (ruleDefinition) {
        return {
            id: uuid(),
            type,
            name: null,
            ...ruleDefinition.template
        }
    }

    throw new TypeError(`Invalid rule type: ${type}`)
}