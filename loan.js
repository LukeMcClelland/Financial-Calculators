function validateFormLoanAfford() {
    console.log("clicked")
        // This function checks for empty required fields
        // With Netscape focus is placed on empty fields
        // Inputs are hard coded, nothing is passed to it
        // It returns a true or false depending on validity
    var amount = $("#loanAffordAmount").val();
    var payment = ($("#loanAffordPayment").val() + $("#loanAffordPaymentInput").val());
    var rate = ($("#loanAffordRate").val() + $("#loanAffordRateInput").val());
    var months = $("#loanAffordMonths").val() + $("#loanAffordMonthsInput").val();
    var comma = ","
    var temparry = new Array(10)
    var totalLoan = document.getElementById("loanAffordAmount").value;
    console.log(totalLoan);

    console.log("payment " + payment)
    console.log("rate " + rate)
    console.log("months " + months)
    console.log("total loan " + totalLoan)

    temparray = amount.split(comma)
    amount = temparray.join("")
    temparray = payment.split(comma)
    payment = temparray.join("")
    temparray = rate.split(comma)
    rate = temparray.join("")
    temparray = months.split(comma)
    months = temparray.join("")


    if (isNaN(amount)) {
        alert("Amount must be a number!");
        $("#loanAffordAmount").focus();
        return false;
    }
    if (isNaN(payment)) {
        alert("Payment must be a number!");
        $("#loanAffordPayment").focus();
        return false;
    }
    if (isNaN(rate)) {
        alert("Rate must be a number!");
        $("#loanAffordRate").focus();
        return false;
    }
    if (isNaN(months)) {
        alert("Length of Loan must be a number!");
        $("#loanAffordMonths").focus();
        return false;
    }

    if (((amount != 0) && (amount != "")) &&
        ((payment != 0) && (payment != ""))) {
        alert("Please clear either the loan payment or the loan amount to continue.");
        $("#loanAffordAmount").focus();
        return false;
    }
    if (((amount == 0) || (amount == "")) &&
        ((payment == 0) || (payment == ""))) {
        alert("You must select either the loan payment or the loan amount!");
        $("#loanAffordAmount").focus();
        return false;
    }
    if ((rate == 0) || (rate == "")) {
        alert("You must select a loan rate!");
        $("#loanAffordRate").focus();
        return false;
    } else {
        rate = rate / 1200;
    }

    if ((months == 0) || (months == "")) {
        alert("You must provide the term of the loan!");
        $("#loanAffordMonths").focus();
        return false;
    } else {
        if ($("#loanAffordFrequency").val() == '1') {
            months = months * 12;
        }
    }

    if (payment == 0 || payment == "") {
        $("#loanAffordPayment").val(parseInt(100 * ((amount * (rate / (1 - (Math.pow(1 + rate, -months))))) + .005)) / 100);
    } else {
        $("#loanAffordAmount").val(parseInt(100 * ((((Math.pow(1 + rate, -months) * (-payment + (Math.pow(1 + rate, months) * payment)))) / rate) + .005)) / 100);
    }
    return false;
}


//********** LOAN GRAPH ***************/
$('.calc-button').on('click', function() {
    console.log('here');
    var ctx = document.getElementById('loanChart').getContext('2d');
    var sumLoan = document.getElementById('loanAffordAmount').value; //total loan amount, principal is amount owed on loan for each time period (principal + balance = total)
    var apr = (document.getElementById('loanAffordRate').value + document.getElementById('loanAffordRateInput').value) / 100;
    var lengthLoan = document.getElementById('loanAffordMonths').value + document.getElementById('loanAffordMonthsInput').value;
    var desiredPayment = document.getElementById('loanAffordPayment').value + document.getElementById('loanAffordPaymentInput').value;

    var breakdownInterest = apr / lengthLoan * desiredPayment; //yearly interest on loan
    var totalInterest = breakdownInterest * lengthLoan;
    var monthlyPayment = breakdownInterest / 12 + sumLoan / lengthLoan; //wrong formula
    var test = 3;
    var interestArray = new Array();
    var totalInterestArray = new Array();
    var remainingBalance = new Array();
    var lengthArray = new Array();
    var monthlyArray = new Array();
    var total = new Array();

    for (var i = 0; sumLoan > 0; i++) {
        lengthArray[i] = i;
        interestArray[i] = totalInterest;
        totalInterestArray[i] = totalInterest * i;
        remainingBalance[i] = sumLoan - monthlyPayment;
        sumLoan = remainingBalance[i];
        lengthArray[i] = lengthArray[i] + 1;
        monthlyArray[i] = monthlyPayment;
    }

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: lengthArray,
            datasets: [{
                    label: 'Total Interest Paid',
                    backgroundColor: 'rgb(30, 205, 59)',
                    borderColor: 'rgb(30, 205, 59)',
                    fill: false,
                    data: totalInterestArray
                },
                {
                    label: 'Monthly Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: interestArray
                },
                {
                    label: 'Monthly Payment',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: monthlyArray
                },
                {
                    label: 'Remaining Balance',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: remainingBalance
                }
            ]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                }]
            }
        }
    });
});



