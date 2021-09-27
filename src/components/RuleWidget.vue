<template functional>
    <div
        class="RuleBuilder_Widget card mb-3 shadow"
        v-bind="data.attrs"
    >
        <div
            class="RuleBuilder_Widget_Header card-header handle"
            v-bind="data.attrs"
        >
            <div class="d-flex justify-content-between align-items-center">
                <template v-if="props.name">
                    <span class="me-1">
                        <strong>{{ props.name }}</strong>
                    </span>
                </template>
                <template>
                    <i>
                        ({{ props.type }})
                    </i>
                </template>
                <div
                    v-if="!props.readOnly"
                    class="ms-auto d-flex"
                >
                    <button
                        class="btn"
                        title="Embed in group"
                        @click="listeners['wrap'](null)"
                    >
                        <i class="bi bi-box-arrow-in-down-right"></i>
                    </button>
                    <button
                        class="btn"
                        title="Delete rule"
                        @click="listeners['delete'](null)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    
        <div class="RuleBuilder_Widget_Body card-body bg-light bg-primary">
            <div class="form-group mb-3">
                <label class="mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    :value="props.name"
                    placeholder="Rule name"
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
        id: [String, null],
        name: [String, null],
        type: [String, null],
        root: Boolean,
        readOnly: Boolean,
        collapsed: Boolean,
    }
}
</script>

<style lang="scss">
.RuleBuilder {
    &_Widget {
        .ghost {
            opacity: 0;
        }
    }
}
</style>