import { getRowIdentity } from './util';
import LayoutObserver from './layout-observer';

export default {
    name: 'EditTableBody',

    mixins: [LayoutObserver],
    
    props: {
        store: {
            required: true
        },
        context: {}
    },

    render(h) {
        const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index));

        return (
            <table
                class="table"
                cellspacing="0"
                cellpadding="0"
                border="0">
                <colgroup>
                    {
                        this._l(this.columns, column => <col name={ column.id } />)
                    }
                </colgroup>
                <tbody>
                    {
                        this._l(this.data, (row, $index) =>
                            [<tr key={ this.table.rowKey ? this.getKeyOfRow(row, $index) : $index }>
                                {
                                    this._l(this.columns, (column, cellIndex) => {
                                        const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);

                                        if (!rowspan || !colspan) {
                                            return '';
                                        }
                                        return (
                                            <td>
                                                {
                                                    column.renderCell.call(
                                                        this._renderProxy,
                                                        h,
                                                        {
                                                            row,
                                                            column,
                                                            $index,
                                                            store: this.store,
                                                            _self: this.context || this.table.$vnode.context
                                                        },
                                                        columnsHidden[cellIndex])
                                                }
                                            </td>
                                        );
                                    })
                                }
                            </tr>]
                        )
                    }
                </tbody>
            </table>
        );
    },

    computed: {
        table() {
            return this.$parent;
        },
        data() {
            return this.store.states.data;
        },
        columnsCount() {
            return this.store.states.columns.length;
        },
        columns() {
            return this.store.states.columns;
        }
    },

    methods: {
        getKeyOfRow(row, index) {
            const rowKey = this.table.rowKey;

            if (rowKey) {
                return getRowIdentity(row, rowKey);
            }
            return index;
        },
        isColumnHidden(index) {
            if (this.fixed === true || this.fixed === 'left') {
                return index >= this.leftFixedLeafCount;
            } else if (this.fixed === 'right') {
                return index < this.columnsCount - this.rightFixedLeafCount;
            }
            return index < this.leftFixedLeafCount || index >= this.columnsCount - this.rightFixedLeafCount;
        },
        getSpan(row, column, rowIndex, columnIndex) {
            let rowspan = 1;
            let colspan = 1;
            const fn = this.table.spanMethod;
            
            if (typeof fn === 'function') {
                const result = fn({
                    row,
                    column,
                    rowIndex,
                    columnIndex
                });

                if (Array.isArray(result)) {
                    rowspan = result[0];
                    colspan = result[1];
                } else if (typeof result === 'object') {
                    rowspan = result.rowspan;
                    colspan = result.colspan;
                }
            }

            return {
                rowspan,
                colspan
            };
        }
    }
};
