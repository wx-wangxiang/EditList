<template>
    <table class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
        <thead>
            <tr>
                <th v-for="column in columns">
                    <template v-if="column.type === 'selection'">
                        <Checkbox :value="isSelectAll" @on-change="selectAll"></Checkbox>
                    </template>
                    <span v-else>{{column.title}}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(row, index) in oData">
                <tr>
                    <td v-for="column in columns">
                        <Cell @listHandler="cellHandler"
                            :row="row"
                            :key="row"
                            :column="column"
                            :index="row._index"
                            :checked="rowChecked(row._index)"
                            :disabled="rowDisabled(row._index)"
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
    import Checkbox from 'component/checkbox';

    export default {
        name: 'list',
        components: { Cell, Checkbox },
        props: {
            columns: Array,
            data: Array
        },
        data() {
            return {
                oData: []
            };
        },
        computed: {
            isSelectAll () {
                let isSelectAll = true;

                if (!this.data.length) isSelectAll = false;
                for (let i = 0; i < this.data.length; i++) {
                    if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
                        isSelectAll = false;
                        break;
                    }
                }

                return isSelectAll;
            }
        },
        created() {
            console.log(this.data);
            this.oData = this.makeData();
        },
        methods: {
            cellHandler(val) {
                this.$emit('listHandler', val);
            },
            rowChecked(_index) {
                return this.oData[_index] && this.oData[_index]._isChecked;
            },
            rowDisabled(_index){
                return this.oData[_index] && this.oData[_index]._isDisabled;
            },
            makeData() {
                const Data = [];
                //深拷贝
                const data = JSON.parse(JSON.stringify(this.data));

                data.forEach(function(row, index) {
                    const newRow = JSON.parse(JSON.stringify(row));

                    if (newRow._disabled) {
                        newRow._isDisabled = newRow._disabled;
                    } else {
                        newRow._isDisabled = false;
                    }
                    if (newRow._checked) {
                        newRow._isChecked = newRow._checked;
                    } else {
                        newRow._isChecked = false;
                    }
                    newRow._index = index;
                    Data[index] = newRow;
                });
                return Data;
            },
            selectAll() {
                const status = !this.isSelectAll;
                
                console.log(this.oData);
                for (const data of this.oData) {
                    console.log(data);
                    if (this.oData[data._index]._isDisabled) {
                        continue;
                    } else {
                        this.oData[data._index]._isChecked = status;
                    }
                }
                const selection = this.getSelection();

                if (status) {
                    this.$emit('on-select-all', selection);
                }
                this.$emit('on-selection-change', selection);
            },
            getSelection() {
                const selectionIndexes = [];

                for (const i in this.objData) {
                    if (this.objData[i]._isChecked) selectionIndexes.push(parseInt(i));
                }
                return JSON.parse(JSON.stringify(this.data.filter((data, index) => selectionIndexes.indexOf(index) > -1)));
            },
            toggleSelect(_index) {
                console.log(_index);
                let data = {};

                for (const i in this.oData) {
                    if (parseInt(i) === _index) {
                        data = this.oData[i];
                    }
                }
                const status = !data._isChecked;

                this.oData[_index]._isChecked = status;

                const selection = this.getSelection();

                if (status) {
                    this.$emit('on-select', selection, JSON.parse(JSON.stringify(this.data[_index])));
                }
                this.$emit('on-selection-change', selection);
            }
        },
        watch: {
            data: {
                handler() {
                    this.oData = this.makeData();
                }/*,
                deep: true*/ //加上deep: true 后输入的时候出发input事件时，会失去焦点
            }
        }
    };
</script>
