// function validateFormLoanAfford() { var e = $("#loanAffordAmount").val(),
//         t = $("#loanAffordPayment").val(),
//         a = $("#loanAffordRate").val(),
//         n = $("#loanAffordMonths").val(),
//         o = ",";
//     new Array(10); return temparray = e.split(o), e = temparray.join(""), temparray = t.split(o), t = temparray.join(""), temparray = a.split(o), a = temparray.join(""), temparray = n.split(o), n = temparray.join(""), isNaN(e) ? (alert("Amount must be a number!"), $("#loanAffordAmount").focus(), !1) : isNaN(t) ? (alert("Payment must be a number!"), $("#loanAffordPayment").focus(), !1) : isNaN(a) ? (alert("Rate must be a number!"), $("#loanAffordRate").focus(), !1) : isNaN(n) ? (alert("Length of Loan must be a number!"), $("#loanAffordMonths").focus(), !1) : 0 != e && "" != e && 0 != t && "" != t ? (alert("Please clear either the loan payment or the loan amount to continue."), $("#loanAffordAmount").focus(), !1) : 0 != e && "" != e || 0 != t && "" != t ? 0 == a || "" == a ? (alert("You must select a loan rate!"), $("#loanAffordRate").focus(), !1) : (a /= 1200, 0 == n || "" == n ? (alert("You must provide the term of the loan!"), $("#loanAffordMonths").focus(), !1) : ("1" == $("#loanAffordFrequency").val() && (n *= 12), 0 == t || "" == t ? $("#loanAffordPayment").val(parseInt(100 * (e * (a / (1 - Math.pow(1 + a, -n))) + .005)) / 100) : $("#loanAffordAmount").val(parseInt(100 * (Math.pow(1 + a, -n) * (-t + Math.pow(1 + a, n) * t) / a + .005)) / 100), !1)) : (alert("You must select either the loan payment or the loan amount!"), $("#loanAffordAmount").focus(), !1) }

// function validateFormLoanPayment() {
//     var e = $("#loanPaymentAmount").val(),
//         t = $("#loanPaymentPayment").val(),
//         a = $("#loanPaymentRate").val(),
//         n = $("#loanPaymentMonths").val(),
//         o = ",";
//     new Array(10);
//     return temparray = e.split(o), e = temparray.join(""), temparray = t.split(o), t = temparray.join(""), temparray = a.split(o), a = temparray.join(""), temparray = n.split(o), n = temparray.join(""), isNaN(e) ? (alert("Amount must be a number!"), $("#loanPaymentAmount").focus(), !1) : isNaN(t) ? (alert("Payment must be a number!"), $("#loanPaymentPayment").focus(), !1) : isNaN(a) ? (alert("Rate must be a number!"), $("#loanPaymentRate").focus(), !1) : isNaN(n) ? (alert("Length of Loan must be a number!"), $("#loanPaymentMonths").focus(), !1) : 0 != e && "" != e && 0 != t && "" != t ? (alert("Please clear either the loan payment or the loan amount to continue."), $("#loanPaymentAmount").focus(), !1) : 0 != e && "" != e || 0 != t && "" != t ? 0 == a || "" == a ? (alert("You must select a loan rate!"), $("#loanPaymentRate").focus(), !1) : (a /= 1200, 0 == n || "" == n ? (alert("You must provide the term of the loan!"), $("#loanPaymentMonths").focus(), !1) : ("1" == $("#loanPaymentFrequency").val() && (n *= 12), 0 == t || "" == t ? $("#loanPaymentPayment").val(parseInt(100 * (e * (a / (1 - Math.pow(1 + a, -n))) + .005)) / 100) : $("#loanPaymentAmount").val(parseInt(100 * (Math.pow(1 + a, -n) * (-t + Math.pow(1 + a, n) * t) / a + .005)) / 100), !1)) : (alert("You must select either the loan payment or the loan amount!"), $("#loanPaymentAmount").focus(), !1)
// }
//************CHECKS TO MAKE SURE ALL DATA IS INPUTTED AND DOES THE MATH***************
var resets = document.querySelectorAll(".reset"),
    inputs = document.querySelectorAll("input[type='number']"),
    clearInputs = function() { inputs.forEach(function(e) { e.value = "" }) };

function singleDepositComputeForm() {
    if (!(isNaN($("#singleDepositPrincipal").val()) || isNaN($("#singleDepositInterest").val()) || isNaN($("#singleDepositPayments").val()))) {
        var e = parseInt($("#singleDepositPayments").val().replace(",", "")),
            t = parseFloat($("#singleDepositInterest").val().replace(",", "")),
            a = parseFloat($("#singleDepositPrincipal").val().replace(",", ""));
        if (1 > e > 480) alert("Years to Accrue must be between 1 and 480");
        else if (.001 > t > 99) alert("Interest rate must be between 0.001 and 99");
        else if (1 > a > 1e7) alert("Principal must be between 1 and 10000000");
        else {
            var n = t;
            n /= 100, n /= 12;
            for (var o = a, r = 0; r < 12 * e; r++) o = o * n + 1 * o;
            var l = o;
            $("#singleDepositFv").text("$" + o.formatMoney(2, ".", ","));
            var i = l - a;
            $("#singleDepositTotalint").text("$" + i.formatMoney(2, ".", ","))
        }
    }
}

