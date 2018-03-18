<template>
    <table class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
        <thead>
            <tr>
                <th v-for="column in columns">
                    {{column.title}}
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(row, index) in rebuildData">
                <tr>
                    <td v-for="column in columns">
                        <Cell @listHandler="cellHandler"
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
        name: 'list',
        components: { Cell },
        props: {
            columns: Array,
            data: Array
        },
        data() {
            return {
                rebuildData: []
            };
        },
        computed: {},
        created() {
            console.log(this.data);
            this.rebuildData = this.makeData();
        },
        methods: {
            cellHandler(val) {
                this.$emit('listHandler', val);
            },
            makeData() {
                //深拷贝
                const data = JSON.parse(JSON.stringify(({}, this.data)));

                data.forEach(function(row, index) {
                    row._index = index;
                });
                return data;
            }
        },
        watch: {
            data: {
                handler() {
                    this.rebuildData = this.makeData();
                }/*,
                deep: true*/ //加上deep: true 后输入的时候出发input事件时，会失去焦点
            }
        }
    };
</script>
