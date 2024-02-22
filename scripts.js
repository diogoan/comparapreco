var amountTextDic = {
  unidades: "unidade",
  peso: "quilo",
  liquido: "litro",
};

var amountLabelDic = {
  unidades: "Quantidade: ",
  peso: "Peso: ",
  liquido: "Volume: ",
};

var multiplierDic = {
  un: 1,
  kg: 1,
  gr: 1000,
  lt: 1,
  ml: 1000,
};

var pesoRadio = {
  unidades: () => $(".peso-radio").hide(),
  peso: () => $(".peso-radio").show(),
  liquido: () => $(".peso-radio").hide(),
};

var liquidoRadio = {
  unidades: () => $(".liquido-radio").hide(),
  peso: () => $(".liquido-radio").hide(),
  liquido: () => $(".liquido-radio").show(),
};

var checkDefaults = {
  unidades: () => $(".qtdeDefault").prop("checked", true),
  peso: () => $(".kgDefault").prop("checked", true),
  liquido: () => $(".ltDefault").prop("checked", true),
};

var invalidChars = ["-", "e", "+", "E"];

$(document).ready(function () {
  $("#amount-kind").on("change", function () {
    let amountKind = $(this).val();
    let amountKindText = amountTextDic[amountKind];
    let amountKindLabel = amountLabelDic[amountKind];

    $(".amountKindText").text(amountKindText);
    $(".amountLabel").text(amountKindLabel);

    pesoRadio[amountKind]();
    liquidoRadio[amountKind]();
    checkDefaults[amountKind]();
  });

  $(".product-prop").on("keyup change", function () {
    let currentDiv = $(this).parent().parent();

    if ($(this).prop("type") == "radio") {
      currentDiv = currentDiv.parent();
    }

    let selectedRadio = currentDiv.find("input[type='radio']:checked").val();
    let multiplier = multiplierDic[selectedRadio];

    calculateRatio(currentDiv, multiplier);
    displayBestOption();
  });

  $("input[type='number']").on("keypress", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });

  $("#cleanAll").on("click", function () {
    $(".numeric").val("");
    $(".ratio").val("");
    $(".optionDiv").css("background-color", "");
    $(".melhorOpcao").hide();
    $(".pricePerUnit").text("0,00");
    $("#amount-kind").change();
  });

  $(".cleanThis").on("click", function () {
    let thisDiv = $(this).parent().parent();
    thisDiv.find(".numeric").val("");
    thisDiv.find(".ratio").val("");
    thisDiv.css("background-color", "");
    thisDiv.find(".melhorOpcao").hide();
    thisDiv.find(".pricePerUnit").text("0,00");
    displayBestOption();

    let amountKind = $("#amount-kind").val();
    if (amountKind == "peso")
      thisDiv.find(".kgDefault").prop("checked", true);
    if (amountKind == "liquido")
      thisDiv.find(".ltDefault").prop("checked", true);
  });
});

function calculateRatio(div, multiplier) {
  let amount = div.find("#amount").val();
  let price = div.find("#price").val();

  let pricePerUnit = (price / amount) * multiplier;

  if ($.isNumeric(pricePerUnit)) {
    div.find(".pricePerUnit").text(pricePerUnit.toFixed(2).replace(".", ","));
    div.find(".ratio").val(pricePerUnit);
  } else {
    div.find(".pricePerUnit").text("0,00");
    div.find(".ratio").val("0");
  }
}

function displayBestOption() {
  let bestRatio = 0;
  let bestRatioDiv;

  $.each($(".ratio"), function () {
    let ratio = parseFloat($(this).val());
    if (ratio != 0 && !isNaN(ratio) && (bestRatio == 0 || bestRatio > ratio)) {
      bestRatio = ratio;
      bestRatioDiv = $(this).parent().parent();
    }
  });

  $(bestRatioDiv).css("background-color", "lightgreen");
  $(".optionDiv").not(bestRatioDiv).css("background-color", "");

  $(bestRatioDiv).find(".melhorOpcao").show();
  $(".optionDiv").not(bestRatioDiv).find(".melhorOpcao").hide();
}
