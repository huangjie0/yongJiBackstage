//导出excel库
import FileSaver from "file-saver";
import XLSX from "xlsx";
//导出pdf文件库
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
//导入图片压缩插件
import ImageCompressor from 'js-image-compressor'
//导出excel表
export function exportExcel(title){
    var xlsxParam = { raw: true }
    var wb = XLSX.utils.table_to_book(
      document.querySelector('#out-table'),
      xlsxParam
    )
    var wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        `${title}.xlsx`
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
}
//导出pdf文件
export function getPdf (title) {
    html2Canvas(document.querySelector('#out-table'), {
           useCORS: false,//Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy
           allowTaint: false,//Whether to allow cross-origin images to taint the canvas
           logging: false,//Whether to log events in the console
           dpi: window.devicePixelRatio,
           
           scale: 1,
            backgroundColor: null,//Canvas background color, if none is specified in DOM. Set undefined for transparent
           letterRendering: true,//Whether to render each letter seperately. Necessary if letter-spacing is used
    }).then(canvas => {
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    const pageHeight = contentWidth / 592.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = 595.28
    const imgHeight = 592.28 / contentWidth * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const PDF = new JsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
        while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
            PDF.addPage()
        }
        }
    }
    PDF.save(title + '.pdf')
    })
} 
//处理图片文件压缩
export function compressionImage(file,quality,maxWidth,maxHeight) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new ImageCompressor({
      file: file,
      quality: quality,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      redressOrientation: false,
      // 压缩前回调
      beforeCompress: function (result) {
        console.log('压缩之前图片尺寸大小: ', result.size)
        console.log('mime 类型: ', result.type)
      },

      success: function (result) {
        console.log('压缩之后图片尺寸大小: ', result.size)
        console.log('mime 类型: ', result.type)
        console.log('实际压缩率： ', ((file.size - result.size) / file.size * 100).toFixed(2) + '%')
        resolve(result)
      },
      error (e) {
        reject(e)
      }
    })
  })
}

