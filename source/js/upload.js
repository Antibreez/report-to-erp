import { loader } from "./fileLoader";
import { makeTotalTable, clearTotalTable } from "./totalTable";
import quantityInputEventListeners from "./quantityInputEventListeners";
import { getTablesFromDoc, makeSeparateTable, clearSeparateTable } from "./separateTable";
import { totalSystems } from "./globalData";
import { resultLabel } from "./resultLabel";
import { dropdownEvents } from "./dropdownEvents";
import { resultBlock } from "./resultBlock";
import { resetRefnetsCheckbox } from "./changeAccessories";
import { resetControllers } from "./changeAccessories";
import { modal } from "./errorModal";
import ppd from "./ppd";
import vrf from "./vrfTable";
import * as XLSX from "xlsx";

const uploads = document.querySelectorAll(".upload");

function onLastFileLoaded() {
  resultLabel.show();

  if ($(".result__midea table").find("tr").length > 0) {
    $(".result__midea").show();
  }

  if ($(".result table").find("tr").length > 0) {
    resultBlock.show();

    // $(".result-block__radios button").removeAttr("disabled");
    // $(".result-block__radios button").first().addClass("active");
    // $(".result-info").show();
    // $(".result-block__accessories").show();

    makeTotalTable();

    quantityInputEventListeners.remove();
    quantityInputEventListeners.add();
  }

  setTimeout(() => {
    loader.remove();
    modal.isNeededToShow() && modal.show();
  }, 1000);
}

////FUNCTION FOR MULTIFILES INPUT
function readmultifiles(input, files) {
  var reader = new FileReader();

  resultLabel.resetNewFailedFileStatus();
  loader.add(files);

  function readFile(index) {
    if (index >= files.length) return;

    var file = files[index];

    reader.onloadstart = function (e) {
      if (index === 0) {
        console.log("load started", file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        //loader.add(files);
      }
    };

    reader.onprogress = function (e) {};

    // IF CONVERT WORD REPORT TO EXCEL
    if ($(".upload-page--word").length > 0) {
      reader.onload = function (e) {
        const result = mammoth
          .convertToHtml({
            arrayBuffer: reader.result,
          })
          .then((res) => {
            const $doc = $("<div></div>");
            $doc.append(res.value);
            const resultTables = getTablesFromDoc($doc, file);

            if (!resultTables) {
              resultLabel.addFailedFilename(file.name);
            }

            makeSeparateTable(resultTables);
            ppd.renderOptions();

            //render currently loading file name
            if (index < files.length - 1) {
              loader.setFileName(files[index + 1]);
            }

            //render files quantity progress
            loader.setStage(index);

            //on files loading finish
            if (index === files.length - 1) {
              onLastFileLoaded();
            }

            readFile(index + 1);
          })
          .catch((err) => {
            resultLabel.addFailedFilename(file.name);

            //render currently loading file name
            if (index < files.length - 1) {
              loader.setFileName(files[index + 1]);
            }

            //render files quantity progress
            loader.setStage(index);

            //on files loading finish
            if (index === files.length - 1) {
              onLastFileLoaded();
            }

            readFile(index + 1);
          });
      };

      reader.readAsArrayBuffer(file);
    }

    // IF CONVERT EXCEL TO EXCEL
    if ($(".upload-page--excel").length > 0) {
      reader.onload = function (e) {
        var data = new Uint8Array(reader.result);
        // var data = e.target.result;

        const makeWorkbook = new Promise((res, rej) => {
          const workbook = XLSX.read(data, {
            type: "array",
          });
          console.log(workbook);
          res(workbook);
          rej();
        });

        makeWorkbook.then(
          (value) => {
            const workbook = value;

            var sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
              header: 1,
            });

            const vrfTable = vrf.getOriginalTableFromDoc(sheet_data);

            if (!vrfTable[0]) {
              resultLabel.addFailedFilename(file.name);
            }

            vrf.renderTable(vrfTable);

            // const idx = sheet_data.findIndex((item) => {
            //   return item.includes("Наименование");
            // });

            // const idx2 = sheet_data.findIndex((item) => {
            //   const id = item.findIndex((el) => {
            //     if (!el) return false;
            //     el += "";
            //     return el.includes("Итого");
            //   });

            //   return id > -1;
            // });

            // const $table = $("<table><tbody></tbody></table>");

            // for (let i = idx + 2; i < idx2; i++) {
            //   const $row = $("<tr></tr>");
            //   const $title = $("<td></td>");
            //   const $name = $("<td></td>");
            //   const $empty = $("<td></td>");
            //   const $amount = $("<td></td>");

            //   if (i > 0 && sheet_data[i - 1].length === 1) {
            //     $title.text(sheet_data[i - 1][0]);
            //   }

            //   if (sheet_data[i].length > 1) {
            //     const nameCell = sheet_data[i][1];
            //     const amountCell = sheet_data[i][23];
            //     $name.text(nameCell.split(" ").slice(-1));
            //     $amount.text(amountCell);
            //     $row.append($title);
            //     $row.append($name);
            //     $row.append($empty);
            //     $row.append($amount);
            //     $table.append($row);
            //   }
            // }

            // $(".upload__another-excel-table").append($table);

            // console.log(idx, idx2);

            //render currently loading file name
            if (index < files.length - 1) {
              loader.setFileName(files[index + 1]);
            }

            //render files quantity progress
            loader.setStage(index);

            //on files loading finish
            if (index === files.length - 1) {
              onLastFileLoaded();
            }

            readFile(index + 1);
          },
          (e) => {
            console.log(e);
            resultLabel.addFailedFilename(file.name);

            //render currently loading file name
            if (index < files.length - 1) {
              loader.setFileName(files[index + 1]);
            }

            //render files quantity progress
            loader.setStage(index);

            //on files loading finish
            if (index === files.length - 1) {
              onLastFileLoaded();
            }

            readFile(index + 1);
          }
        );

        // var workbook = XLSX.read(data, {
        //   type: "array",
        // });
      };

      reader.onerror = function (ex) {
        console.log(ex);
      };

      reader.readAsArrayBuffer(file);
    }
  }

  readFile(0);
}

