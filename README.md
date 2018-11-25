前端借助 `pdfjs` 库将pdf文件转换成图片

### 使用场景
1. 前端以图片的形式轻松实现翻页预览pdf文件
2. 前端将pdf文件转成图片后再上传

### 依赖
首先需要引入pdf.js库和pdf.worker.js库
```html
<!-- 二者的版本必须一致 -->
<script src="./pdf.min.js"></script>
<script src="./pdf.worker.min.js"></script>
```
接着引入pdf2imgjs库,支持es6和script标签方式引入, 标签方式引入暴露全局变量`pdf2img`,
npm 安装
```bash
npm i pdf2imgjs --save
```
引入
```js
import pdf2img from 'pdf2imgjs'
```
或
```html
<script src="./pdf2imgjs.min.js">
```

### 使用
pdf2imgjs暴露两个方法,两个方法都接受一个file对象, options对象, file参数为必须， 返回为一个promise对象, 通过promise的then方法获取返回值

`options`对象包含四个可选参数
```js
startPage: 1,
endPage: 1, // 默认文件的最大页数
scale: 2, // 图片放大系数, 默认2
quality: 2, // 图片质量系数, 默认2
```
1. `getImageUrls`, 返回 `{ urls: [], totalPage: 1 }`, urls为图片链接
2. `getImageObjects` 返回以`{ bList: [], totalPage }`, bList元素图片的blob对象

### 示例
```html
<input id="pdf-input" type="file"> 
```
```js
 const fileEle = document.querySelector('#pdf-input');
    fileEle.addEventListener('change', (event) => {
        const file = event.target.files[0]
        pdf2img.getImageUrls(file, 1)
            .then(({ urls }) => {
                for (let i = 0; i < urls.length; i++) {
                    const img = document.createElement('img')
                    img.src = urls[i]
                    document.getElementsByTagName('body')[0].appendChild(img)
                }
            })        
    }, false)
```








