<template>
  <div class="flowmodaldesign-main">
    <chart-flow
      ref="flowChart"
      @add-node="onAddNode"
      @config-node="onConfigNode"
      :remove-filter="removeFilter"
      :platform="platform"
      :nodes="nodes"
      :isStarter="isStarter"
      :startNodeName="startNodeName"
      :fixedNodeName="fixedNodeName"
    >
      <template #extra>
        <el-button v-if="showClear" @click="clearNodes">清空</el-button>
        <slot name="extra"></slot>
      </template>
    </chart-flow>

    <!-- 字段弹窗 -->
    <el-drawer
      :visible.sync="visible"
      custom-class="sandbox-field-drawer"
      :title="title"
      :size="600"
    >
      <el-tabs class="flow-field-tab" v-model="activeName">
        <el-tab-pane name="0" :label="title + '设置'">
          <el-form ref="form" :model="node" :label-width="'120px'">
            <el-form-item label="节点名称" prop="name1">
              <el-input v-model="node.name"> </el-input>
            </el-form-item>

            <!-- <el-form-item label="authId" prop="authId">
              <el-input v-model="node.authId"> </el-input>
            </el-form-item> -->

            <el-form-item
              label="类型"
              :rules="[
                {
                  required: true,
                  message: '请填写节点名称',
                  trigger: 'change',
                },
              ]"
            >
              <el-radio-group v-model="platform" :disabled="true">
                <el-radio :label="1">岸基端</el-radio>
                <el-radio :label="2">船载端</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="谁可以审批"
              prop="authType"
              :rules="[
                {
                  required: true,
                  message: '请选择谁可以审批',
                  trigger: 'change',
                },
              ]"
            >
              <el-radio-group v-model="node.authType" @change="authTypeChange">
                <!-- 处理人类型: 1角色 2部门 3用户 4发起人上级领导 5发起人 -->
                <template v-if="platform == 2">
                  <el-radio label="1">指定在船角色</el-radio>
                  <el-radio label="3">指定在船用户</el-radio>
                </template>
                <template v-if="platform == 1">
                  <el-radio v-if="isStarter" label="4">直系领导</el-radio>
                  <el-radio label="3">指定岸基人员</el-radio>
                  <el-radio v-if="isStarter" label="5">发起人自己</el-radio>
                  <el-radio label="2">指定部门/职务</el-radio>
                </template>
              </el-radio-group>
            </el-form-item>

            <!-- 角色 -->
            <el-form-item
              v-if="node.authType == 1"
              label="角色"
              prop="authIds"
              :rules="[
                {
                  required: true,
                  message: '请选择角色',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="node.authIds"
                multiple
                placeholder="请选择"
                @change="onAuthIdChange"
              >
                <el-option
                  v-for="(item, idx) in authIdDataList"
                  :key="idx"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 部门 -->
            <el-form-item
              v-if="node.authType == 2"
              label="部门/职务"
              prop="authIds"
              :rules="[
                {
                  required: true,
                  message: '请选择部门/职务',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="node.authIds"
                multiple
                placeholder="请选择"
                @change="onAuthIdChange"
              >
                <el-option
                  v-for="(item, idx) in authIdDataList"
                  :key="idx"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 人员 -->
            <el-form-item
              v-if="node.authType == 3"
              label="人员"
              prop="authIds"
              :rules="[
                {
                  required: true,
                  message: '请选择人员',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="node.authIds"
                multiple
                placeholder="请选择"
                @change="onAuthIdChange"
              >
                <el-option
                  v-for="(item, idx) in authIdDataList"
                  :key="idx"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane v-if="showFields" name="1" label="字段操作权限">
          <section v-for="(key, idx) in Object.keys(concatedFields)" :key="idx">
            <div class="field-title">{{ key }}:</div>
            <div>
              <el-table
                class="crud-table field-table"
                :cell-class-name="() => 'crud-cell'"
                :header-cell-class-name="() => 'crud-table-head'"
                :data="concatedFields[key]"
                stripe
                border
              >
                <el-table-column
                  prop="fieldTxt"
                  label="字段"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="可编辑"
                  #default="{ row }"
                  align="center"
                >
                  <el-radio
                    :value="row.type"
                    label="0"
                    @change="(e) => clickChange(0, row)"
                  ></el-radio>
                </el-table-column>
                <el-table-column label="只读" #default="{ row }" align="center">
                  <el-radio
                    :value="row.type"
                    label="1"
                    @change="(e) => clickChange(1, row)"
                  ></el-radio>
                </el-table-column>
                <el-table-column label="隐藏" #default="{ row }" align="center">
                  <el-radio
                    :value="row.type"
                    label="2"
                    @change="(e) => clickChange(2, row)"
                  ></el-radio>
                </el-table-column>
              </el-table>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>

      <div class="footer">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "flow-drawer",
  props: {
    platform: {
      type: Number,
      default: 1, // 1岸基 2船端
    },
    nodes: {
      type: Array,
      default: () => [], // 1岸基 2船端
    },
    showFields: {
      type: Boolean,
      default: true,
    },
    showClear: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    // 已经保存的字段
    flowFields: {
      type: Array,
      default() {
        return [];
      },
    },
    // 字段
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    removeFilter: {
      type: Function,
    },
    // 是否是发起者
    isStarter: {
      type: Boolean,
      default: false,
    },
    // 发起节点名称
    startNodeName: {
      type: String,
      required: false,
    },
    // 固定节点名称
    fixedNodeName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      // 弹框是否显示
      visible: false,
      // 节点数据
      node: {
        nodeType: 0,
        name: "",
        authIds: [],
        authId: "",
        authName: "",
      },
      // 判断显示什么模板  不能删
      authType: null,
      activeName: "0",
      concatedFields: {},
    };
  },
  computed: {
    authIdDataList() {
      return this.data[this.node.authType];
    },
    title() {
      if (this.node?.nodeType == 1) return "审批人";
      if (this.node?.nodeType == 2) return "抄送人";
    },
  },
  methods: {
    doConcatFields(fields = []) {
      // 构建数据map
      let map = {};
      this.fields.forEach((field) => {
        let target = fields.find(item => item.name == field.fieldName)
        map[field.groupKey] = map[field.groupKey] || [];
        field.type = target?.type || "0";
        map[field.groupKey].push(field);
      });

      this.concatedFields = map;
    },
    /**
     * 测试：添加节点事件处理
     * @param {string} nodeType 节点类型 "1":审批节点 "2":抄送节点
     * @param {string} currentNodeId 正在被向后追加节点的当前节点编号
     */
    onAddNode(node) {
      if (node.nodeType == 1 || node.nodeType == 2) {
        this.open(node);
      }
    },
    /**
     * 测试：配置节点事件处理
     * @param data
     * @param currentNodeId
     */
    onConfigNode(node) {
      // console.log(1);
      if (node.nodeType == 1 || node.nodeType == 2) {
        this.open(node);
      }
    },
    init(nodes) {
      this.$refs.flowChart.updateNodeList(nodes);
    },
    getAllNodes() {
      return this.$refs.flowChart.getAllNodes();
    },
    // 弹框的显示 以及处理默认值
    open(node) {
      // debugger
      let nodeData = node;
      this.linkNode = node._currentNode;
      this.node = nodeData;
      this.node.authId = nodeData.authId || "";
      this.doConcatFields(node.fields || []);
      if (this.node.authId) {
        this.node.authIds = nodeData.authId.split(",");
      }

      this.visible = true;
    },
    // 弹框的隐藏
    close() {
      this.visible = false;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    onAuthIdChange(data) {
      this.node.authId = data.join(",");
      let authNameList = data.map((key) => {
        let item = this.authIdDataList.find((item) => item.value == key);
        if (item) return item.label;
      });

      this.node.authName = authNameList.join(",");
      console.log(data);
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    // 提交方法 处理两个页签的数据
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = Object.values(this.concatedFields)
            .reduce((pre, aft) => [...pre, ...aft], [])
            .map((item) => {
              return {
                // id: item.id,
                name: item.fieldName,
                type: item.type,
              };
            });

          const node = this.node;

          if (this.showFields) {
            node.fields = data;
          }

          this.linkNode.update(node);

          this.$emit("save");
          this.close();
        } else {
          this.$message.error("请检查需要填写的项");
        }
      });
    },

    // 人员类型的change 初始化 authId 和 authName
    authTypeChange(authType) {
      // <!-- 处理人类型: 1角色 2部门 3用户 4发起人上级领导 5发起人 -->
      this.$refs.form.clearValidate("authIds");

      if (authType == 1) {
      }

      if (authType == 2) {
      }

      if (authType == 3) {
      }

      if (authType == 4 || authType == 5) {
        let data = this.data[authType];
        this.node.authId = data.map((item) => item.value).join(",");
        this.node.authName = data.map((item) => item.label).join(",");
      }

      
    },

    clearNodes() {
      this.$refs.flowChart?.clear();
    },
    clickChange(e, row) {
      this.$set(row, "type", String(e));
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.flowmodaldesign-main {
  width: 100%;
  height: 100%;
}
.footer {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