//********** PAYMENT GRAPH ***************
$('.loanPayCalc').on('click', function() {
    console.log('here');
    var ctx = document.getElementById('paymentChart').getContext('2d');
    var totalLoan = document.getElementById('loanPaymentAmount').value; //total loan amount, principal is amount owed on loan for each time period (principal + balance = total)
    var apr = document.getElementById('loanPaymentRate').value / 100;
    var lengthLoan = document.getElementById('loanPaymentMonths').value;
    var payment = document.getElementById('loanPaymentPayment').value;
    var temp = totalLoan;
    var actualTotal = payment * lengthLoan;
    console.log('OVERALL TOTAL: ' + actualTotal);

    var breakdownInterest = apr / lengthLoan * totalLoan; //yearly interest on loan
    var totalInterest = breakdownInterest * lengthLoan;
    var monthlyPayment = breakdownInterest / 12 + totalLoan / lengthLoan; //wrong formula
    console.log('Monthly Interest: ' + breakdownInterest);
    console.log('Monthly Payment: ' + monthlyPayment);
    console.log('Total Interest on Loan: ' + totalInterest);
    console.log('Yearly Interest: ' + breakdownInterest);
    console.log('Total Loan: ' + totalLoan);
    console.log('APR: ' + apr);
    console.log('Loan Length: ' + lengthLoan);
    var interestArray = new Array();
    var totalInterestArray = new Array();
    var remainingBalance = new Array();
    var monthlyArray = new Array();
    var overallPaymentArray = new Array();
    var lengthArray = new Array();

    for (var i = 0; temp > 0; i++) {
        interestArray[i] = breakdownInterest;
        lengthArray[i] = i;
        totalInterestArray[i] = totalInterest;
        remainingBalance[i] = temp - monthlyPayment;
        temp = remainingBalance[i];
        monthlyArray[i] = payment;
        overallPaymentArray[i] = actualTotal;
    }
    console.log('Interest Array: ' + interestArray);
    console.log('Remaining Balance: ' + remainingBalance);
    //var balance = totalLoan - principal;
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: lengthArray,
            datasets: [{
                    label: 'Monthly Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointColor: '#da3e2f',
                    strokeColor: '#da3e2f',
                    fill: false,
                    data: interestArray
                },
                {
                    label: 'Total Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: totalInterestArray
                },
                {
                    label: 'Overall Payment',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: overallPaymentArray
                },
                {
                    label: 'Monthly Payment',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: monthlyArray
                },
                {
                    label: 'Remaining Balance',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: remainingBalance
                }
            ]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                }]
            }
        }
    });
});

$('.input-field').hide();

$('#customSwitch1').click(function() {
    if ($(this).is(':checked')) {
        console.log('switch again');
        $('.payment-slider').hide();
        $('.input-field').show();
    } else {
        console.log('switch');
        $('.payment-slider').show();
        $('.input-field').hide();
    }
});

function resetDesiredPayment() {
    document.getElementById('loanAffordAmount').value = 0;
    document.getElementById('loanAffordMonths').value = 0;
    document.getElementById('loanAffordRate').value = 0;
    document.getElementById('loanAffordPayment').value = 0;
    document.getElementById('lengthLoan').innerHTML = '0 months/years';
    document.getElementById('APR').innerHTML = '0%';
    document.getElementById('dPayment').innerHTML = '$0';
}
