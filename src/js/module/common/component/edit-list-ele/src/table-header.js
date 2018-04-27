import LayoutObserver from './layout-observer';

const getAllColumns = (columns) => {
    const result = [];

    columns.forEach((column) => {
        if (column.children) {
            result.push(column);
            result.push.apply(result, getAllColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
};

const convertToRows = (originColumns) => {
    let maxLevel = 1;
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1;
            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }
        if (column.children) {
            let colSpan = 0;

            column.children.forEach((subColumn) => {
                traverse(subColumn, column);
                colSpan += subColumn.colSpan;
            });
            column.colSpan = colSpan;
        } else {
            column.colSpan = 1;
        }
    };

    originColumns.forEach((column) => {
        column.level = 1;
        traverse(column);
    });

    const rows = [];

    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    const allColumns = getAllColumns(originColumns);

    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowSpan = maxLevel - column.level + 1;
        } else {
            column.rowSpan = 1;
        }
        rows[column.level - 1].push(column);
    });

    return rows;
};

export default {
    name: 'TableHeader',
    
    mixins: [LayoutObserver],

    render(h) {
        const originColumns = this.store.states.originColumns;
        const columnRows = convertToRows(originColumns, this.columns);
        // 是否拥有多级表头
        const isGroup = columnRows.length > 1;

        if (isGroup) this.$parent.isGroup = true;
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
                    {
                        this.hasGutter ? <col name="gutter" /> : ''
                    }
                </colgroup>
                <thead class={ [{ 'is-group': isGroup, 'has-gutter': this.hasGutter }] }>
                  {
                    this._l(columnRows, (columns, rowIndex) =>
                      <tr
                        style={ this.getHeaderRowStyle(rowIndex) }
                        class={ this.getHeaderRowClass(rowIndex) }
                      >
                        {
                            this._l(columns, (column, cellIndex) =>
                                <th>
                                    <div>
                                        {
                                            column.renderHeader
                                            ? column.renderHeader.call(this._renderProxy, h, { column, $index: cellIndex, store: this.store, _self: this.$parent.$vnode.context })
                                            : column.label
                                        }
                                    </div>
                                </th>
                            )
                        }
                        {
                            this.hasGutter ? <th class="gutter"></th> : ''
                        }
                      </tr>
                    )
                  }
                </thead>
            </table>
        );
    },
    props: {
        fixed: String,
        store: {
            required: true
        },
        border: Boolean,
        defaultSort: {
            type: Object,
            default() {
                return {
                    prop: '',
                    order: ''
                };
            }
        }
    },
    computed: {
        table() {
            return this.$parent;
        },

        columns() {
            return this.store.states.columns;
        },

        hasGutter() {
            return false;
        }
    },
    methods: {
        getHeaderRowStyle(rowIndex) {
            console.log(rowIndex);
            return '';
        },
        getHeaderRowClass(rowIndex) {
            console.log(rowIndex);
            return '';
        }
    }
};
