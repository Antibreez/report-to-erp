const $separateRadio = $("#separate-radio");
const $totalRadio = $("#total-radio");
const $result = $(".result-info");
const $totalResult = $(".result-total-info");

const showResult = () => {
  $result.show();
  $totalResult.hide();

  $separateRadio.addClass("active");
  $totalRadio.removeClass("active");
};

const showTotalResult = () => {
  $result.hide();
  $totalResult.show();

  $totalRadio.addClass("active");
  $separateRadio.removeClass("active");
};

$separateRadio.on("click", () => {
  if ($(this).hasClass("active")) return;

  showResult();
});

$totalRadio.on("click", () => {
  if ($(this).hasClass("active")) return;
  showTotalResult();
});
