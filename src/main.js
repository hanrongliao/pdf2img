const canvas2file = (canvas) => {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        })
    })
}

const page2canvas = (doc, index) => {
    return doc.getPage(index)
        .then((page) => {
            const canvas = document.createElement('canvas')
            const canvasContext = canvas.getContext('2d')
            const viewport = page.getViewport(1)
            canvas.height = viewport.height
            canvas.width = viewport.width
            const ctx = { canvasContext, viewport }
            return page.render(ctx)
                .then(() => {
                    return canvas
                })
        })
}

const pdf2blob = (file) => {
    const url =  URL.createObjectURL(file)    
    return pdfjsLib.getDocument(url)
        .then((doc) => {
            const total = doc.numPages
            const canvasList = []
            for (let i = 1; i <= total; i++) {
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

const getImageUrls = (file) => {
    return pdf2blob(file)
        .then((bList) => {
            const urls = []
            for(let i = 0; i < bList.length; i++) {
                urls.push(URL.createObjectURL(bList[i]))
            }
            return urls
        })
}

const getImageObjects = (file) => {
    return pdf2blob(file)
}

export default {
    getImageUrls,
    getImageObjects,
}