<template>
    <div>
        <input :value="_row[_column.key]" type="text" class="form-control input-sm" @input="inputHandler($event.target.value)">
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            _index: Number,
            _row: Object,
            _column: {
                type: Object,
                default: null
            }
        },
        data() {
            return {};
        },
        methods: {
            inputHandler(val) {
                this.$parent.$emit('listHandler', {
                    _index: this._index,
                    _key: this._column.key,
                    val
                });
            }
        }
    };
</script>
