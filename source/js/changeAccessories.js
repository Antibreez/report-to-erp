import { makeTotalTable } from "./totalTable";

const REFNETS_DRQ = {
  "KHRQM22M20T": "DRQ22M20T",
  "KHRQM22M29T": "DRQ22M29T",
  "KHRQM22M64T": "DRQ22M64T",
  "KHRQM22M75T": "DRQ22M75T",
  "KHRQM23M20T": "DRQ23M20T",
  "KHRQM23M29T9": "DRQ23M29T",
  "KHRQM23M64T": "DRQ23M64T",
  "KHRQM23M75T": "DRQ23M75T",
};

const REFNETS_KHRQ = {
  "DRQ22M20T": "KHRQM22M20T",
  "DRQ22M29T": "KHRQM22M29T9",
  "DRQ22M64T": "KHRQM22M64T",
  "DRQ22M75T": "KHRQM22M75T",
  "DRQ23M20T": "KHRQM23M20T",
  "DRQ23M29T": "KHRQM23M29T9",
  "DRQ23M64T": "KHRQM23M64T",
  "DRQ23M75T": "KHRQM23M75T",
};

const CONTROLLERS = ["BRC1D52", "BRC1H52W", "BRC1H52S", "BRC1H52K", "DC60W"];

const $resultTable = $(".result table");
const $refnetInput = $(".result-block__refnets input");
const $controllersInput = $(".result-block__controllers input");

function changeRefnetCells(data) {
  $resultTable.find("tr").each((index, item) => {
    const $cell = $(item).find("td").eq(1).children();

    const text = $cell.text();

    if (data[text]) {
      $cell.text(data[text]);
    }
  });
}

function changeControllerCells(value) {
  $resultTable.find("tr").each((index, item) => {
    const $cell = $(item).find("td").eq(1).children();

    const text = $cell.text();

    if (CONTROLLERS.includes(text)) {
      $cell.text(value);
    }
  });
}

export function changeRefnets() {
  const data = $refnetInput.is(":checked") ? REFNETS_DRQ : REFNETS_KHRQ;

  changeRefnetCells(data);
  makeTotalTable();
}

function changeControllers(e) {
  const value = $(e.target).val();

  changeControllerCells(value);
  makeTotalTable();
}

export function resetRefnetsCheckbox() {
  $refnetInput.prop("checked", false);
}

export function resetControllers() {
  $controllersInput.first().prop("checked", true);
}

$refnetInput.on("change", changeRefnets);
$controllersInput.on("change", changeControllers);
