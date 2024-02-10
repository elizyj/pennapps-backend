$(document).ready(function () {
  $("input.input-field").each(function () {
    if ($(this).val() != "") {
      $(this).parent().addClass("input-filled");
    }
  });

  $("input.input-field").on("focus", function () {
    $(this).parent().addClass("input-filled");
  });

  $("input.input-field").on("blur", function () {
    if ($(this).val() == "") {
      $(this).parent().removeClass("input-filled");
    }
  });

  $("div.input-field").each(function () {
    var el = $(this).find("select");
    if (el.length > 0 && el.select2 && el.select2("data")[0].text != "") {
      $(this).parent().addClass("input-filled");
    }
  });

  $("span.input").on("click", function () {
    var that = this;
    if (!$(this).hasClass("input-filled")) {
      setTimeout(function () {
        var el = $(that).find("select");
        if (el.length > 0) {
          if (el.select2) {
            el.select2("open");
          }
        }
      }, 500);
    }

    $(this).addClass("input-filled");
    $(this).children(".input-field").focus();
  });

  $("select").on("select2:close", function () {
    var select2Data = $(this).select2("data");
    if (select2Data && select2Data[0] && select2Data[0].text === "") {
      $(this).closest(".input").removeClass("input-filled");
    }
  });

  $("#passwordToggle").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    let pass = $("#password");
    let confirmedPass = $("#confirmedPassword");

    if (pass.attr("type") === "password") {
      pass.attr("type", "text");
      confirmedPass.attr("type", "text");
    } else {
      pass.attr("type", "password");
      confirmedPass.attr("type", "password");
    }
  });
});