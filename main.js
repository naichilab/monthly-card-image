
function download() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
        let downloadEle = document.createElement("a");
        downloadEle.href = canvas.toDataURL("image/png");
        downloadEle.download = "canvas.png";
        downloadEle.click();
    });
} 