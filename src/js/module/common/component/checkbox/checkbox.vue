<template>
    <div class="checkbox">
        <label>
            <input
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change">
        </label>
    </div>
</template>
<script>
    export default {
        name: 'Checkbox',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: [String, Number, Boolean]
            }
        },
        data() {
            return {
                currentValue: this.value
            };
        },
        mounted() {
            this.updateModel();
        },
        methods: {
            change(event) {
                if (!this.disabled) {
                    const checked = event.target.checked;

                    this.currentValue = checked;
                    this.$emit('input', checked);
                    this.$emit('on-change', checked);
                }
            },
            updateModel() {
                this.currentValue = this.value;
            }
        },
        watch: {
            value() {
                this.updateModel();
            }
        }
    };
</script>
