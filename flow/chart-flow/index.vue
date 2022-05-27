<template>
  <div class="flowdesign-main">
    <div class="flowdesign-top">
      <h1>{{ platformName }}</h1>
      <div
        v-for="type in nodeTypes"
        :key="type.typeId"
        class="type-item"
        :class="type.style"
      >
        {{ nodeTypeMap[type.typeId] && nodeTypeMap[type.typeId]["name"] }}
      </div>
    </div>

    <div class="floating-btn">
      <slot name="extra"></slot>
    </div>

    <div class="flowdesign-container">
      <div
        v-for="(node, nodeIndex) in nodeList"
        :key="node.id"
        class="flow-item"
      >
        <div class="node-panel">
          <button
            v-if="!(node.nodeType == 6 || node.nodeType == 7)"
            class="node-delete"
            @click.stop="deleteNode(node)"
          >
            ✖
          </button>
          <div
            class="node-info"
            :class="getNodeStyle(node.nodeType)"
            @click="fireConfigNode(node)"
          >
            <div>
              {{ node.name }}({{
                nodeTypeMap[node.nodeType] &&
                nodeTypeMap[node.nodeType]["name"]
              }})
            </div>
            <div
              v-if="node.nodeType === code.approveNodeCode"
              style="font-size: 12px"
            >
              {{ node.authName }}
            </div>
          </div>
        </div>

        <div v-if="nodeIndex < nodeList.length - 1" class="node-line">
          <button @click="addBtnClick($event, node)">+</button>
        </div>
      </div>
    </div>

    <el-dialog
      v-if="visible"
      custom-class="crud-dialog addnode-dialog"
      title="添加节点"
      :visible.sync="visible"
      width="400px"
      lock-scroll
      append-to-body
      modal-append-to-body
      :center="true"
    >
      <div class="addnode-dialog-content">
        <el-button
          :disabled="!(currentNodeToAddNext.nodeType == 6) || canAddApplyNode"
          class="add-btn"
          @click="addCustomNewNode(5)"
        >
          申请
        </el-button>
        <el-button
          :disabled="currentNodeToAddNext.nodeType == 6 || canAddFixedNode"
          class="add-btn"
          @click="addCustomNewNode(fixedNodeType)"
        >
          固定节点
        </el-button>
        <el-button
          :disabled="currentNodeToAddNext.nodeType == 6"
          class="add-btn"
          @click="addCustomNewNode(1)"
        >
          审批
        </el-button>
        <el-button
          :disabled="currentNodeToAddNext.nodeType == 6"
          class="add-btn"
          @click="addCustomNewNode(2)"
        >
          抄送
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./flow.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
