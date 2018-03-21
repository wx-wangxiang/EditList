export default {
    name: 'TableExpand',
    functional: true,
    props: {
        row: Object,
        index: Number,
        component: Object,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const component = ctx.props.component;
        const Component = h(component.name, {
            props: Object.assign({
                _row: ctx.props.row,
                _column: ctx.props.column,
                _index: ctx.props.index
            }, component.props)
        });

        return Component;
    }/*,
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };

        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
    }*/
};
