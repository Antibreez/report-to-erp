import { MIDEA_PANELS } from "./midea_data";

let focusAmount = 0;

function onAmountFocus() {
  focusAmount = +$(this).val();
  $(this).trigger("select");
}

function onEnterPress(e) {
  if (e.which == 13) {
    $(e.currentTarget).trigger("blur");
  }
}

function getOneTypeRows($outdoorRow, name) {
  return $outdoorRow
    .nextAll(`tr[data-type="${name}"]`)
    .first()
    .nextUntil(function () {
      return $(this).attr("data-type") !== name;
    })
    .addBack();
}

function recalcPanels($outdoorRow, panels) {
  const $panelRows = getOneTypeRows($outdoorRow, "panel");

  $panelRows.each((idx, row) => {
    const name = $(row).find("[data-type='name']").text();
    const $amount = $(row).find("[data-type='amount']");

    const amount = panels[name];

    if (amount) {
      $amount.text(amount);
      $(row).removeClass("noExl");
      $(row).removeAttr("style");
    } else {
      $(row).addClass("noExl");
      $(row).css("display", "none");
    }
  });
}

function recalcCotrollers($outdoorRow, amount) {
  const $controllerRows = getOneTypeRows($outdoorRow, "controller");

  $controllerRows.each((idx, row) => {
    $(row).find('[data-type="amount"]').text(amount);

    if (idx > 0) {
      $(row).find('[dat-type="amount"]').text(0);
    }
  });
}

function onAmountBlur() {
  if ($(this).val() !== focusAmount) {
    const $row = $(this).parents("tr").first();
    const $outdoorRow = $row
      .prevAll('[data-type="outdoor"]')
      .first()
      .prevUntil(function () {
        return $(this).attr("data-type") !== "outdoor";
      })
      .addBack()
      .first();

    //const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
    //const $amountCell = $outdoorRow.find(".ODUstatus span:first-child b");
    const $loadAlarmCell = $outdoorRow.find(".maxLoadExceed b");
    const $indoorsAlarmCell = $outdoorRow.find(".maxIndoorsExceed b");

    const systemAmount = +$row.attr("data-systems");
    const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
    const maxIDU = +$outdoorRow.attr("data-outdoor-maxamount");

    let totalIndex = 0;
    let totalAmount = 0;
    const panels = {};

    MIDEA_PANELS.forEach((panel) => {
      panels[panel] = 0;
    });

    $(this)
      .parent()
      .prev('[data-type="amount"]')
      .text($(this).val() * systemAmount);

    const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

    $indoorRows.each((idx, row) => {
      const amount = +$(row).children('[data-type="amount"]').text();
      totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);
      totalAmount += amount / systemAmount;

      const panel = $(row).attr("data-indoor-panel");

      if (panel) panels[panel] += amount;
    });

    const newLoad = Math.round((totalIndex / maxIndx) * 130);
    //$loadCell.text(`${newLoad}%`);
    if (totalIndex > maxIndx) {
      $outdoorRow.addClass("maxLoadExceed");
      $loadAlarmCell.text(`Загрузка ${newLoad}%`);
      //$loadCell.parent().addClass("alarm");
    } else {
      //$loadCell.parent().removeClass("alarm");
      $outdoorRow.removeClass("maxLoadExceed");
      $loadAlarmCell.text(``);
    }

    //$amountCell.text(`${totalAmount} / ${maxIDU}`);
    if (totalAmount > maxIDU) {
      //$amountCell.parent().addClass("alarm");
      $outdoorRow.addClass("maxIndoorsExceed");
      $indoorsAlarmCell.text(`Макс. ВБ ${totalAmount}/${maxIDU}`);
    } else {
      //$amountCell.parent().removeClass("alarm");
      $outdoorRow.removeClass("maxIndoorsExceed");
      $indoorsAlarmCell.text(``);
    }

    recalcPanels($outdoorRow, panels);

    // const $panelRows = $row.parents("table").find(`tr[data-type="panel"][data-systemid="${systemId}"]`);
    // const $panelRows = getOneTypeRows($outdoorRow, "panel");

    // $panelRows.each((idx, row) => {
    //   const name = $(row).find("[data-type='name']").text();
    //   const $amount = $(row).find("[data-type='amount']");

    //   const amount = panels[name];

    //   if (amount) {
    //     $amount.text(amount);
    //     $(row).removeClass("noExl");
    //     $(row).removeAttr("style");
    //   } else {
    //     $(row).addClass("noExl");
    //     $(row).css("display", "none");
    //   }
    // });

    //const $controllerRows = $row.parents("table").find(`tr[data-type="controller"][data-systemid="${systemId}"]`);
    recalcCotrollers($outdoorRow, totalAmount * systemAmount);

    // const $controllerRows = getOneTypeRows($outdoorRow, "controller");

    // $controllerRows.each((idx, row) => {
    //   $(row)
    //     .find('[data-type="amount"]')
    //     .text(totalAmount * systemAmount);

    //   if (idx > 0) {
    //     $(row).find('[dat-type="amount"]').text(0);
    //   }
    // });
  }
}

