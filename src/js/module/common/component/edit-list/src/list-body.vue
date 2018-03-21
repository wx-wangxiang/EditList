<template>
    <table class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
        <tbody>
            <template v-for="(row, index) in data">
                <tr>
                    <td v-for="column in columns">
                        <Cell
                            :row="row"
                            :key="row"
                            :column="column"
                            :index="row._index"
                        ></Cell>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>
    // todo :key="row"
    import Cell from './cell.vue';

    export default {
        name: 'listBody',
        components: { Cell },
        props: {
            columns: Array,
            data: Array
        },
        data() {
            return {};
        },
        computed: {},
        methods: {}
    };
</script>
