<template>
    <div>
        <input :value="true" type="text" class="form-control input-sm" @input="inputHandler($event.target.value)">
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {};
        },
        methods: {
            inputHandler(val) {
                this.$parent.$emit('listHandler', val);
            }
        }
    };
</script>
