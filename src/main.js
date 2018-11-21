const canvas2file = (canvas) => {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, "image/jpeg", 2)
    })
}

const page2canvas = (doc, index) => {
    return doc.getPage(index)
        .then((page) => {
            const canvas = document.createElement('canvas')
            const canvasContext = canvas.getContext('2d')
            const viewport = page.getViewport(1.5)
            canvas.height = viewport.height
            canvas.width = viewport.width
            const ctx = { canvasContext, viewport }
            return page.render(ctx)
                .then(() => {
                    return canvas
                })
        })
}

const pdf2blob = (file, startPage, endPage) => {
    const url =  URL.createObjectURL(file)
    return pdfjsLib.getDocument(url)
        .then((doc) => {
            const total = doc.numPages
            if (startPage > total) return Promise.resolve([])
            const canvasList = []
            const  start = startPage || 1
            const  end = endPage || total
            for (let i = start; i <= end; i++) {
                canvasList.push(page2canvas(doc, i))
            }
            return Promise.all(canvasList)
                .then((cvsList) => {
                    const blobList = []
                    for (let j = 0; j < cvsList.length; j++) {
                        blobList.push(canvas2file(cvsList[j]))
                    }
                    return Promise.all(blobList).then((bList) => {
                        return bList
                    })
                })
        })
}

const getImageUrls = (file, startPage = 1, endPage) => {
    return pdf2blob(file, startPage, endPage)
        .then((bList) => {
            const urls = []
            for(let i = 0; i < bList.length; i++) {
                urls.push(URL.createObjectURL(bList[i]))
            }
            return urls
        })
}

const getImageObjects = (file, startPage = 1, endPage) => {
    return pdf2blob(file, startPage, endPage)
}

export default {
    getImageUrls,
    getImageObjects,
}