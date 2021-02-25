### 1. previousSibling

- 用法
element.previousSibling
- 注意
previousSibling 属性返回同一树层级中指定节点的前一个节点。
被返回的节点以 Node 对象的形式返回。
注释：如果没有 previousSibling 节点，则返回值是 null。


### 2. appendChild
- 用法
element.appendChild(node)
- 注意
返回被添加的节点

### 3. attributes
- 用法
element.attributes
- 注意
attributes 属性返回指定节点的属性集合，即 NamedNodeMap。
```html
<button id="myBtn" onclick="myFunction()">试一下</button>
```
![截屏2021-02-25 下午9.24.28.png](https://upload-images.jianshu.io/upload_images/9403487-a9d944238757867c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.className
- 用法
element.className=classname
- 注意
返回当前节点的class属性，string

### 5.cloneNode
- 用法
element.cloneNode(bool)
- 注意
cloneNode() 方法创建节点的拷贝，并返回该副本。
cloneNode() 方法克隆所有属性以及它们的值。
如果您需要克隆所有后代，请把 deep 参数设置 true，否则设置为 false。

### 6.className
- 用法
element. compareDocumentPosition(node)
```js
var p1=document.getElementById("p1");
var p2=document.getElementById("p2");
p1.compareDocumentPosition(p2);
```
- 注意
compareDocumentPosition() 方法比较两个节点，并返回描述它们在文档中位置的整数。
请看上面的例子。返回值可能是：
1：没有关系，两个节点不属于同一个文档。
2：第一节点（P1）位于第二个节点后（P2）。
4：第一节点（P1）定位在第二节点（P2）前。
8：第一节点（P1）位于第二节点内（P2）。
16：第二节点（P2）位于第一节点内（P1）。
32：没有关系，或是两个节点是同一元素的两个属性。
注释：返回值可以是值的组合。例如，返回 20 意味着在 p2 在 p1 内部（16），并且 p1 在 p2 之前（4）。

### 7. contentEditable
- 用法
element.contentEditable=true|false
- 注意
contentEditable 属性设置或返回元素内容是否可编辑。
提示：您也可以使用 isContentEditable 属性来查明元素内容是否可编辑。

### 8.dir
- 用法
element.dir=text-direction
- 注意
dir 属性设置或返回元素的文本方向

### 9. firstChild
- 用法
element. firstChild
- 注意
firstChild 属性返回指定节点的首个子节点，以 Node 对象。
注释：在 HTML 中，文本本身是 HTML 元素的父节点，HEAD 和 BODY 是 HTML 元素的子节点。

### 10. getAttribute
- 用法
element.getAttribute(attrName)
- 注意
getAttribute() 方法返回指定属性名的属性值。

### 11. getAttributeNode
- 用法
```js
document.getElementsByTagName("a")[0].getAttributeNode("target");
```
### 12. getElementsByTagName
- 用法
element. getElementsByTagName(TagName)
- 注意
getElementsByTagName() 方法返回具有指定标签名的元素子元素集合，以 NodeList 对象。*返回所有元素

### 13. hasAttribute/hasAttributes
- 用法
element.hasAttribute(attrName) / element.hasAttributes()
- 注意
hasAttribute 如果存在指定属性，则 hasAttribute() 方法返回 true，否则返回 false。
hasAttributes 如果指定节点拥有属性，则 hasAttributes() 方法返回 true，否则返回 false。

### 14. hasChildNodes
- 用法
element.hasChildNodes()
- 注意
hasChildNodes() 方法返回 true，如果指定节点拥有子节点，否则返回 false。

### 15. insertBefore
- 用法
```js
document.getElementById("myList").insertBefore(newItem,existingItem);
```
- 注意
insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
提示：如果您希望创建包含文本的新列表项，请记得创建文本节点形式的文本，以便追加到 LI 元素中，然后向列表插入这个 LI。
您也可以使用 insertBefore 方法插入/移动已有元素。

### 16. isEqualNode
- 用法
element. isEqualNode(node)
- 注意
isEqualNode() 方法检查两个节点是否相等。
如果下例条件为 true，则两个节点相等：
节点类型相同
拥有相同的 nodeName、NodeValue、localName、nameSpaceURI 以及前缀
所有后代均为相同的子节点
拥有相同的属性和属性值（属性次序不必一致）

### 17. isSameNode
- 用法
element. isSameNode(node)
- 注意
isSameNode() 方法检查两节点是否是相同的节点。
isSameNode() 方法返回 true，如果两节点是相同的节点，否则返回 false。

### 18. lastChild
- 用法
element.lastChild
- 注意
lastChild 属性返回指定节点的最后一个子节点，以 Node 对象。

### 19. nextSibling
- 用法
element.nextSibling
- 注意
nextSibling 属性返回指定节点之后紧跟的节点，在相同的树层级中。
被返回的节点以 Node 对象返回。
注释：如果没有 nextSibling 节点，则返回值为 null。

### 20. nodeName
- 用法
element. nodeName
- 注意
nodeName 属性指定节点的节点名称。
如果节点是元素节点，则 nodeName 属性返回标签名。
入股节点是属性节点，则 nodeName 属性返回属性的名称。
对于其他节点类型，nodeName 属性返回不同节点类型的不同名称。

### 21. normalize
- 用法
element.normalize()
- 注意
normalize() 方法移除空的文本节点，并连接相邻的文本节点。

### 22. parentNode
- 用法
element.parentNode
- 注意
parentNode 属性以 Node 对象的形式返回指定节点的父节点。
如果指定节点没有父节点，则返回 null。

### 23. removeAttribute
- 用法
element.removeAttribute(name)
- 注意
removeAttribute() 方法删除指定的属性。
此方法与 removeAttributeNode() 方法的差异是：removeAttributeNode() 方法删除指定的 Attr 对象，而此方法删除具有指定名称的属性。结果是相同的。同时此方法不返回值，而 removeAttributeNode() 方法返回被删除的属性，以 Attr 对象的形式。

### 24. removeChild
- 用法
element.removeChild(node)
- 注意
removeChild() 方法指定元素的某个指定的子节点。
以 Node 对象返回被删除的节点，如果节点不存在则返回 null。

### 25. replaceChild
- 用法
element.replaceChild(newnode,oldnode);
- 注意
replaceChild() 方法用新节点替换某个子节点。
这个新节点可以是文档中某个已存在的节点，或者您也可创建新的节点。

### 25. textContent
- 用法
```js
document.getElementsByTagName("BUTTON")[0].textContent;
```
- 注意
textContent 属性设置或返回指定节点的文本内容，以及它的所有后代。
如果您设置了 textContent 属性，会删除所有子节点，并被替换为包含指定字符串的一个单独的文本节点。
提示：有时，此属性可用于取代 nodeValue 属性，但是请记住此属性同时会返回所有子节点的文本。




