import midea from "./midea";
import { MIDEA_INDOORS, MIDEA_OUTDOORS } from "./midea_data";
import mideaEvents from "./mideaEvents";

let amountColumnId = -1;

function getUsefullArr(data) {
  // console.log("#####data: ", removeEmptyCells(data));
  // console.log("#####data: ", data);

  const newData = removeEmptyCells(data);
  console.log("####data: ", newData);

  const x = newData.findIndex((item) => {
    return item.includes("Наименование");
  });

  const y = newData[x].findIndex((item) => {
    return item.includes("Оборудование");
  });

  amountColumnId = y + 1;

  const idx = newData.findIndex((item) => {
    return item.includes("Цена");
  });

  const idx2 = newData.findIndex((item) => {
    const id = item.findIndex((el) => {
      if (!el) return false;
      el += "";
      return el.includes("Итого");
    });

    return id > -1;
  });

  if (idx === -1 || idx2 === -1 || idx2 < idx) {
    return null;
  } else {
    return newData.slice(idx + 1, idx2);
  }
}

function removeEmptyCells(matrix) {
  const newMatrix = [];

  matrix.forEach((row) => {
    const newRow = row.filter((el) => {
      return el;
    });

    newMatrix.push(newRow);
  });

  return newMatrix;
}

function getOriginalTableFromDoc(data) {
  let currentTable = "";
  let newTable = "";

  let map = [];
  let system = [];

  const usefullArr = getUsefullArr(data);

  if (!usefullArr) return [currentTable, newTable];

  usefullArr.forEach((item, idx) => {
    // const $row = $("<tr></tr>");
    // const $title = $("<td></td>");
    // const $name = $("<td></td>");
    // const $empty = $("<td></td>");
    // const $amount = $("<td></td>");

    let title = "";
    let name = "";
    let amount = "";

    if (idx > 0 && usefullArr[idx - 1].length === 1) {
      if (system.length > 0) {
        map.push(system.slice());
        system = [];
      }

      //$title.text(usefullArr[idx - 1][0]);

      title = usefullArr[idx - 1][0];
    }

    if (item.length > 1) {
      const nameCell = item[1];
      const amountCell = item[amountColumnId];
      // $name.text(nameCell.split(" ").slice(-1));
      // $amount.text(amountCell);

      name = nameCell.split(" ").slice(-1)[0];
      amount = amountCell;

      // $row.append($title);
      // $row.append($name);
      // $row.append($empty);
      // $row.append($amount);
      //currentTable += $row.prop("outerHTML");

      system.push({
        title,
        name,
        amount,
        done: false,
      });

      if (idx === usefullArr.length - 1) {
        map.push(system.slice());
      }
    }
  });

  const $titleRow = $('<tr class="noExl"></tr>');
  $titleRow.append($("<th>Название системы</th>"));
  $titleRow.append($("<th>Исх. наименование</th>"));
  $titleRow.append($("<th>Наименование</th>"));
  $titleRow.append($("<th></th>"));
  $titleRow.append($("<th>Кол-во<br/>общ.</th>"));
  $titleRow.append($("<th>Кол-во<br/>1 сист.</th>"));
  $titleRow.append($("<th></th>"));
  $titleRow.append($("<th></th>"));
  newTable += $titleRow.prop("outerHTML");

  map.forEach((system, systemIdx) => {
    const newSystem = midea.getNewSystem(system);

    system.forEach((el) => {
      const $row = $(`<tr class='${el.done ? "" : "alarm"}'></tr>`);
      const $title = $(`<td>${el.title}</td>`);
      const $name = $(`<td>${el.name}</td>`);
      const $empty = $(`<td></td>`);
      const $amount = $(`<td>${el.amount}</td>`);
      $row.append($title);
      $row.append($name);
      $row.append($empty);
      $row.append($amount);
      currentTable += $row.prop("outerHTML");
    });

    const info = newSystem.info;
    const load = Math.round((info.totalIndex / info.maxIndex) * 130);

    if (newSystem.rows.length > 0) {
      newSystem.rows.forEach((el, idx) => {
        const $row = $(`<tr
          data-systemid='${systemIdx}'
          data-systems='${info.systemsAmount}'
        ></tr>`);

        console.log("####indoorInitIndx", el.indoorInitIndx);

        el.type === "joint" && $row.addClass("joint");
        //el.alarm && $row.addClass(el.alarm);
        el.type && $row.attr("data-type", el.type);
        el.indoorIndx && $row.attr("data-indoor-indx", el.indoorIndx);
        el.indoorType && $row.attr("data-indoor-type", el.indoorType);
        el.indoorInitIndx && $row.attr("data-indoor-init-indx", el.indoorInitIndx);
        el.indoorInitType && $row.attr("data-indoor-init-type", el.indoorInitType);
        el.oldIndoor && $row.attr("data-indoor-init-name", el.oldIndoor);
        el.panel && $row.attr("data-indoor-panel", el.panel);
        el.outdoorMaxIndx && $row.attr("data-outdoor-maxindx", el.outdoorMaxIndx);
        el.outdoorMaxIDU && $row.attr("data-outdoor-maxamount", el.outdoorMaxIDU);
        el.outdoorType && $row.attr("data-outdoor-type", el.outdoorType);
        el.fullName && $row.attr("data-outdoor-fullname", el.fullName);

        // const $ODUstatus = $('<td class="noExl ODUstatus"></td>');

        // if (idx === 0) {
        //   $ODUstatus.append(
        //     `<span class='${info.totalAmount > info.maxAmount ? "alarm" : ""}'>
        //       В/Б <b>${info.totalAmount} / ${info.maxAmount}</b>
        //     </span>`
        //   );

        //   $ODUstatus.append(
        //     `<span class='${load > 130 ? "alarm" : ""}'>
        //       <b>${load}%</b>
        //     </span>`
        //   );
        // }

        const $title = $(`<td>${el.title}</td>`);
        const $name = $(`<td data-type="name">${el.name}</td>`);

        const $oldName = $(`<td class='noExl oldName'>${el.oldIndoor ? "(" + el.oldIndoor + ")" : ""}</td>`);
        if (el.oldIndoor) {
          $oldName.text(`(${el.oldIndoor}) ${el.amount / info.systemsAmount} шт.`);
        }

        const $empty = $(`<td></td>`);
        const $amount = $(`<td data-type='amount'>${el.amount}</td>`);
        const $amountSingle = $(`<td class='noExl' data-type='amount-single'></td>`);
        const $select = $('<td class="noExl select"></td>');

        if (el.type === "panel" && el.amount === 0) {
          $row.addClass("noExl");
          $row.css("display", "none");
        }

        if (el.type === "outdoorJoint" && el.amount === 0) {
          $row.addClass("noExl");
          $row.css("display", "none");
        }

        let currentLoad = "";
        let currentIndoors = "";

        if (el.type === "outdoor" && idx === 0) {
          $row.attr("data-total-indx", info.totalIndex);
          $row.attr("data-total-amount", info.totalAmount);

          if (info.totalAmount > info.maxAmount) {
            currentIndoors = `${info.totalAmount}/${info.maxAmount}`;
            $row.addClass("maxIndoorsExceed");
          }

          if (load > 130) {
            currentLoad = `${load}%`;
            $row.addClass("maxLoadExceed");
          }

          const $selectInner = $(`<select class='select-outdoor'></select>`);

          const outdoors = MIDEA_OUTDOORS;

          Object.keys(outdoors).forEach((key) => {
            const $group = $(`<optgroup label='${outdoors[key].title}'></optgroup>`);
            const units = outdoors[key].units;
            Object.keys(units).forEach((elKey) => {
              const $option = $(`
                <option
                  value='${units[elKey].modules.join(",")}' ${units[elKey].name === el.fullName ? "selected" : ""}
                  data-outdoor-maxindx='${units[elKey].maxINDEX}'
                  data-outdoor-maxamount='${units[elKey].maxIDU}'
                  data-outdoor-type='${units[elKey].type}'
                  data-outdoor-joint='${units[elKey].joint}'
                >${units[elKey].name}</option>
              `);

              units[elKey].panel && $option.attr("data-indoor-panel", units[elKey].panel);
              $group.append($option);
            });
            $selectInner.append($group);
          });

          $select.append($selectInner);
        }

        if (el.type === "indoor") {
          if (el.indoorIndx > el.indoorInitIndx) {
            $row.addClass("overload");
          }

          if (el.indoorIndx < el.indoorInitIndx) {
            $row.addClass("underload");
          }

          if (el.indoorType !== el.indoorInitType) {
            $row.addClass("wrongType");
          }

          $amountSingle.append(`<input type='number' class='input-amount' value='${el.amount / info.systemsAmount}'></input>`);

          const $selectInner = $(`<select class='select-indoor'></select>`);

          const indoors = info.type === "atom" ? MIDEA_INDOORS.atom : MIDEA_INDOORS.general;

          Object.keys(indoors).forEach((key) => {
            const $group = $(`<optgroup label='${indoors[key].title}'></optgroup>`);
            const units = indoors[key].units;
            Object.keys(units).forEach((elKey) => {
              const $option = $(`
                <option
                  value='${units[elKey].name}' ${units[elKey].name === el.name ? "selected" : ""}
                  data-indoor-indx='${units[elKey].indx}'
                  data-indoor-type='${units[elKey].type}'
                >${units[elKey].name}</option>
              `);

              units[elKey].panel && $option.attr("data-indoor-panel", units[elKey].panel);
              $group.append($option);
            });
            $selectInner.append($group);
          });

          $select.append($selectInner);
        }

        // const $addNewRow = $('<td class="noExl add-delete-block"></td>');

        // if (el.type === "indoor") {
        //   $addNewRow.append('<button class="add-new">Дублировать строку</button>');
        // }

        const $status = $(`<td class="noExl status">
          <div class="status-inner">
            <div class="overload"><b>индекс блока больше исходного</b></div>
            <div class="underload"><b>индекс блока меньше исходного</b></div>
            <div class="wrongType"><b>тип блока отличается от исходного</b></div>
            <div class="maxLoadExceed"><b>Загрузка ${currentLoad}</b></div>
            <div class="maxIndoorsExceed"><b>Макс. ВБ ${currentIndoors}</b></div>
          </div>
        </td>`);

        //$row.append($ODUstatus);
        $row.append($title);
        $row.append($oldName);
        $row.append($name);
        $row.append($empty);
        $row.append($amount);
        $row.append($amountSingle);
        $row.append($select);
        //$row.append($addNewRow);
        $row.append($status);
        newTable += $row.prop("outerHTML");
      });
    }
  });

  return [currentTable, newTable];
}

function renderTable(tables) {
  if (tables[0]) {
    $(".result__another-excel-table table").append(tables[0]);
  }

  if (tables[1]) {
    $(".result__midea-excel-table table").append(tables[1]);
  }

  mideaEvents.add();
}

// $(".upload__close-refresh").on("click", function () {
//   location.reload();
// });

const vrf = {
  getOriginalTableFromDoc,
  renderTable,
};

export default vrf;

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
