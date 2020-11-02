<template>
  <div>
    <div class="form-basic">
      <h5>流水核对</h5>
      <div class="content">
        <el-upload class="upload-demo" ref="upload" :action="uploadUrl" :auto-upload="true" :limit="1" :on-exceed="handleExceed" :file-list="fileList" accept=".xls,.xlsx">
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传EXCEL文件</div>
        </el-upload>
        <div style="position:absolute;bottom:5px;">
          <el-button type="success" icon="el-icon-circle-check" @click="dialogVisible = true;">核 对</el-button>
        </div>
        <el-dialog title="请选择核对要素" :visible.sync="dialogVisible" width="20%">
          <el-checkbox checked disabled>账户</el-checkbox><br>
          <el-checkbox checked disabled>金额</el-checkbox><br>
          <el-checkbox v-model="pickOpsAcc" true-label="1" false-label="0">对方账户</el-checkbox><br>
          <el-radio-group v-model="pickDateType">
            <el-radio :label="1">交易日期</el-radio>
            <el-radio :label="2">月份</el-radio>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitUpload">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="form-basic" v-show="showList">
      <h5>核对未匹配列表</h5>
      <div class="content">
        <el-button type="primary" @click="exportResult">导出结果</el-button>
        <el-table :data="sheetList0" border style="width: 100%;margin-top: 20px">
          <el-table-column label="逆时账未匹配数据">
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="tradeNo" label="交易流水号" width="180">
            </el-table-column>
            <el-table-column prop="accName" label="账户" width="180">
            </el-table-column>
            <el-table-column prop="opsAccName" label="对方账户" width="180">
            </el-table-column>
            <el-table-column prop="tradeDate" label="交易日期" width="180">
            </el-table-column>
            <el-table-column prop="lendAmt" label="借方金额" width="180">
            </el-table-column>
            <el-table-column prop="borrowAmt" label="贷方金额" width="180">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="content">
        <el-table :data="sheetList1" border style="width: 100%;">
          <el-table-column label="银行流水未匹配数据">
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="tradeNo" label="交易流水号" width="180">
            </el-table-column>
            <el-table-column prop="accName" label="账户" width="180">
            </el-table-column>
            <el-table-column prop="opsAccName" label="对方账户" width="180">
            </el-table-column>
            <el-table-column prop="tradeDate" label="交易日期" width="180">
            </el-table-column>
            <el-table-column prop="lendAmt" label="借方金额" width="180">
            </el-table-column>
            <el-table-column prop="borrowAmt" label="贷方金额" width="180">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      data() {
        return {
          fileList: [],
          uploadUrl: this.$ajax.apiUrl("/financial/account-check/upload"),
          showList: false,
          sheetList0: [],
          sheetList1: [],
          dialogVisible: false,
          pickOpsAcc: "1",
          pickDateType: 1
        };
      },

      methods: {
        handleExceed(files, fileList) {
          this.$message.warning(`只能上传1个文件`);
        },
        submitUpload() {
          this.dialogVisible = false;
          this.$ajax({
                url: "/financial/account-check/list" + "?type=" + this.pickOpsAcc + this.pickDateType,
                method: "get"
            }).then(res => {
                if (res && res.code === 200) {
                    this.showList = true
                    this.sheetList0 = res.data.sheetList0;
                    this.sheetList1 = res.data.sheetList1;
                    this.$message({
                        message: "操作成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {}
                    });
                }
            });
        },
        exportResult() {
          window.open(this.$ajax.apiUrl("/financial/account-check/export") + "?type=" + this.pickOpsAcc + this.pickDateType);

          // this.$ajax({
          //       url: "/financial/account-check/export" + "?type=" + this.pickOpsAcc + this.pickDateType,
          //       method: "get"
          //   }).then(res => {
          //       if (res && res.code === 200) {
          //           this.$message({
          //               message: "操作成功",
          //               type: "success",
          //               duration: 1500,
          //               onClose: () => {}
          //           });
          //       } else {
          //         this.$message({
          //               message: res.message,
          //               type: "error",
          //               duration: 1500,
          //               onClose: () => {}
          //           });
          //       }
          //   });
        }
      }
    }

</script>
<style type="text/css">
.form-basic {
  background-color: #FFFFFF;
  margin: 0 auto;
  margin-top: 20px;
  height: auto !important;
  min-height: 300px;
  width: 98%;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: relative;
}

.form-basic h5 {
  margin-top: 0;
  padding: 13px;
  background: #FFFFFF;
  border-bottom: 1px solid #E4E4E4;
}

.form-basic .content {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

</style>