function multipleDepositComputeForm() {
    if (console.log("!!"), !(isNaN($("#multipleDepositMoAdd").val()) || isNaN($("#multipleDepositInterest").val()) || isNaN($("#multipleDepositPayments").val())))
        if ("" != $("#multipleDepositInterest").val())
            if ("" != $("#multipleDepositMoAdd").val())
                if ("" != $("#multipleDepositMoAdd").val()) {
                    var e = parseInt($("#multipleDepositPayments").val().replace(",", "")),
                        t = parseFloat($("#multipleDepositInterest").val().replace(",", "")),
                        a = parseFloat($("#multipleDepositPrincipal").val().replace(",", "")),
                        n = parseFloat($("#multipleDepositMoAdd").val().replace(",", "")),
                        o = t;
                    o = o >= 1 ? t / 100 : t, o /= 12;
                    for (var r = n, l = a, i = 12 * e, s = 0; s < i;) newprin = l + r, l = newprin * o + (l + r), s += 1;
                    $("#multipleDepositFv").text("$" + l.formatMoney(2, ".", ","));
                    var m = l - (s * r + a);
                    $("#multipleDepositTotalint").text("$" + m.formatMoney(2, ".", ","))
                } else alert("Please enter the Years to Accrue.");
    else alert("Please enter the amount to add each month.");
    else alert("Please enter the Interest Rate.")
}

function mortgagePaymentcomputeForm() {
    if ("" != $("#mortgagePaymentPayment").val())
        if ("" != $("#mortgagePaymentPrincipal").val())
            if ("" != $("#mortgagePaymentIntRate").val()) {
                var e = parseFloat($("#mortgagePaymentPayment").val()),
                    t = parseFloat($("#mortgagePaymentPayment").val()) / 2,
                    a = parseFloat($("#mortgagePaymentPrincipal").val()),
                    n = a,
                    o = 0,
                    r = 0,
                    l = 0,
                    i = 0,
                    s = 0,
                    m = 0,
                    u = parseFloat($("#mortgagePaymentIntRate").val());
                u > 1 && (u /= 100);
                for (var p = u / 12, f = u / 26, g = 0, c = 0; a > 0 && (a -= l = e - (o = a * p), l, s += o, !((g += 1) > 600)););
                for ($("#mortgagePaymentOrigInt").text("$" + s.formatMoney(2, ".", ",")); n > 0 && (n -= i = t - (r = n * f), i, m += r, c += 1, !(g > 600)););
                $("#mortgagePaymentBiwkInt").text("$" + m.formatMoney(2, ".", ","));
                var y = s - m;
                $("#mortgagePaymentIntSave").text("$" + y.formatMoney(2, ".", ",")), $("#mortgagePaymentTime").text("By paying bi-weekly, you are adding a 13th payment to your annual number of payments, and splitting it up between 26 bi-weekly payments. By paying an extra $" + parseFloat(e / 26).formatMoney(2, ".", ",") + " every two weeks, you will pay off your mortgage in " + parseInt(c / 26 * 12, 10) + " months instead of the current " + g + " months, and save $" + parseFloat(s - m).formatMoney(2, ".", ",") + " in mortgage interest in the process.")
            } else alert("Please enter your mortgage's annual interest rate.");
    else alert("Please enter your mortgage's current principal balance.");
    else alert("Please enter the amount of your mortgage payment.")
}