////READ INPUT FILES
const readUrl = (input) => {
  if (input.files && input.files[0]) {
    readmultifiles(input, input.files);
  }
};

///FILE CHANGE HANDLER
const onFileChange = (e) => {
  readUrl(e.currentTarget);
};

////FILE DROP HANDLER
function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  const target = e.currentTarget;
  const input = target.querySelector("input");

  if (input.files && input.files[0]) {
    input.value = "";

    if (!/safari/i.test(navigator.userAgent)) {
      input.type = "";
      input.type = "file";
    }
  }

  input.files = files;
  readUrl(input);
}

////CLEAR ALL FIELDS HANDLER
function onFileClear(e) {
  const $input = $(".upload__label input");

  $input[0].value = "";

  if (!/safari/i.test(navigator.userAgent)) {
    $input[0].type = "";
    $input[0].type = "file";
  }

  quantityInputEventListeners.remove();

  resultLabel.hide();

  resultBlock.hide();

  $(".result__midea").hide();
  $(".result__another-excel-table table").empty();
  $(".result__midea-excel-table table").empty();

  // $(".result-block__radios button").attr("disabled", "true");
  // $(".result-block__radios button").first().removeClass("active");
  // $(".result-block__radios button").last().removeClass("active");
  // $(".result-info").hide();
  // $(".result-total-info").hide();
  // $(".result-block__accessories").hide();

  clearSeparateTable();
  clearTotalTable();
  ppd.clearResult();
  //$(".result-total table").html("");
  resetRefnetsCheckbox();
  resetControllers();

  // $(".upload__failed-files-block").hide();
  // $(".upload__failed-files").html("");

  totalSystems.reset();
}

////ALL EVENT LISTENERS
function addEventListeners($inputLabel, $result) {
  const input = $inputLabel.children("input")[0];
  const inputLabel = $inputLabel[0];
  const fileClearBtn = $result.find(".upload__close")[0];

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.prevent, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.unhighlight, false);
  });

  inputLabel.addEventListener("drop", handleDrop, false);
  input.addEventListener("change", onFileChange);
  fileClearBtn.addEventListener("click", onFileClear);
}

////ADD EVENT LISTENERS
uploads.forEach(function (upload) {
  const $inputLabel = $(upload).find(".upload__label");
  const $result = $(upload).find(".upload__result");

  if (!$(upload).hasClass("disabled")) {
    addEventListeners($inputLabel, $result);
  }
});
