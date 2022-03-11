import { makeTotalTable } from "./totalTable";

let focusedInputValue = 0;

////QUANTITY INPUT BLUR HANDLER
function onAmoutInputBlur(e) {
  const input = e.currentTarget;
  const multiplier = +input.value;

  if (multiplier !== focusedInputValue) {
    const $row = $(input).parents("tr").first();

    const idx = +$row.attr("data-idx");

    const $rows = $row.nextAll(`tr[data-idx="${idx}"]`).addBack();

    $rows.each((index, item) => {
      const $cell = $(item).children().eq(3).children();
      const initAmout = +$(item).children().eq(5).children().text();

      $cell.text(initAmout * multiplier);
    });

    makeTotalTable();
  }
}

////QUANTITY INPUT FOCUS HANDLER
function onAmoutInputFocus(e) {
  const input = e.currentTarget;
  focusedInputValue = +input.value;
}

const QuantityInputEventListeners = {
  add: () => {
    $(".result input").on("blur", onAmoutInputBlur);
    $(".result input").on("focus", onAmoutInputFocus);
  },
  remove: () => {
    $(".result input").off("blur", onAmoutInputBlur);
    $(".result input").off("focus", onAmoutInputFocus);
  },
};

export default QuantityInputEventListeners;
