<template>
    <div ref="cell">
        <template v-if="renderType === 'normal'"><span v-html="row[column.key]"></span></template>
        <template v-if="renderType === 'selection'">
            <Checkbox :value="checked" @on-change="toggleSelect" :disabled="disabled"></Checkbox>
        </template>
        <Cell
            v-if="renderType === 'component'"
            :row="row"
            :column="column"
            :index="index"
            :component="column.component"></Cell>
    </div>
</template>
<script>
    import Cell from './expand';
    import Checkbox from 'component/checkbox';

    export default {
        name: 'TableCell',
        components: { Cell, Checkbox },
        props: {
            row: Object,
            column: Object,
            index: Number,
            checked: Boolean,
            disabled: Boolean
        },
        data() {
            return {
                renderType: ''
            };
        },
        methods: {
            toggleSelect() {
                this.$parent.toggleSelect(this.index);
            }
        },
        created() {
            if (this.column.component) {
                this.renderType = 'component';
            } else if (this.column.type === 'selection') {
                this.renderType = 'selection';
            } else {
                this.renderType = 'normal';
            }
        },
        mounted() {}
    };
</script>
