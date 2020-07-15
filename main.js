
//********** LOAN GRAPH ***************/
$('.calc-button').on('click', function() {
    console.log('here');
    var ctx = document.getElementById('loanChart').getContext('2d');
    var sumLoan = document.getElementById('loanAffordAmount').value; //total loan amount, principal is amount owed on loan for each time period (principal + balance = total)
    var apr = (document.getElementById('loanAffordRate').value + document.getElementById('loanAffordRateInput').value) / 100;
    var lengthLoan = document.getElementById('loanAffordMonths').value + document.getElementById('loanAffordMonthsInput').value;
    var desiredPayment = document.getElementById('loanAffordPayment').value + document.getElementById('loanAffordPaymentInput').value;
    //GETTING ALL DATA FROM HTML
    
    var breakdownInterest = apr / lengthLoan * desiredPayment; //yearly interest on loan
    var totalInterest = breakdownInterest * lengthLoan;
    var monthlyPayment = breakdownInterest / 12 + sumLoan / lengthLoan; //wrong formula
    var test = 3;
    //CONVERT TO ARRAY BECAUSE GRAPHS JS WILL ONLY PLOT ONE POINT UNLESS AN ARRAY
    var interestArray = new Array();                
    var totalInterestArray = new Array();
    var remainingBalance = new Array();
    var lengthArray = new Array();
    var monthlyArray = new Array();
    var total = new Array();
//ASSIGNING VALUES FOR ARRAYS
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
            labels: lengthArray,                   //Y AXIS
            datasets: [{
                    label: 'Total Interest Paid',       //TITLE OF PLOTTED LINE
                    backgroundColor: 'rgb(30, 205, 59)',    //CUSTOMIZE COLORS IN HERE
                    borderColor: 'rgb(30, 205, 59)',
                    fill: false,
                    data: totalInterestArray            //WHAT DATA YOU WANT DISPLAYED
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
        options: {                                  //ALL CUSTOMIZABLE FEATURES
            scales: {
                yAxes: [{
                    ticks: {                        //CAN ADJUST NUMBER OF TICKS
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
//********** MORTGAGE REFINANCE GRAPH ***********

$('.refinanceCalc').on('click', function() {
    var ctx = document.getElementById('refinanceChart').getContext('2d');
    var principal = document.getElementById('mortgageRefinancePrincipal').value; //total loan amount, principal is amount owed on loan for each time period (principal + balance = total)
    var monthly = document.getElementById('mortgageRefinancePayment').value;
    var interest = document.getElementById('mortgageRefinanceIntRate').value;
    var refinanceInt = document.getElementById('mortgageRefinanceIntRate2').value;
    var yearsRefinance = document.getElementById('mortgageRefinanceNper2').value;
    var closingCosts = document.getElementById('mortgageRefinanceClosingCost').value;

    var test = document.getElementById('mortgageRefinancePayment2').innerText;
    var payoffClosing = document.getElementById('mortgageRefinanceCloseMo').value;
    var currentPlanTotalInterest = document.getElementById('mortgageRefinanceOrigInt').value;
    var refinanceTotalInterest = document.getElementById('mortgageRefinanceTotInt2').value;
    var interestSaved = document.getElementById('mortgageRefinanceIntSave').value;
    var netSavings = document.getElementById('mortgageRefinanceNetSave').value;
    console.log('refinance payment: ' + test);
    console.log('closing cost time: ' + payoffClosing);

    var length = new Array();
    var preRefinancePayment = new Array();
    var refinancePaymentArray = new Array();
    var currentPlanTotalIntArray = new Array();
    var refinanceTotalIntArray = new Array();

    for (var i = 0; yearsRefinance > 0; i++) {
        length[i] = yearsRefinance;
        yearsRefinance = yearsRefinance - 1;
        preRefinancePayment[i] = monthly;
        refinancePaymentArray[i] = test;
        currentPlanTotalIntArray[i] = currentPlanTotalInterest;
        refinanceTotalIntArray[i] = refinanceTotalInterest;
    }
    console.log('Length: ' + length);
    console.log('Pre-refinance payment: ' + preRefinancePayment);
    console.log('Refinance payment: ' + refinancePaymentArray);
    console.log('Pre Refinance Interest: ' + currentPlanTotalIntArray);
    console.log('Post Refinance Interest: ' + refinanceTotalIntArray);

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: length,
            datasets: [{
                    label: 'Monthly Payment before Refinance',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: preRefinancePayment
                },
                {
                    label: 'Refinance Payment',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: refinancePaymentArray
                },
                {
                    label: 'Current Plan Total Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: currentPlanTotalIntArray
                },
                {
                    label: 'Refinance Plan Total Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: refinanceTotalIntArray
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
});

//********** BIWEEKLY GRAPH ***********/

$('.biweeklyCalc').on('click', function() {
    var ctx = document.getElementById('biweeklyChart').getContext('2d');
    var mortPrincipal = document.getElementById('mortPayPrinc').value;
    var mortMonthlyPayment = document.getElementById('mortPayPay').value;
    var mortIntRate = document.getElementById('mortPayIntRate').value;
    var currentTotalInterest = document.getElementById('mortgagePaymentOrigInt').value;
    var biweeklyTotalInterest = document.getElementById('mortgagePaymentBiwkInt').value;
    var biweeklyIntSavings = document.getElementById('mortgagePaymentIntSave').value;

    var currentIntArray = new Array();
    var biweeklyIntArray = new Array();
    var biweeklySavingsArray = new Array();

    for (var i = 0; i < 12; i++) {
        currentIntArray[i] = currentTotalInterest;
        biweeklyIntArray[i] = biweeklyTotalInterest;
        biweeklySavingsArray[i] = biweeklyIntSavings;
    }

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            datasets: [{
                    label: 'Current Total Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: currentIntArray
                },
                {
                    label: 'Biweekly Total Interest',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: biweeklyIntArray
                },
                {
                    label: 'Savings with Biweekly Interest',
                    backgroundColor: 'rgb(30, 205, 59)',
                    borderColor: 'rgb(30, 205, 59)',
                    data: biweeklySavingsArray
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
});

//********** SAVINGS GRAPH ***********

$('.savingsCalc').on('click', function() {
    var ctx = document.getElementById('savingsChart').getContext('2d');
    var initialInvestment = document.getElementById('multiPrincipal');
    var addMonthly = document.getElementById('multiDepositMonthly');
    var annualInt = document.getElementById('multiDepoInt');
    var yearsAccrue = document.getElementById('multiDepoPay');
    var futureVal = document.getElementById('multipleDepositFv');
    var intEarned = document.getElementById('multipleDepositTotalint');

    var initialInvestmentArray = new Array();
    var addMonthlyArray = new Array();
    var annualIntArray = new Array();
    var yearsAccrueArray = new Array();
    var futureValueArray = new Array();
    var interestEarnedArray = new Array();

    for (var i = 0; i < yearsAccrue; i++) {
        initialInvestmentArray[i] = initialInvestment;
        addMonthlyArray[i] = addMonthly;
        annualIntArray[i] = annualInt;
        yearsAccrueArray[i] = yearsAccrue;
        futureValueArray[i] = futureVal;
        interestEarnedArray[i] = intEarned;
    }
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            datasets: [{
                    label: 'Initial Investment',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: initialInvestmentArray
                },
                {
                    label: 'Amount to Add Monthly',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: addMonthlyArray
                },
                {
                    label: 'Annual Interest Rate',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: annualIntArray
                },
                {
                    label: 'Future Value',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: futureValueArray
                },
                {
                    label: 'Interest Earned',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: interestEarnedArray
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
});

//********** FUTURE VALUE GRAPH ***********/

$('.futureValCalc').on('click', function() {
    var ctx = document.getElementById('futureChart').getContext('2d');
    var deposit = document.getElementById("singleDepoPrincipal").value;
    var annInt = document.getElementById("singleDepoInt").value;
    var yearAccrue = document.getElementById("singleDepoPay").value;
    var futureValue = document.getElementById("singleDepositFv").value;
    var interestEarned = document.getElementById("singleDepositTotalint").value;
    var depositArray = new Array();
    var annIntArray = new Array();
    var accrueArray = new Array();
    var futValArray = new Array();
    var intEarnedArray = new Array();
    for (var i = 0; i < yearsAccrue; i++) {
        depositArray[i] = deposit;
        accrueArray[i] = yearAccrue;
        futValArray[i] = futureValue;
        intEarnedArray[i] = interestEarned;
    }
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            datasets: [{
                    label: 'Deposit Amount',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: depositArray
                },
                {
                    label: 'Years to Accrue',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: accrueArray
                },
                {
                    label: 'Future Value of Investment',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: futValArray
                },
                {
                    label: 'Total Interest Earned',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: intEarnedArray
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
});

