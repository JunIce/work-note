//  APPROVE_NODE("1", "审批节点"),
//  DUP_NODE("2", "抄送节点"),
//  LAND_FIX_NODE("3", "岸基固定节点"),
//  SHIP_FIX_NODE("4", "船舶固定节点"),
//  STARTER_NODE("5", "发起人申请节点"),
//  START_EVENT("6", "开始"),
//  END_EVENT("7", "结束");
let platformMap = new Map([
  [1, "岸基"],
  [2, "船舶"],
]);

let count = 1;

let nodeTypeMap = {
  1: {
    name: "审批",
  },
  2: {
    name: "抄送",
  },
  3: {
    name: "同步",
  },
  4: {
    name: "同步",
  },
  5: {
    name: "申请",
  },
  6: {
    name: "开始",
  },
  7: {
    name: "结束",
  },
};

export default {
  name: "chart-flow",
  props: {
    platform: {
      type: Number,
      default: 0,
    },

    nodes: {
      type: Array,
      default: () => {
        return [];
      },
    },

    code: {
      type: Object,
      default: () => ({
        startNodeCode: "5",
        approveNodeCode: "1",
        sendNodeCode: "2",
        landFixNodeCode: "3",
        shipFixNodeCode: "4",
      }),
    },

    removeFilter: {
      type: Function,
      default: () => true,
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
      visible: false,
      nodeTypeMap,
      nodeTypes: [
        {
          // typeName: this.promoterNodeName,
          typeId: 5, // 发起节点
          style: "node-info-promoter",
          typeStyle: {
            backgroundColor: "#F9E9D4",
            borderRadius: "5px",
            border: "1px solid #F7C68A",
          },
        },
        {
          // typeName: this.approveNodeName,
          typeId: "1", // 审批节点
          style: "node-info-approve",
          typeStyle: {
            backgroundColor: "#1682E6",
            // borderRadius: "5px",
          },
        },
        {
          // typeName: this.sendNodeName,
          typeId: "2", // 抄送节点
          style: "node-info-send",
          typeStyle: {
            backgroundColor: "#EEACB4",
            borderRadius: "5px",
          },
        },
      ],
      fixedNodeType: 3,
      nodeList: [],

      currentNodeToAddNext: "",
    };
  },
  created() {
    this.platformName = platformMap.get(this.platform);
    // 固定节点
    this.fixedNodeType = this.platform == 1 ? 3 : 4;
    this.allNodeList = [];
    this.nodeList = [];
    this.startNode = null;
    // if (this.startNodeName) {
    //   this.nodeTypeMap["6"].name = this.startNodeName;
    // }
    // if (this.fixedNodeName) {
    //   this.nodeTypeMap[this.fixedNodeType].name = this.fixedNodeName;
    // }
    // 更新所有节点
    this.updateNodeList(this.nodes);
  },
  computed: {
    canAddApplyNode() {
      return !!this.nodeList.find((item) => item.nodeType == 5);
    },
    canAddFixedNode() {
      return !!this.nodeList.find(
        (item) => item.nodeType == this.fixedNodeType
      );
    },
    actionAuth() {
      if (this.isStarter) return this.currentNodeToAddNext.nodeType == 6
      return false
    }
  },

  methods: {
    genNode(node) {
      let vm = this;
      let currentNode = {
        id: count++,
        node,
        nodeType: node.nodeType,
        next: null,
        prev: null,
      };

      currentNode.render = this.render;
      currentNode.update = function (data = {}) {
        try {
          Object.assign(this.node, data);
        } catch (error) {
        } finally {
          vm.$forceUpdate();
        }
      };

      node._currentNode = currentNode;

      return currentNode;
    },
    // 根据样式对象获取样式
    getStyle(styleObj) {
      let styleStr = "";
      if (styleObj) {
        if (styleObj.backgroundColor) {
          styleStr += `background-color:${styleObj.backgroundColor};`;
        }
        if (styleObj.borderRadius) {
          styleStr += `border-radius:${styleObj.borderRadius};`;
        }
      }
      return styleStr;
    },

    // 获取节点样式
    getNodeStyle(nodeTypeId) {
      let className = "node-info-default";
      const nodeTypes = this.nodeTypes.filter(
        (val) => val.typeId == nodeTypeId
      );
      if (nodeTypes && nodeTypes.length > 0) {
        className = nodeTypes[0].style; // this.getStyle(nodeTypes[0].typeStyle);
      }
      return className;
    },

    addBtnClick(e, node) {
      this.currentNodeToAddNext = node;
      this.visible = true;
    },

    addCustomNewNode(nodeType) {
      let dataNode = this.currentNodeToAddNext;
      let originNode = dataNode._currentNode;
      let nextNode = originNode.next;

      const intertNode = () => {
        let node = this.genNode({
          nodeType,
          name: this.getNodeNameByNodeType(nodeType),
          authId: "",
          authName: "",
          authType: "",
        });

        node.prev = originNode;
        node.next = nextNode;

        originNode.next = node;
        nextNode.prev = node;

        this.render();
        this.visible = false;
        this.$emit("add-node", node.node);
      };

      switch (nodeType) {
        // 审批/ 抄送节点
        case 1:
        case 2:
          intertNode();
          break;

        // 固定节点
        case 3:
        case 4:
          if (this.allNodeList.find((item) => item.nodeType == nodeType)) {
            this.$message.error("只能存在一个固定节点");
          } else {
            intertNode();
          }
          break;

        case 5:
          // 申请节点
          if (nextNode.nodeType == 5) {
            this.$message.error("已经存在申请节点");
          } else {
            intertNode();
          }
          break;
      }
    },

    /**
     * 触发配置节点事件
     * @param {*} node
     */
    fireConfigNode(node) {
      this.$emit("config-node", node);
    },

    /**
     * 删除节点
     * @param {*} node
     */
    deleteNode(node) {
      // 增加filter
      if (this.removeFilter(node)) {
        let linkNode = node._currentNode;
        let prev = linkNode.prev;
        let next = linkNode.next;

        if (prev) {
          prev.next = next;
        }
        if (next) {
          next.prev = prev;
        }
        this.render();
      }
    },

    /**
     * 根据节点类型编号获取节点名称
     * @param {*} typeId
     */
    getNodeNameByNodeType(typeId) {
      let nodeName = this.platformName + nodeTypeMap[typeId]["name"];
      if (typeId == 6 && this.startNodeName) {
        nodeName = this.startNodeName;
      }
      if (typeId == this.fixedNodeType && this.fixedNodeName) {
        nodeName = this.fixedNodeName;
      }

      return nodeName;
    },

    /**
     * 更新节点信息列表
     * @param {array} nodeInfos
     */
    updateNodeList(nodeInfos = []) {
      let nodeList = [];

      if (nodeInfos.length == 0) {
        nodeInfos.push({
          nodeType: "6",
        });
        if (this.isStarter) {
          nodeInfos.push({
            nodeType: this.fixedNodeType + "",
          });
        }
        nodeInfos.push({
          nodeType: "7",
        });
      }

      nodeInfos.forEach((node, idx) => {
        let newNode = this.genNode(node);
        if (idx > 0) {
          let prev = nodeList[idx - 1];
          newNode.prev = prev;
          prev.next = newNode;
        }

        if (idx == 0) {
          this.startNode = newNode;
        }

        nodeList.push(newNode);
      });

      this.render();
    },

    // 生成渲染节点
    render() {
      if (this.startNode) {
        let list = [];
        let allNodeList = [];

        let node = this.startNode;
        list.push(this.renderNode(node.node));

        allNodeList.push(node);
        while (node.next) {
          node = node.next;
          list.push(this.renderNode(node.node));
          allNodeList.push(node);
        }

        console.log("render: ", list);
        this.allNodeList = allNodeList;
        this.nodeList = list;
        // this.$forceUpdate()
      }
    },

    renderNode(node) {
      if (!node.name) {
        node.name = this.getNodeNameByNodeType(node.nodeType);
      }
      return node;
    },

    /**
     * 获取所有节点信息 返回的是类型为 审批、抄送、固定节点的节点列表数据
     */
    getAllNodes() {
      return this.nodeList.map((node, idx) => {
        if (node.nodeType == 1 || node.nodeType == 2) {
          return {
            nodeType: node.nodeType,
            name: node.name,
            authId: node.authId || "",
            authName: node.authName || "",
            authType: node.authType,
            sortOrder: idx + 1,
            fields: node.fields || [],
          };
        }

        return {
          nodeType: node.nodeType,
          name: node.name,
          sortOrder: idx + 1,
        };
      });
    },

    clear() {
      this.updateNodeList([]);
    },
  },
};
