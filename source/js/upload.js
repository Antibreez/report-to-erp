const uploads = document.querySelectorAll(".upload");

$loader = $(".loader");
$loaderBar = $loader.find(".loader__bar");
$loaderCountCurrent = $loader.find(".loader__count-current");
$loaderCountMax = $loader.find(".loader__count-max");
$loaderCurrentName = $loader.find(".loader__filename span");

$("#button").on("click", function () {
  $(".result table").table2excel();
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  e.currentTarget.classList.add("highlight");
}

function unhighlight(e) {
  e.currentTarget.classList.remove("highlight");
}

function getResultBlock(input) {
  const $idx = $(input).parent().attr("data-input");
  return $(input)
    .parents(".upload")
    .find("[data-result='" + $idx + "']");
}

function fillResult(input) {
  const $result = getResultBlock(input);
  const $name = $result.find(".upload__name");
  $name.text("Файлы загружены");
}

function showResult(input) {
  const $result = getResultBlock(input);
  $result.addClass("show");
}

function hideResult(input) {
  const $result = getResultBlock(input);
  $result.removeClass("show");
}

function showLabel(input) {
  const $label = $(input).parent();
  $label.removeClass("hidden");
}

function hideLabel(input) {
  const $label = $(input).parent();
  $label.addClass("hidden");
}

function addLoader(files) {
  for (let i = 0; i < files.length; i++) {
    $loaderBar.append($("<div></div>"));
  }
  $loaderCountCurrent.text(0);
  $loaderCountMax.text(files.length);
  setLoaderName(files[0]);
  $loader.addClass("shown");
}

function setLoaderName(file) {
  $loaderCurrentName.text(file.name);
}

function setLoaderStage(num) {
  $loaderBar.find("div").eq(num).addClass("active");
  $loaderCountCurrent.text(num + 1);
}

function removeLoader() {
  $loader.removeClass("shown");
  $loaderBar.html("");
  $loaderCountCurrent.text("");
  $loaderCountMax.text("");
  $loaderCurrentName.text("");
}

function getUsefullPart($el) {
  const ru1 = "Информация о хладагенте";
  const ru2 = "Схемы фреонопроводов";
  const en1 = "Refrigerant information";
  const en2 = "Piping diagrams";

  const $refRu = $el.find(`h2:contains(${ru1})`);
  const $refEn = $el.find(`h2:contains(${en1})`);

  if ($refRu.length === 0 && $refEn.length === 0) return null;

  return $el
    .find(`h2:contains(${$refRu.length > 0 ? ru1 : en1})`)
    .next("table")
    .nextUntil(`h1:contains(${$refRu.length > 0 ? ru2 : en2})`);
}

function readmultifiles(input, files) {
  var reader = new FileReader();

  function readFile(index) {
    if (index >= files.length) return;

    var file = files[index];

    reader.onloadstart = function (e) {
      if (index === 0) {
        console.log("load started");
        addLoader(files);
      }
    };

    reader.onprogress = function (e) {
      console.log("load in progress");
      console.log(e.loaded);
      console.log(e);
    };

    reader.onload = function (e) {
      const result = mammoth
        .convertToHtml({
          arrayBuffer: reader.result,
        })
        .then((res) => {
          const $doc = $("<div></div>");
          $doc.append(res.value);

          //const $totalTableFromDoc = $doc.find("table").first();
          const usefullPart = getUsefullPart($doc);

          if (usefullPart === null) {
            alert(`
Ошибка!
Несоответствие содержимого файла:
"${file.name}"
            `);
            removeLoader();
            $("#button").removeAttr("disabled");
            $(".upload__close").trigger("click");
            return;
          }

          const $tables = $("<div></div>").append(usefullPart);

          console.log($tables[0]);
          $(".result").append(makeTable($tables));

          if (index < files.length - 1) {
            setLoaderName(files[index + 1]);
          }

          setLoaderStage(index);

          if (index === files.length - 1) {
            hideLabel(input);
            fillResult(input);
            showResult(input);
            $("#button").removeAttr("disabled");

            setTimeout(() => {
              removeLoader();
            }, 1000);
          }

          readFile(index + 1);
        });
    };

    reader.readAsArrayBuffer(file);
  }

  readFile(0);
}

const readUrl = (input) => {
  console.log(input.files.length);

  if (input.files && input.files[0]) {
    readmultifiles(input, input.files);
  }
};

////////////////////////////
function makeTable($tables) {
  const $newTable = $("<table></table>");

  $tables.find("table").each((idx, item) => {
    const title = $(item).prev().text();
    $(item)
      .find("tr")
      .each((i, row) => {
        if (i === 0) return;

        const $cells = $(row).find("td");
        $cells.eq(2).remove();
        $("<td></td>").insertAfter($cells.first());

        const $newCell = $("<td></td>");

        if (i === 1) {
          $newCell.text(title);
        }

        $(row).prepend($newCell);
        $newTable.append($(row));
      });
  });

  return $newTable;
}

const onFileChange = (e) => {
  readUrl(e.currentTarget);
  console.log(e.currentTarget);
};

function onFileDrop(input) {
  readUrl(input);
}

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
  onFileDrop(input);
}

function onFileClear(e) {
  const $target = $(e.currentTarget);
  const $result = $target.parents(".upload__result");
  const $idx = $result.attr("data-result");
  const $label = $result.parents(".upload").find("[data-input='" + $idx + "']");
  const input = $label.children("input")[0];

  const $block = $target.parents(".upload");

  if ($block.hasClass("multi")) {
    setIds($result, $idx);

    $result.remove();
    $label.remove();
  } else {
    input.value = "";

    if (!/safari/i.test(navigator.userAgent)) {
      input.type = "";
      input.type = "file";
    }

    $label.removeClass("hidden");
    $result.removeClass("show");
    $("#button").attr("disabled", true);
    $(".result").html("");
  }
}

function addEventListeners($inputLabel, $result) {
  const input = $inputLabel.children("input")[0];
  const inputLabel = $inputLabel[0];
  const fileClearBtn = $result.find(".upload__close")[0];

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, preventDefaults, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, unhighlight, false);
  });

  inputLabel.addEventListener("drop", handleDrop, false);
  input.addEventListener("change", onFileChange);
  fileClearBtn.addEventListener("click", onFileClear);
}

uploads.forEach(function (upload) {
  const $inputLabel = $(upload).find(".upload__label");
  const $result = $(upload).find(".upload__result");

  if (!$(upload).hasClass("disabled")) {
    addEventListeners($inputLabel, $result);
  }
});
