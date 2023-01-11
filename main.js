function changed() {
    alert("hoge")
}

function download() {
    html2canvas(document.querySelector("#capture"), {
        scale: 5
    }).then(canvas => {
        let downloadEle = document.createElement("a");
        downloadEle.href = canvas.toDataURL("image/png");
        downloadEle.download = "canvas.png";
        downloadEle.click();
    });
}


document.addEventListener('DOMContentLoaded', function () {

});