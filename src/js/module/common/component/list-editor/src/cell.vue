<template>
    <div ref="cell">
        <template v-if="renderType === 'normal'"><span v-html="row[column.key]"></span></template>
        <Cell
            v-if="renderType === 'render'"
            :row="row"
            :column="column"
            :index="index"
            :render="column.render"></Cell>
    </div>
</template>
<script>
    import Cell from './expand';

    export default {
        name: 'TableCell',
        components: { Cell },
        props: {
            row: Object,
            column: Object,
            index: Number
        },
        data() {
            return {
                renderType: ''
            };
        },
        methods: {},
        created() {
            if (this.column.render) {
                this.renderType = 'render';
            } else {
                this.renderType = 'normal';
            }
        },
        mounted() {}
    };
</script>
