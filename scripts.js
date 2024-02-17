var amountTextDic = {
  qtd: "unidade",
  kgs: "quilo",
  grm: "quilo",
  lit: "litro",
  mil: "litro",
};

var amountLabelDic = {
  qtd: "Quantidade: ",
  kgs: "Peso (kg): ",
  grm: "Peso (g): ",
  lit: "Volume (L): ",
  mil: "Volume (mL): ",
};

var multiplierDic = {
  qtd: 1,
  kgs: 1,
  grm: 1000,
  lit: 1,
  mil: 1000,
};

$(document).ready(function () {
  $(".product-prop").on("keyup change", function () {
    let amountKind = $("#amount-kind").val();
    let amountKindText = amountTextDic[amountKind];
    let amountKindLabel = amountLabelDic[amountKind];
    let multiplier = multiplierDic[amountKind];

    $(".amountKindText").text(amountKindText);
    $(".amountLabel").text(amountKindLabel);

    let currentDiv = $(this).parent().parent();
    calculateRatio(currentDiv, multiplier);

    let bestRatio = 0;
    let bestRatioDiv;

    $.each($(".ratio"), function () {
      let ratio = $(this).val();
      console.log(ratio);
      if (ratio != "0" && (bestRatio == 0 || bestRatio > ratio)) {
        bestRatio = ratio;
        bestRatioDiv = $(this).parent().parent();
      }
    });

    $(bestRatioDiv).css("background-color", "lightgreen");
    $(".optionDiv").not(bestRatioDiv).css("background-color", "");
  });
});

function calculateRatio(div, multiplier) {
  let amount = div.find("#amount").val();
  let price = div.find("#price").val();

  let pricePerUnit = (price / amount) * multiplier;

  if ($.isNumeric(pricePerUnit)) {
    div.find("#pricePerUnit").text(pricePerUnit.toFixed(2).replace(".", ","));
    div.find(".ratio").val(pricePerUnit);
  } else {
    div.find("#pricePerUnit").text("0,00");
    div.find(".ratio").val("0");
  }
}
