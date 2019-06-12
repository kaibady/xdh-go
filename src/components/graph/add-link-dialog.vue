<template>
  <inner-dialog title="填写关系名称"
                width="450px"
                height="200px"
                :visible.sync="dlgShow"
                @on-close="closeEvent"
  >
    <el-form :model="model" size="mini" inline style="margin-top:30px;">
      <el-form-item label="关系名称" prop="title" :label-width="'120px'">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button size="mini" type="primary" @click="save">保存</el-button>
    </el-form>
  </inner-dialog>
</template>
<script>
  import InnerDialog from '@/components/inner-dialog'
  import {clone} from '@/utils/convert'

  export default {
    components: {
      InnerDialog
    },
    data() {
      return {
        dlgpromise: null,
        dlgShow: false,
        confirmed: false,
        model: {
          name: ''
        }
      }
    },
    methods: {
      save() {
        this.dlgpromise.resolve(clone(this.model))
        this.confirmed = true;
        this.dlgShow = false;
      },
      showDialog() {
        this.dlgShow = true;
        this.model = {name: ''}
        this.confirmed = false;
        return new Promise((resolve, reject) => {
          this.dlgpromise = {resolve, reject}
        })
      },
      closeEvent() {
        if(!this.confirmed) {
          this.dlgpromise.reject()
        }
      }
    }
  }
</script>
