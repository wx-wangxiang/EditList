<template>
    <div class="container-fluid">
        <list-editor @listHandler="getOperate" width="550" border :columns="columns" :data="data"></list-editor>
        <button class="btn btn-primary btn-sm" @click="submit">确定</button>
    </div>
</template>
<script>
import Vue from 'vue';

import listEditor from 'component/list-editor';
import bsInput from 'component/input';

Vue.component('BsInput', bsInput);

export default {
    components: {listEditor},
    data() {
        return {
            columns: [
                {
                    title: '姓名',
                    key: 'name',
                    component: {
                        name: 'BsInput'
                    },
                    render: (h, params) => {
                        return h('input', {
                            class: {
                                'form-control': true,
                                'input-sm': true
                            },
                            attrs: {
                                value: params.row.name
                            },
                            on: {
                                input: (event) => {
                                    this.data[params.row._index].name = event.target.value;
                                }
                            }
                        });
                    }
                }, {
                    title: '年龄',
                    key: 'age',
                    component: {
                        name: 'BsInput'
                    },
                    render: (h, params) => {
                        return h('select', {
                            class: {
                                'form-control': true,
                                'input-sm': true
                            },
                            attrs: {
                                value: params.row.age
                            },
                            on: {
                                change: (event) => {
                                    this.data[params.row._index].age = event.target.value;
                                }
                            }
                        }, this.ages.map(function(item) {
                            if (parseInt(item.age) === parseInt(params.row.age)) {
                                return h('option', {
                                    attrs: {
                                        selected: 'selected'
                                    }
                                }, item.age);
                            }
                            return h('option', item.age);
                        }));
                    }
                }, {
                    title: '地址',
                    key: 'address',
                    component: {
                        name: 'BsInput'
                    },
                    render: (h, params) => {
                        return h('input', {
                            class: {
                                'form-control': true,
                                'input-sm': true
                            },
                            attrs: {
                                value: params.row.address
                            },
                            on: {
                                input: (event) => {
                                    this.data[params.row._index].address = event.target.value;
                                }
                            }
                        });
                    }
                }, {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    component: {
                        name: 'BsInput'
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                class: {
                                    'btn btn-primary btn-xs': true
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.add(params);
                                    }
                                }
                            }, '添加'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                class: {
                                    'btn btn-danger btn-xs': true
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
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
