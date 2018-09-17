前端借助 `pdfjs` 库将pdf文件转换成图片

### 使用场景
1. 前端以图片的形式轻松实现翻页预览pdf文件
2. 前端将pdf文件转成图片后再上传

### 依赖
首先需要引入pdf.js库和pdf.worker.js库
```html
<!-- 二者的版本必须一致 -->
<script src="./pdf.min.js">
<script src="./pdf.worker.min.js"> 
```
接着引入pdf2img库,支持es6和script标签方式引入, 标签方式引入暴露全局变量pdf2img,
npm 安装
```bash
npm i pdf2img --save
```
引入
```js
import pdf2img from 'pdf2img'
```
或
```html
<script src="./pdf2img.min.js">
```

### 使用
pdf2img暴露两个方法,两个方法都只接受一个file对象参数, 返回为一个promise对象, 通过promise的then方法获取返回值
1. `getImageUrls`, 返回按pdf页码为顺序的图片url
2. `getImageObjects` 返回以pdf页码为顺序的图片blob对象

### 示例
```html
<input id="pdf-input" type="file"> 
```
```js
 const fileEle = document.querySelector('#pdf-input');
    fileEle.addEventListener('change', (event) => {
        const file = event.target.files[0]
        pdf2img.getImageUrls(file, 1)
            .then((urls) => {
                for (let i = 0; i < urls.length; i++) {
                    const img = document.createElement('img')
                    img.src = urls[i]
                    document.getElementsByTagName('body')[0].appendChild(img)
                }
            })        
    }, false)
```








