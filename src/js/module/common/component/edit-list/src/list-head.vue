<template>
    <table cellspacing="0" cellpadding="0" border="0">
        <thead>
            <tr>
                <th v-for="(index, column) in columns">
                    <template v-if="column.type === 'selection'">
                        <Checkbox :value="isSelectAll" @on-change="selectAll"></Checkbox>
                    </template>
                    <span v-else>{{column.title}}</span>
                </th>
            </tr>
        </thead>
    </table>
</template>
<script>
    import CheckboxGroup from '../checkbox/checkbox-group.vue';
    import Checkbox from '../checkbox/checkbox.vue';
    import Poptip from '../poptip/poptip.vue';
    import iButton from '../button/button.vue';
    import Mixin from './mixin';
    import { deepCopy } from '../../utils/assist';

    export default {
        mixins: [ Mixin ],
        components: { CheckboxGroup, Checkbox, Poptip, iButton },
        props: {
            prefixCls: String,
            style: Object,
            columns: Array,
            objData: Object,
            data: Array,    // rebuildData
            columnsWidth: Object,
            fixed: {
                type: [Boolean, String],
                default: false
            }
        },
        computed: {
            isSelectAll () {
                let isSelectAll = true;

                for (let i = 0; i < this.data.length; i++) {
                    if (!this.objData[this.data[i]._index]._isChecked) {
                        isSelectAll = false;
                        break;
                    }
                }

                return isSelectAll;
            }
        },
        methods: {
            cellClasses (column) {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')
                    }
                ]
            },
            itemClasses (column, item) {
                return [
                    `${this.prefixCls}-filter-select-item`,
                    {
                        [`${this.prefixCls}-filter-select-item-selected`]: column._filterChecked[0] === item.value
                    }
                ]
            },
            itemAllClasses (column) {
                return [
                    `${this.prefixCls}-filter-select-item`,
                    {
                        [`${this.prefixCls}-filter-select-item-selected`]: !column._filterChecked.length
                    }
                ]
            },
            renderHeader (column, $index) {
                if ('renderHeader' in this.columns[$index]) {
                    return this.columns[$index].renderHeader(column, $index);
                } else {
                    return column.title || '#';
                }
            },
            selectAll () {
                const status = !this.isSelectAll;
                this.$parent.selectAll(status);
            },
            handleSort (index, type) {
                if (this.columns[index]._sortType === type) {
                    type = 'normal';
                }
                this.$parent.handleSort(index, type);
            },
            handleFilter (index) {
                this.$parent.handleFilter(index);
            },
            handleSelect (index, value) {
                this.$parent.handleFilterSelect(index, value);
            },
            handleReset (index) {
                this.$parent.handleFilterReset(index);
            },
            handleFilterHide (index) {
                this.$parent.handleFilterHide(index);
            }
        }
    }
</script>