import { totalSystems } from "./globalData";

const outdoorJoints = [
  "bhfq22p1007",
  "bhfq22p1517",
  "bhfq23p907",
  "bhfq23p1357",
];

const outdoorUnits = ["rxysq8ty1", "rxysq10ty1", "rxysq12ty1"];

//let totalSystems = 0;

function getUsefullPartFromDoc($el) {
  const ru1 = "Информация о хладагенте";
  const ru2 = "Схемы фреонопроводов";
  const en1 = "Refrigerant information";
  const en2 = "Piping diagrams";

  const $refRu = $el.find(`h2:contains(${ru1})`);
  const $refEn = $el.find(`h2:contains(${en1})`);

  if ($refRu.length === 0 && $refEn.length === 0) return null;

  return $el
    .find(`h2:contains(${$refRu.length > 0 ? ru1 : en1})`)
    .first()
    .next("table")
    .nextUntil(`h1:contains(${$refRu.length > 0 ? ru2 : en2})`);
}

export function getTablesFromDoc($el, file) {
  let newTable = "";

  const usefullPart = getUsefullPartFromDoc($el);

  if (!usefullPart) {
    return newTable;
  }

  $("<div></div>")
    .append(usefullPart)
    .find("table")
    .each((idx, item) => {
      const haveThead = $(item).find("thead").length > 0;

      const refLabel = haveThead
        ? $(item).find("tr").first().find("th").first().children().text()
        : $(item).find("tr").first().find("td").first().children().text();

      //Take only needed tables wich have "Model" cell
      if (refLabel === "Модель" || refLabel === "Model") {
        let title = $(item).prev().text().split(" - ")[0];
        title = title.includes("Out") ? file.name.split(".doc")[0] : title;

        $(item)
          .find("tr")
          .each((i, row) => {
            //Ignore row with titles
            if (i === 0) return;

            if ($(row).find("td").first().children().text().trim() === "")
              return;

            //set id for row
            $(row).attr("data-idx", totalSystems.current);

            const $cells = $(row).find("td");
            $cells.eq(2).remove();
            const text = $cells.eq(0).children().text();

            if (
              outdoorJoints.includes(text.toLowerCase()) ||
              outdoorUnits.includes(text.toLowerCase())
            ) {
              $cells
                .eq(0)
                .children()
                .text(text.slice(0, text.length - 1));
            }

            const $titleCell = $(
              "<td><p contentEditable tabindex='-1'></p></td>"
            );
            const $inputCell = $('<td class="noExl"></td>');
            const $quantityCell = $cells.eq(1).clone(false);
            $quantityCell.addClass("noExl");
            $quantityCell.css("display", "none");

            $("<td><p></p></td>").insertAfter($cells.first());

            if (i === 1) {
              $titleCell.find("p").text(title);
              const $input = $('<input type="number" value="1">');

              $inputCell.append($input);
            }

            $(row).prepend($titleCell);
            $(row).append($inputCell);
            $(row).append($quantityCell);
            newTable += $(row).prop("outerHTML");
          });

        totalSystems.increase();
      }
    });

  return newTable;
}

export function makeSeparateTable(table) {
  if (table) {
    $(".result table").append(table);
  }
}

export function clearSeparateTable() {
  $(".result table").html("");
}
