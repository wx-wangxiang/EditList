<template>
    <div class="form-group form-group-sm" v-if="!!submitInfo">
        <div class="col-lg-4 col-sm-6 col-lg-offset-2 col-sm-offset-2" v-if="submitForm">
            <div class="alert form-control" :class="[submitStatus ? 'alert-success' : 'alert-danger']">
                <i class="glyphicon glyphicon-info-sign"></i>  <span v-html="submitInfo"></span>
            </div>
        </div>
        <div class="text-center alert form-control" :class="[submitStatus ? 'alert-success' : 'alert-danger']" v-else>
            <i class="glyphicon glyphicon-info-sign"></i><span v-html="submitInfo"></span>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            //form参数：表示该组件是放在form中还是一般的submitTip
            submitForm: {
                type: Boolean,
                default: false
            },
            submitInfo: {
                type: String,
                default: ''
            },
            submitStatus: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {};
        }
    };
</script>
