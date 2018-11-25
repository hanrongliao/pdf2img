const canvas2file = (canvas, quality = 2) => {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, "image/jpeg", quality)
    })
}

const page2canvas = (doc, index, scale = 2) => {
    return doc.getPage(index)
        .then((page) => {
            const canvas = document.createElement('canvas')
            const canvasContext = canvas.getContext('2d')
            const viewport = page.getViewport(scale)
            canvas.height = viewport.height
            canvas.width = viewport.width
            const ctx = { canvasContext, viewport }
            return page.render(ctx)
                .then(() => {
                    return canvas
                })
        })
}

const pdf2blob = (file, options) => {
    const { startPage, endPage, scale, quality } = options
    const url =  URL.createObjectURL(file)
    return pdfjsLib.getDocument(url)
        .then((doc) => {
            const totalPage = doc.numPages
            if (startPage > totalPage) return Promise.resolve([])
            const canvasList = []
            const  start = startPage || 1
            const  end = endPage || total
            for (let i = start; i <= end; i++) {
                canvasList.push(page2canvas(doc, i, scale))
            }
            return Promise.all(canvasList)
                .then((cvsList) => {
                    const blobList = []
                    for (let j = 0; j < cvsList.length; j++) {
                        blobList.push(canvas2file(cvsList[j], quality))
                    }
                    return Promise.all(blobList).then((bList) => {
                        return { bList, totalPage }
                    })
                })
        })
}

const getImageUrls = (file, options = {}) => {
    return pdf2blob(file, options)
        .then((res) => {
            const totalPage = res.totalPage
            const urls = []
            for(let i = 0; i < res.bList.length; i++) {
                urls.push(URL.createObjectURL(res.bList[i]))
            }
            res.urls = urls
            return { urls, totalPage }
        })
}

const getImageObjects = (file, options = {}) => {
    return pdf2blob(file, options)
}

export default {
    getImageUrls,
    getImageObjects,
}