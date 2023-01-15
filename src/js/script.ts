import html2canvas from "html2canvas";

function formatDate(date: Date, format: string) {
  format = format.replace(/yyyy/g, String(date.getFullYear()));
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
}

function getMonthName(month: number) {
  const months = [
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
  let monthInput = <HTMLInputElement>(
    document.getElementsByClassName("js_monthInput")[0]
  );
  monthInput.value = formatDate(new Date(), "yyyy-MM");
  monthInput.value = "2022-12";
  selectedMonthChanged();
}

function getInputMonthValue() {
  return (<HTMLInputElement>document.getElementsByClassName("js_monthInput")[0])
    .value;
}

function selectedMonthChanged() {
  const inputValue = getInputMonthValue();

  if (inputValue == "") {
    (<HTMLInputElement>(
      document.getElementsByClassName("js_downloadButton")[0]
    )).disabled = true;
  } else {
    const year = Number(inputValue.substr(0, 4));
    const month = Number(inputValue.substr(5, 2));

    document.getElementsByClassName("js_monthLabel")[0].innerHTML =
      getMonthName(month);
    document.getElementsByClassName("js_month")[0].innerHTML = String(month);
    document.getElementsByClassName("js_year")[0].innerHTML = String(year);
    (<HTMLInputElement>(
      document.getElementsByClassName("js_downloadButton")[0]
    )).disabled = false;
  }
}

function downloadCardImage() {
  html2canvas(<HTMLElement>document.querySelector("#capture"), {
    scale: 5,
  }).then((canvas) => {
    let downloadEle = document.createElement("a");
    downloadEle.href = canvas.toDataURL("image/png");
    downloadEle.download = `MonthlyCard_${getInputMonthValue()}.png`;
    downloadEle.click();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setCurrentMonth();

  document
    .getElementsByClassName("js_monthInput")[0]
    .addEventListener("change", (event) => {
      selectedMonthChanged();
    });

  document
    .getElementsByClassName("js_downloadButton")[0]
    .addEventListener("click", (event) => {
      downloadCardImage();
    });
});
