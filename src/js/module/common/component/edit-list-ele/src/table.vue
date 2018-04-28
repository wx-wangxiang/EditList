<template>
    <div class="panel panel-default" :style="{
                width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
            }">
        <!-- 使用插槽，初始化 table-column 组件,将列组件中的参数传入store -->
        <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
        <table-header
            ref="tabelHeader" 
            :store="store"
            :style="{
                width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
            }"></table-header>
        <table-body 
            :store="store"
            :style="{
                width: bodyWidth
            }"></table-body>
    </div>
</template>
<script type="text/javascript">
    import debounce from 'throttle-debounce/debounce';
    import TableStore from './table-store';
    import TableLayout from './table-layout';
    import TableBody from './table-body';
    import TableHeader from './table-header';

    let tableIdSeed = 1;

    export default {
        name: 'EditTable',

        components: {
            TableHeader,
            TableBody
        },

        props: {
            data: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            rowKey: [String, Function],
            defaultExpandAll: Boolean,
            selectOnIndeterminate: {
                type: Boolean,
                default: true
            },
            // 表格是否自适应
            fit: {
                type: Boolean,
                default: true
            },
            spanMethod: Function
        },
        methods: {
            doLayout() {
                if (this.shouldUpdateHeight) {
                    this.layout.updateElsHeight();
                }
                this.layout.updateColumnsWidth();
            }
        },

        created() {
            this.tableId = 'el-table_' + tableIdSeed++;
            this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
        },

        computed: {
            shouldUpdateHeight() {
                return this.height ||
                    this.maxHeight ||
                    this.fixedColumns.length > 0 ||
                    this.rightFixedColumns.length > 0;
            },
            fixedColumns() {
                return this.store.states.fixedColumns;
            },
            rightFixedColumns() {
                return this.store.states.rightFixedColumns;
            },
            bodyWidth() {
                const { bodyWidth, scrollY, gutterWidth } = this.layout;

                return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
            },
            columns() {
                return this.store.states.columns;
            }
        },

        mounted() {
            //this.bindEvents();
            this.store.updateColumns();
            this.doLayout();

            this.resizeState = {
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight
            };

            // init filters
            this.store.states.columns.forEach(column => {
                if (column.filteredValue && column.filteredValue.length) {
                    this.store.commit('filterChange', {
                        column,
                        values: column.filteredValue,
                        silent: true
                    });
                }
            });

            this.$ready = true;
        },

        data() {
            const store = new TableStore(this, {
                rowKey: this.rowKey,
                defaultExpandAll: this.defaultExpandAll,
                selectOnIndeterminate: this.selectOnIndeterminate
            });
            const layout = new TableLayout({
                store,
                table: this,
                fit: this.fit,
                showHeader: this.showHeader
            });

            return {
                store,
                layout,
                isHidden: false,
                renderExpanded: null,
                resizeProxyVisible: false,
                resizeState: {
                    width: null,
                    height: null
                },
                // 是否拥有多级表头
                isGroup: false,
                scrollPosition: 'left'
            };
        },

        watch: {
            data: {
                immediate: true,
                handler(value) {
                    this.store.commit('setData', value);
                    if (this.$ready) {
                        this.$nextTick(() => {
                            this.doLayout();
                        });
                    }
                }
            }
        }
    };
</script>
