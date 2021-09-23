<template functional>
    <div class="RuleWidget card mb-3">
        <div class="card-header handle">
            <div class="d-flex justify-content-between">
                <template v-if="props.name">
                    <span class="me-1">
                        {{ props.name }}
                    </span>
                </template>
                <template>
                    <i>
                        ({{ props.type }})
                    </i>
                </template>
                <button
                    v-if="props.removeable"
                    class="ms-auto btn-close"
                    @click="listeners['delete'](null)"
                />
            </div>
        </div>
    
        <div class="card-bordy p-3">
            <div class="form-group mb-3">
                <label class="mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    :value="props.name"
                    placeholder="Rule name (optional)"
                    class="form-control"
                    @input="$event => listeners['input']($event.target.value)"
                >
            </div>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    functional: true,

    name: 'RuleWidget',

    props: {
        name: [String, null],
        type: [String, null],
        root: Boolean,
        removeable: Boolean,
    }
}
</script>

<style lang="scss">
.RuleWidget {
    .ghost {
        opacity: 0;
    }
}
</style>