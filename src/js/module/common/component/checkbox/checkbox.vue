<template>
    <!-- <div class="checkbox">
        <label>
            <input
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change">
        </label>
    </div> -->
    <div class="ct-checkbox-wrapper">
        <span class="ct-checkbox" @click="selected('region', item)" :class="{'ct-checkbox-checked': (item.state === 1 || item.state === 3), 'ct-checkbox-indeterminate': item.state === 2}">
            <span class="ct-checkbox-inner"></span>
            <input type="checkbox" class="ct-checkbox-input" value="on">
        </span>
        <span @click="change('region',item.Name)">{{item.Name}}</span>
    </div>
</template>
<script>
    export default {
        name: 'Checkbox',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: [String, Number, Boolean]
            }
        },
        data() {
            return {
                currentValue: this.value
            };
        },
        mounted() {
            this.updateModel();
        },
        methods: {
            change(event) {
                if (!this.disabled) {
                    const checked = event.target.checked;

                    this.currentValue = checked;
                    this.$emit('input', checked);
                    this.$emit('on-change', checked);
                }
            },
            updateModel() {
                this.currentValue = this.value;
            }
        },
        watch: {
            value() {
                this.updateModel();
            }
        }
    };
</script>
<style type="text/css">
    .ct-checkbox {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;
    }
    .ct-checkbox-wrapper:hover .ct-checkbox .ct-checkbox-inner,
    .ct-checkbox:hover .ct-checkbox-inner,
    .ct-checkbox-focused .ct-checkbox-inner {
        border-color: #108ee9;
    }
    .ct-checkbox-wrapper:hover span{
        color: #2db7f5;
    }
    .ct-checkbox-inner {
        position: relative;
        top: 0;
        left: 0;
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        background-color: #fff;
        -webkit-transition: all .3s;
        transition: all .3s;
    }
    .ct-checkbox-inner:after {
        -webkit-transform: rotate(45deg) scale(0);
            -ms-transform: rotate(45deg) scale(0);
                transform: rotate(45deg) scale(0);
        position: absolute;
        left: 4px;
        top: 1px;
        display: table;
        width: 5px;
        height: 8px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        content: ' ';
        -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
    }
    .ct-checkbox-input {
        position: absolute;
        left: 0;
        z-index: 1;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
    .ct-checkbox-indeterminate .ct-checkbox-inner:after {
        content: ' ';
        -webkit-transform: scale(1);
            -ms-transform: scale(1);
                transform: scale(1);
        position: absolute;
        left: 2px;
        top: 5px;
        width: 8px;
        height: 1px;
    }
    .ct-checkbox-checked .ct-checkbox-inner:after {
        -webkit-transform: rotate(45deg) scale(1);
            -ms-transform: rotate(45deg) scale(1);
                transform: rotate(45deg) scale(1);
        position: absolute;
        left: 4px;
        top: 1px;
        display: table;
        width: 5px;
        height: 8px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        content: ' ';
        -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    }
    .ct-checkbox-checked .ct-checkbox-inner,
    .ct-checkbox-indeterminate .ct-checkbox-inner {
        background-color: #108ee9;
        border-color: #108ee9;
    }
    .ct-checkbox-disabled.ct-checkbox-checked .ct-checkbox-inner:after {
        -webkit-animation-name: none;
                animation-name: none;
        border-color: rgba(0, 0, 0, 0.25);
    }
    .ct-checkbox-disabled .ct-checkbox-inner {
        border-color: #d9d9d9 !important;
        background-color: #f3f3f3;
    }
    .ct-checkbox-disabled .ct-checkbox-inner:after {
        -webkit-animation-name: none;
                animation-name: none;
        border-color: #f3f3f3;
    }
    .ct-checkbox-disabled + span {
        color: rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
    }
    .ct-checkbox-wrapper {
        padding-left: 20px;
        cursor: pointer;
        font-size: 12px;
        display: inline-block;
        color: rgba(0, 0, 0, 0.65);
    }
    .ct-checkbox-on {
        color: #2db7f5;
    }
    .ct-checkbox-wrapper:not(:last-child) {
        margin-right: 8px;
    }
    .ct-checkbox-wrapper + span,
    .ct-checkbox + span {
        padding-left: 8px;
        padding-right: 8px;
    }
    .ct-checkbox-group {
        font-size: 12px;
    }
    .ct-checkbox-group-item {
        display: inline-block;
    }
    @media \0screen {
        .ct-checkbox-checked .ct-checkbox-inner:before,
        .ct-checkbox-checked .ct-checkbox-inner:after {
            font-family: 'iconfont';
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: "\E632";
            font-weight: bold;
            font-size: 8px;
            border: 0;
            color: #fff;
            left: 2px;
            top: 3px;
            position: absolute;
        }
    }
</style>
