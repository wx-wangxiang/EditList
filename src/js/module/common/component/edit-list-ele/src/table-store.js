import { orderBy, getColumnById } from './util';

const sortData = (data, states) => {
    const sortingColumn = states.sortingColumn;

    if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
        return data;
    }
    return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};

const TableStore = function(table, initialState = {}) {
    if (!table) {
        throw new Error('Table is required.');
    }
    this.table = table;
    this.states = {
        rowKey: null,
        _columns: [],
        originColumns: [],
        columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,
        isComplex: false,
        filteredData: null,
        data: null,
        sortingColumn: null,
        sortProp: null,
        sortOrder: null,
        isAllSelected: false,
        selection: [],
        reserveSelection: false,
        selectable: null,
        currentRow: null,
        hoverRow: null,
        filters: {},
        expandRows: [],
        defaultExpandAll: false,
        selectOnIndeterminate: false
    };

    for (const prop in initialState) {
        if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
            this.states[prop] = initialState[prop];
        }
    }
};

TableStore.prototype.mutations = {
    setData(states, data) {
        //const dataInstanceChanged = states._data !== data;

        states._data = data;

        Object.keys(states.filters).forEach((columnId) => {
            const values = states.filters[columnId];

            if (!values || values.length === 0) return;
            const column = getColumnById(this.states, columnId);

            if (column && column.filterMethod) {
                data = data.filter((row) => {
                    return values.some(value => column.filterMethod.call(null, value, row, column));
                });
            }
        });

        states.filteredData = data;
        states.data = sortData(data || [], states);

        this.updateCurrentRow();

        /*if (!states.reserveSelection) {
            if (dataInstanceChanged) {
                this.clearSelection();
            } else {
                this.cleanSelection();
            }
            this.updateAllSelected();
        } else {
            const rowKey = states.rowKey;
            if (rowKey) {
                const selection = states.selection;
                const selectedMap = getKeysMap(selection, rowKey);

                states.data.forEach((row) => {
                    const rowId = getRowIdentity(row, rowKey);
                    const rowInfo = selectedMap[rowId];
                    if (rowInfo) {
                        selection[rowInfo.index] = row;
                    }
                });

                this.updateAllSelected();
            } else {
                console.warn('WARN: rowKey is required when reserve-selection is enabled.');
            }
        }

        const defaultExpandAll = states.defaultExpandAll;
        if (defaultExpandAll) {
            this.states.expandRows = (states.data || []).slice(0);
        }*/
    },
    insertColumn(states, column, index, parent) {
        let array = states._columns;

        if (parent) {
            array = parent.children;
            if (!array) array = parent.children = [];
        }

        if (typeof index !== 'undefined') {
            array.splice(index, 0, column);
        } else {
            array.push(column);
        }

        if (column.type === 'selection') {
            states.selectable = column.selectable;
            states.reserveSelection = column.reserveSelection;
        }

        if (this.table.$ready) {
            this.updateColumns(); // hack for dynamics insert column
            this.scheduleLayout();
        }
    }
};

// 弄平【列】
const doFlattenColumns = (columns) => {
    const result = [];

    columns.forEach((column) => {
        if (column.children) {
            result.push.apply(result, doFlattenColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
};

TableStore.prototype.updateColumns = function() {
    const states = this.states;
    const _columns = states._columns || [];

    states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left');
    states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right');

    if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
        _columns[0].fixed = true;
        states.fixedColumns.unshift(_columns[0]);
    }

    const notFixedColumns = _columns.filter(column => !column.fixed);

    states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

    const leafColumns = doFlattenColumns(notFixedColumns);
    const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
    const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

    states.leafColumnsLength = leafColumns.length;
    states.fixedLeafColumnsLength = fixedLeafColumns.length;
    states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

    states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
    states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};

TableStore.prototype.scheduleLayout = function(updateColumns) {
    if (updateColumns) {
        this.updateColumns();
    }
    this.table.debouncedUpdateLayout();
};

TableStore.prototype.updateCurrentRow = function() {
    const states = this.states;
    const table = this.table;
    const data = states.data || [];
    const oldCurrentRow = states.currentRow;

    if (data.indexOf(oldCurrentRow) === -1) {
        states.currentRow = null;

        if (states.currentRow !== oldCurrentRow) {
            table.$emit('current-change', null, oldCurrentRow);
        }
    }
};

TableStore.prototype.commit = function(name, ...args) {
    const mutations = this.mutations;

    if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args));
    } else {
        throw new Error(`Action not found: ${name}`);
    }
};

export default TableStore;
