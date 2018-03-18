export default {
    name: 'TableExpand',
    functional: true,
    props: {
        row: Object,
        index: Number,
        render: Function,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        console.log(ctx);
        const ComponentName = 'BsInput'; //ctx.props.column.component.name;
        const Component = h(ComponentName);

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
