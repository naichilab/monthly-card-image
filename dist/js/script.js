"use strict";
exports.__esModule = true;
var html2canvas_min_js_1 = require("html2canvas/dist/html2canvas.min.js");
function formatDate(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
    return format;
}
function getMonthName(month) {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months[month - 1];
}
function setCurrentMonth() {
    var monthInput = (document.getElementsByClassName("js_monthInput")[0]);
    monthInput.value = formatDate(new Date(), "yyyy-MM");
    monthInput.value = "2022-12";
    selectedMonthChanged();
}
function getInputMonthValue() {
    return document.getElementsByClassName("js_monthInput")[0]
        .value;
}
function selectedMonthChanged() {
    var inputValue = getInputMonthValue();
    if (inputValue == "") {
        (document.getElementsByClassName("js_downloadButton")[0]).disabled = true;
    }
    else {
        var year = Number(inputValue.substr(0, 4));
        var month = Number(inputValue.substr(5, 2));
        document.getElementsByClassName("js_monthLabel")[0].innerHTML =
            getMonthName(month);
        document.getElementsByClassName("js_month")[0].innerHTML = String(month);
        document.getElementsByClassName("js_year")[0].innerHTML = String(year);
        (document.getElementsByClassName("js_downloadButton")[0]).disabled = false;
    }
}
function downloadCardImage() {
    (0, html2canvas_min_js_1["default"])(document.querySelector("#capture"), {
        scale: 5
    }).then(function (canvas) {
        var downloadEle = document.createElement("a");
        downloadEle.href = canvas.toDataURL("image/png");
        downloadEle.download = "MonthlyCard_".concat(getInputMonthValue(), ".png");
        downloadEle.click();
    });
}
document.addEventListener("DOMContentLoaded", function () {
    setCurrentMonth();
});