function onIndoorChange() {
  const $row = $(this).parents("tr").first();
  const $outdoorRow = $row
    .prevAll('[data-type="outdoor"]')
    .first()
    .prevUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .addBack()
    .first();

  //const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
  const $loadAlarmCell = $outdoorRow.find(".maxLoadExceed b");

  const systemAmount = +$row.attr("data-systems");
  const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
  let totalIndex = 0;
  const panels = {};

  MIDEA_PANELS.forEach((panel) => {
    panels[panel] = 0;
  });

  const $nameCell = $(this).parents("td").siblings('[data-type="name"]');
  $nameCell.text($(this).val());
  $row.attr("data-indoor-indx", $("option:selected", this).attr("data-indoor-indx"));
  $row.attr("data-indoor-type", $("option:selected", this).attr("data-indoor-type"));
  const panelAttr = $("option:selected", this).attr("data-indoor-panel");
  const indoorType = $row.attr("data-indoor-type");
  const indoorInitType = $row.attr("data-indoor-init-type");
  const indoorIndx = +$row.attr("data-indoor-indx");
  const indoorInitIndx = +$row.attr("data-indoor-init-indx");

  if (panelAttr) {
    $row.attr("data-indoor-panel", panelAttr);
  } else {
    $row.removeAttr("data-indoor-panel");
  }

  indoorType !== indoorInitType ? $row.addClass("wrongType") : $row.removeClass("wrongType");
  indoorIndx > indoorInitIndx ? $row.addClass("overload") : $row.removeClass("overload");
  indoorIndx < indoorInitIndx ? $row.addClass("underload") : $row.removeClass("underload");

  const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

  $indoorRows.each((idx, row) => {
    const amount = +$(row).children('[data-type="amount"]').text();
    totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);

    const panel = $(row).attr("data-indoor-panel");

    if (panel) panels[panel] += amount;
  });

  const newLoad = Math.round((totalIndex / maxIndx) * 130);
  //$loadCell.text(`${newLoad}%`);
  if (totalIndex > maxIndx) {
    //$loadCell.parent().addClass("alarm");
    $outdoorRow.addClass("maxLoadExceed");
    $loadAlarmCell.text(`Загрузка ${newLoad}%`);
  } else {
    //$loadCell.parent().removeClass("alarm");
    $outdoorRow.removeClass("maxLoadExceed");
    $loadAlarmCell.text(``);
  }

  recalcPanels($outdoorRow, panels);

  // const $panelRows = getOneTypeRows($outdoorRow, "panel");

  // $panelRows.each((idx, row) => {
  //   const name = $(row).find("[data-type='name']").text();
  //   const $amount = $(row).find("[data-type='amount']");

  //   const amount = panels[name];

  //   if (amount) {
  //     $amount.text(amount);
  //     $(row).removeClass("noExl");
  //     $(row).removeAttr("style");
  //   } else {
  //     $(row).addClass("noExl");
  //     $(row).css("display", "none");
  //   }
  // });
}

