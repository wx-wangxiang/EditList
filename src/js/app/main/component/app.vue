<template>
    <div class="container-fluid">
        <list-editor @listHandler="getOperate" width="550" border :columns="columns" :data="data"></list-editor>
        <button class="btn btn-primary btn-sm" @click="submit">确定</button>
    </div>
</template>
<script>
import Vue from 'vue';

import listEditor from 'component/edit-list';
import bsInput from 'component/input';

Vue.component('BsInput', bsInput);

export default {
    components: {listEditor},
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    component: {
                        name: 'BsInput'
                    }
                }, {
                    title: '年龄',
                    key: 'age',
                    component: {
                        name: 'BsInput',
                        props: {}
                    }
                }, {
                    title: '地址',
                    key: 'address',
                    component: {
                        name: 'BsInput'
                    }
                }, {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                }, {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                }, {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
            ],
            ages: [{
                age: 25
            }, {
                age: 18
            }, {
                age: 30
            }]
        };
    },
    methods: {
        changeList() {
            console.log(this);
        },
        getOperate(value) {
            console.log('operateInfo: ', value);
        },
        add(params) {
            console.log(this);
            console.log(params);
            this.data.push({
                name: '',
                age: '',
                address: ''
            });
        },
        remove(index) {
            this.data.splice(index, 1);
        },
        submit() {
            console.log(JSON.parse(JSON.stringify(this.data)));
        }
    }
};
</script>
