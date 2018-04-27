<template>
    <div>
        <h1>ele</h1>
        <ele-demo></ele-demo>
        <h1>iview</h1>
        <iview-demo></iview-demo>
    </div>
</template>
<script type="text/javascript">
    import EleDemo from './component/ele-table.vue';
    import IviewDemo from './component/iview-table.vue';

    export default {
        components: { EleDemo, IviewDemo },
        data() {
            return {};
        }
    };
</script>