function onAddNewRow() {
  const $row = $(this).parents("tr").first();
  const $newRow = $row.clone(true);

  const $delBtn = $(`<button>Удалить</button>`);
  $delBtn.on("click", onRemoveRow);

  $newRow.find("td.oldName").text("");
  $newRow.find("td.add-delete-block").empty();
  $newRow.find("td.add-delete-block").append($delBtn);
  $row.after($newRow);

  const $outdoorRow = $row
    .prevAll('[data-type="outdoor"]')
    .first()
    .prevUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .addBack()
    .first();

  const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
  const $amountCell = $outdoorRow.find(".ODUstatus span:first-child b");

  const systemAmount = +$row.attr("data-systems");
  const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
  const maxIDU = +$outdoorRow.attr("data-outdoor-maxamount");

  let totalIndex = 0;
  let totalAmount = 0;
  const panels = {};

  MIDEA_PANELS.forEach((panel) => {
    panels[panel] = 0;
  });

  const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

  $indoorRows.each((idx, row) => {
    const amount = +$(row).children('[data-type="amount"]').text();
    totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);
    totalAmount += amount / systemAmount;

    const panel = $(row).attr("data-indoor-panel");

    if (panel) panels[panel] += amount;
  });

  const newLoad = Math.round((totalIndex / maxIndx) * 130);
  $loadCell.text(`${newLoad}%`);
  if (totalIndex > maxIndx) {
    $loadCell.parent().addClass("alarm");
  } else {
    $loadCell.parent().removeClass("alarm");
  }

  $amountCell.text(`${totalAmount} / ${maxIDU}`);
  if (totalAmount > maxIDU) {
    $amountCell.parent().addClass("alarm");
  } else {
    $amountCell.parent().removeClass("alarm");
  }

  recalcPanels($outdoorRow, panels);
  recalcCotrollers($outdoorRow, totalAmount * systemAmount);
}

function onRemoveRow() {
  const $row = $(this).parents("tr").first();

  const $outdoorRow = $row
    .prevAll('[data-type="outdoor"]')
    .first()
    .prevUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .addBack()
    .first();

  $row.empty();
  $row.remove();

  const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
  const $amountCell = $outdoorRow.find(".ODUstatus span:first-child b");

  const systemAmount = +$row.attr("data-systems");
  const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
  const maxIDU = +$outdoorRow.attr("data-outdoor-maxamount");

  let totalIndex = 0;
  let totalAmount = 0;
  const panels = {};

  MIDEA_PANELS.forEach((panel) => {
    panels[panel] = 0;
  });

  const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

  $indoorRows.each((idx, row) => {
    const amount = +$(row).children('[data-type="amount"]').text();
    totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);
    totalAmount += amount / systemAmount;

    const panel = $(row).attr("data-indoor-panel");

    if (panel) panels[panel] += amount;
  });

  const newLoad = Math.round((totalIndex / maxIndx) * 130);
  $loadCell.text(`${newLoad}%`);
  if (totalIndex > maxIndx) {
    $loadCell.parent().addClass("alarm");
  } else {
    $loadCell.parent().removeClass("alarm");
  }

  $amountCell.text(`${totalAmount} / ${maxIDU}`);
  if (totalAmount > maxIDU) {
    $amountCell.parent().addClass("alarm");
  } else {
    $amountCell.parent().removeClass("alarm");
  }

  recalcPanels($outdoorRow, panels);
  recalcCotrollers($outdoorRow, totalAmount * systemAmount);
}

function addEventListeners() {
  const $selectIndoor = $(".result__midea-excel-table table .select-indoor");
  const $amountInput = $(".result__midea-excel-table table .input-amount");
  const $addBtn = $(".result__midea-excel-table table .add-new");

  $selectIndoor.on("change", onIndoorChange);
  $amountInput.on("focus", onAmountFocus);
  $amountInput.on("blur", onAmountBlur);
  $amountInput.on("keypress", onEnterPress);
  $addBtn.on("click", onAddNewRow);
}

const mideaEvents = {
  add: addEventListeners,
};

export default mideaEvents;
