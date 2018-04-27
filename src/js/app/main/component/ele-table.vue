<template>
    <div class="container-fluid">
        <edit-list :data="tableData">
            <edit-list-column
                type="index"
                :index="indexHandler">
            </edit-list-column>
            <edit-list-column 
                prop="date"
                label="日期"
                width="180"
                :formatter="dateHandler">
            </edit-list-column>
            <edit-list-column 
                prop="name"
                label="姓名"
                width="180">
            </edit-list-column>
            <edit-list-column
                prop="address"
                label="地址"
                width="460">
                <template scope="scope">
                    <span class="text-primary">{{scope.row.address}}</span>
                </template>
            </edit-list-column>
            <edit-list-column
                label="操作"
                width="180">
                <template scope="scope">
                    <button class="btn btn-default btn-primary btn-xs" type="button">
                        <i class="glyphicon glyphicon-edit"></i> 编辑
                    </button>
                </template>
            </edit-list-column>
        </edit-list>
    </div>
</template>
<script type="text/javascript">
    import EditList from 'component/edit-list-ele';
    import EditListColumn from 'component/edit-list-ele/src/table-column';
    export default {
        components: { EditList, EditListColumn },
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            };
        },
        methods: {
            dateHandler(row, column, val) {
                //const reg = new RegExp('(\\d+)\\-(\\d+)-(\\d+)', 'g');
                const regExp = /(\d+)\-(\d+)\-(\d+)/g;

                return val.replace(regExp, '$1年$2月$3日');
            },
            indexHandler(index) {
                return index * 2;
            }
        }
    };
</script>
