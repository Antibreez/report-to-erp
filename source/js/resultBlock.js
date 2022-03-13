const $radioBtn = $(".result-block__radios button");
const $resultInfo = $(".result-info");
const $resultTotalInfo = $(".result-total-info");
const $accessories = $(".result-block__accessories");

function show() {
  $radioBtn.removeAttr("disabled");
  $radioBtn.first().addClass("active");
  $radioBtn.last().removeClass("active");
  $resultInfo.show();
  $resultTotalInfo.hide();
  $accessories.show();
}

function hide() {
  $radioBtn.attr("disabled", "true");
  $radioBtn.first().removeClass("active");
  $radioBtn.last().removeClass("active");
  $resultInfo.hide();
  $resultTotalInfo.hide();
  $accessories.hide();
}

export const resultBlock = {
  show,
  hide,
};
