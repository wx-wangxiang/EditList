<!-- 编辑组组件 -->
<template>
    <div>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>组名</th>
                    <th>组在客户端的显示位</th>
                    <th>顺序</th>
                    <th>操作</th>
                </tr>
                <!-- <tr>
                    <th v-for="column in columns">
                        {{column.title}}
                    </th>
                </tr> -->
            </thead>
            <tbody>
                <tr v-for="(item, index) in orderedPropsGroups">
                    <td v-for="column in columns">
                        <template v-if="column.type === 'select'">
                            <input class="form-control" :type="column.type" :name="column.prop" v-model="item[column.prop]">
                        </template>
                        <template v-else>
                            <select class="form-control" v-model="item[column.prop]">
                                <option v-for="opt in column.opts" :value="opt.value">{{opt.label}}</option>
                            </select>
                        </template>
                    </td>
                    <td>
                        <input class="form-control" type="text" name="GroupName" v-model="item.GroupName">
                    </td>
                    <td>
                        <select class="form-control" v-model="item.GroupType">
                            <option :value="1">大厅商城</option>
                            <option :value="2">大厅主页</option>
                            <option :value="3">游戏中</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-xs btn-primary" type="button" :disabled="index === 0 || orderedPropsGroups.length === 1" @click="reSetOrder('up', item.GroupOrder, index)"><i class="glyphicon glyphicon-arrow-up"></i></button>
                        <button class="btn btn-xs btn-primary" type="button" :disabled="index === (orderedPropsGroups.length - 1) || orderedPropsGroups.length === 1" @click="reSetOrder('down', item.GroupOrder, index)"><i class="glyphicon glyphicon-arrow-down"></i></button>
                    </td>
                    <td>
                        <button class="btn btn-xs btn-success" type="button" @click="addGroup"><i class="glyphicon glyphicon-plus">添加</i></button>
                        <button class="btn btn-xs btn-danger" type="button" :disabled="index === 0" @click="removeGroup(index)"><i class="glyphicon glyphicon-remove">删除</i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <submit-tip :submit-info="submitInfo" :submit-status="submitStatus"></submit-tip>
    </div>
</template>
<script type="text/javascript">
    import SubmitTip from '../submitTip/submitTip';
    import _ from 'lodash';

    export default {
        props: {
            list: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                PropsGroups: this.list,
                submitInfo: '',
                submitStatus: true
            };
        },
        computed: {
            orderedPropsGroups: function() {
                return _.orderBy(this.PropsGroups, 'GroupOrder');
            }
        },
        components: { SubmitTip },
        methods: {
            init() {},
            show() {
                $('#propsGroupsEdit').modal('show');
            },
            confirm() {
                if (this.verify()) {
                    this.submitReset();
                    this.propsGroupsUpdate({val: this.orderedPropsGroups});
                    this.close();
                } else {
                    this.submitHandle(false, '请先将组填写完整！');
                }
            },
            reset() {
                this.PropsGroups = JSON.parse(JSON.stringify(this.list));
                this.submitReset();
            },
            close() {
                $('#propsGroupsEdit').modal('hide');
                this.reset();
            },
            //列表中的上下移功能
            reSetOrder(method, groupOrder, index) {
                const preItem = this.orderedPropsGroups[index - 1] || {};
                const curItem = this.orderedPropsGroups[index];
                const nextItem = this.orderedPropsGroups[index + 1] || {};

                this.changeOrder(method, groupOrder, {preItem, curItem, nextItem});
            },
            changeOrder(method, groupOrder, items) {
                if (method === 'up') {
                    items.curItem.GroupOrder = groupOrder - 1;
                    items.preItem.GroupOrder = groupOrder;
                } else {
                    items.curItem.GroupOrder = groupOrder + 1;
                    items.nextItem.GroupOrder = groupOrder;
                }
            },
            //检验组是否填写完整(主要是检查组名，其他两项都有默认值的)
            verify() {
                return this.orderedPropsGroups.every(function(item){
                    return item.GroupName !== '';
                });
            },
            submitHandle(status, info) {
                this.submitStatus = status;
                this.submitInfo = info;
            },
            submitReset() {
                if (!this.submitStatus) {
                    this.submitHandle(true, '');
                }
            },
            addGroup() {
                if (this.verify()) {
                    this.submitReset();

                    const propsGroup = {
                        GroupID: 0,
                        GroupName: '',
                        GroupType: 1,
                        GroupOrder: this.orderedPropsGroups.length,
                        PackageProps: []
                    };

                    this.PropsGroups.push(propsGroup);
                } else {
                    this.submitHandle(false, '请先将组填写完整！');
                }
            },
            removeGroup(index) {
                if (this.orderedPropsGroups[index].PackageProps.length) {
                    var miniMsg = new MiniMsg({
                        content: '该组中尚有商品，不可被删除',
                        type: 'error'
                    });

                    miniMsg.animation();
                    return false;
                }
                this.PropsGroups.splice(index, 1);
                if (this.verify()) {
                    this.submitReset();
                }
                return false;
            }
        },
        mounted() {
            console.log('mounted');
        },
        watch: {
            list: {
                handler(newVal) {
                    console.log(newVal);
                    if (newVal.length === 0) {
                        this.PropsGroups = [{
                            GroupID: '',
                            GroupName: '',
                            GroupOrder: 0,
                            GroupType: 1,
                            PackageProps: []
                        }];
                    } else {
                        //深拷贝，也可用Object.assign()
                        this.PropsGroups = JSON.parse(JSON.stringify(newVal));
                    }
                },
                deep: true
            }
        }
    };
</script>