function mortgageRefinanceComputeForm() {
    if ("" != $("#mortgageRefinancePayment").val())
        if ("" != $("#mortgageRefinancePrincipal").val())
            if ("" != $("#mortgageRefinanceIntRate").val())
                if ("" != $("#mortgageRefinanceIntRate2").val())
                    if ("" != $("#mortgageRefinanceNper2").val())
                        if ("" != $("#mortgageRefinanceClosingCost").val())
                            if (parseFloat($("#mortgageRefinanceIntRate2").val()) > parseFloat($("mortgageRefinanceIntRate").val())) alert("You have entered a refinancing rate that is higher than your present rate. The refinancing rate must be lower than your present rate for this calculator to function.");
                            else {
                                var e = 0,
                                    t = 0,
                                    a = parseFloat($("#mortgageRefinancePayment").val()),
                                    n = parseFloat($("#mortgageRefinancePrincipal").val()),
                                    o = 0,
                                    r = 0,
                                    l = 0;
                                (i = parseFloat($("#mortgageRefinanceIntRate").val())) > 1 && (e = i /= 100);
                                var i = i / 12;
                                (s = parseFloat($("#mortgageRefinanceIntRate2").val())) > 1 && (t = s /= 100);
                                for (var s = s / 12, m = 0; n > 0 && (n -= r = a - (o = n * i), r, l += o, !((m += 1) > 600)););
                                $("#mortgageRefinanceOrigInt").text("$" + l.formatMoney(2, ".", ","));
                                for (var u = 1, p = 0; p < 12 * parseInt($("#mortgageRefinanceNper2").val()); p++) u *= 1 + s;
                                var f = parseFloat($("#mortgageRefinancePrincipal").val()) * u * s / (u - 1);
                                $("#mortgageRefinancePayment2").text("$" + f.formatMoney(2, ".", ","));
                                var g = parseFloat($("#mortgageRefinancePayment").val()) - f;
                                $("#mortgageRefinanceMoSave").text("$" + g.formatMoney(2, ".", ","));
                                var c = f * parseInt($("#mortgageRefinanceNper2").val()) * 12 - parseFloat($("#mortgageRefinancePrincipal").val());
                                $("#mortgageRefinanceTotInt2").text("$" + c.formatMoney(2, ".", ","));
                                var y = l - c;
                                $("#mortgageRefinanceIntSave").text("$" + y.formatMoney(2, ".", ",")), $("#mortgageRefinanceCloseMo").text(parseInt(parseFloat($("#mortgageRefinanceClosingCost").val()) / g, 10));
                                var v = y - parseFloat($("#mortgageRefinanceClosingCost").val());
                                $("#mortgageRefinanceNetSave").text("$" + v.formatMoney(2, ".", ",")), $("#mortgageRefinanceSummary").text("If you refinance your current " + (100 * e).formatMoney(3, ".", ",") + "% mortgage to a " + (100 * t).formatMoney(3, ".", ",") + "% mortgage, your monthly payment will drop by " + $("#mortgageRefinanceMoSave").text() + " and you will save " + $("#mortgageRefinanceIntSave").text() + " in interest charges over the life of the mortgage.  However, in order for this refinancing to yield any savings at all you will need to stay in your current home for at least " + $("#mortgageRefinanceCloseMo").text() + " months.  That is how long it will take for your monthly payment savings to offset the closing costs attributable to refinancing.")
                            }
    else alert("Please enter the refinancing closing costs.");
    else alert("Please enter the number of years you are refinancing.");
    else alert("Please enter the annual interest rate you'll be refinancing.");
    else alert("Please enter your mortgage's current annual interest rate.");
    else alert("Please enter your mortgage's current principal balance.");
    else alert("Please enter the amount of your mortgage payment.")
}
resets.forEach(function(e) { e.addEventListener("click", clearInputs) }), $("input[type='number']").bind("change", function() {}), $("#singleDepositCompute").bind("click", function() { singleDepositComputeForm() }), Number.prototype.formatMoney = function(e, t, a) {
    var n = this,
        o = (e = isNaN(e = Math.abs(e)) ? 2 : e, t = void 0 == t ? "," : t, a = void 0 == a ? "." : a, n < 0 ? "-" : ""),
        r = parseInt(n = Math.abs(+n || 0).toFixed(e)) + "",
        l = (l = r.length) > 3 ? l % 3 : 0;
    return o + (l ? r.substr(0, l) + a : "") + r.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + a) + (e ? t + Math.abs(n - r).toFixed(e).slice(2) : "")
}, $("#multipleDepositCompute").bind("click", function() { multipleDepositComputeForm() }), Number.prototype.formatMoney = function(e, t, a) {
    var n = this,
        o = (e = isNaN(e = Math.abs(e)) ? 2 : e, t = void 0 == t ? "," : t, a = void 0 == a ? "." : a, n < 0 ? "-" : ""),
        r = parseInt(n = Math.abs(+n || 0).toFixed(e)) + "",
        l = (l = r.length) > 3 ? l % 3 : 0;
    return o + (l ? r.substr(0, l) + a : "") + r.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + a) + (e ? t + Math.abs(n - r).toFixed(e).slice(2) : "")
}, $("#mortgagePaymentCompute").bind("click", function() { mortgagePaymentcomputeForm() }), Number.prototype.formatMoney = function(e, t, a) {
    var n = this,
        o = (e = isNaN(e = Math.abs(e)) ? 2 : e, t = void 0 == t ? "," : t, a = void 0 == a ? "." : a, n < 0 ? "-" : ""),
        r = parseInt(n = Math.abs(+n || 0).toFixed(e)) + "",
        l = (l = r.length) > 3 ? l % 3 : 0;
    return o + (l ? r.substr(0, l) + a : "") + r.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + a) + (e ? t + Math.abs(n - r).toFixed(e).slice(2) : "")
}, $("#mortgageRefinanceCompute").bind("click", function() { mortgageRefinanceComputeForm() }), Number.prototype.formatMoney = function(e, t, a) {
    var n = this,
        o = (e = isNaN(e = Math.abs(e)) ? 2 : e, t = void 0 == t ? "," : t, a = void 0 == a ? "." : a, n < 0 ? "-" : ""),
        r = parseInt(n = Math.abs(+n || 0).toFixed(e)) + "",
        l = (l = r.length) > 3 ? l % 3 : 0;
    return o + (l ? r.substr(0, l) + a : "") + r.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + a) + (e ? t + Math.abs(n - r).toFixed(e).slice(2) : "")
};
