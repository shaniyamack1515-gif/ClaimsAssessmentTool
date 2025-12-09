function Premium_Input() {

    let Years_Paid = document.getElementById("years_paid");
    let Number_of_Years = Number(Years_Paid.value);
    let Premium = document.getElementById("premium_fields_container");

    Premium.innerHTML = "";

    for (let i = 1; i <= Number_of_Years; i++) {

        let Premium_Box = document.createElement("div");

        Premium_Box.innerHTML = `
            <label>Premium for Year ${i}</label>
            <input type="number" class="premium-input" min="0">
        `;

        Premium.appendChild(Premium_Box);
    }
}

function Claim_Input() {

    let Claim_Paid = document.getElementById("claims_count");
    let Number_of_Claims = Number(Claim_Paid.value);
    let Claims = document.getElementById("claim_fields_container");

    Claims.innerHTML = "";

    for (let c = 1; c <= Number_of_Claims; c++) {

        let Claim_Box = document.createElement("div");

        Claim_Box.innerHTML = `
            <label>Claim Amount ${c}</label>
            <input type="number" class="claim-input" min="0">
        `;

        Claims.appendChild(Claim_Box);
    }
}

function Rating_Percentage(min, max) {

    let Rating_Value = Math.random() * (max - min) + min;
    return Rating_Value.toFixed(1);
}

function Check_Account_Number() {

    let Account_Input = document.getElementById("account_number");
    let Account_Value = Account_Input.value;

    if (Account_Value.length > 9) {
        alert("Account number cannot exceed 9 digits.");
        Account_Value = Account_Value.substring(0, 9);
    }

    Account_Input.value = Account_Value;
}

function Calculate_Risk_Assessment() {

    Check_Account_Number();

    let Premium_Amount = document.querySelectorAll(".premium-input");
    let Claim_Amount = document.querySelectorAll(".claim-input");

    let premiums = [];
    let claims = [];

    Premium_Amount.forEach(function (p) {
        let number = Number(p.value);
        if (isNaN(number)) number = 0;
        premiums.push(number);
    });

    Claim_Amount.forEach(function (c) {
        let num = Number(c.value);
        if (isNaN(num)) num = 0;
        claims.push(num);
    });

    if (premiums.length === 0 || claims.length === 0) {
        alert("Please enter premium and claim values.");
        return;
    }

    let Total_Premium = 0;
    let Total_Claims = 0;

    for (let i = 0; i < premiums.length; i++) {
        Total_Premium += premiums[i];
    }

    for (let j = 0; j < claims.length; j++) {
        Total_Claims += claims[j];
    }

    if (Total_Premium === 0) {
        alert("Total premiums cannot be zero.");
        return;
    }

    let Loss_Ratio = (Total_Claims / Total_Premium) * 100;
    document.getElementById("loss_ratio").value = Loss_Ratio.toFixed(2) + "%";

    let riskColor = "";
    let percentIncrease = 0;
    let Risk_Category = " ";


    if (Loss_Ratio < 100) {
        riskColor = "green";
        percentIncrease = Rating_Percentage(15, 25);
        Risk_Category = "Low Risk";
    } else if (Loss_Ratio >= 100 && Loss_Ratio <= 200) {
        riskColor = "orange";
        percentIncrease = Rating_Percentage(30, 95);
        Risk_Category = "Medium Risk";
    } else {
        riskColor = "red";
        percentIncrease = Rating_Percentage(100, 125);
        Risk_Category = "High Risk";
    }


    let riskBox = document.getElementById("risk_category");
    riskBox.style.backgroundColor = riskColor;
    riskBox.style.height = "25px";
    riskBox.style.border = "1px solid black";
    riskBox.style.color = "white";
    riskBox.style.textAlign = "center";
    riskBox.style.fontWeight = "bold";
    riskBox.value = Risk_Category;


    let fiveYearRecovery = Total_Claims / 5;
    let suggestedIncrease = fiveYearRecovery * (percentIncrease / 100);

    
    let suggestionText =
        "The suggested surcharge is " + percentIncrease +
        "%. The premium will be increased by $" + suggestedIncrease.toFixed(2);

    document.getElementById("rating_suggestion").value = suggestionText;
}

function Create_PDF() {

    const { jsPDF } = window.jspdf;
    let PDF_Report = new jsPDF();

    let Risk_Category = document.getElementById("risk_category").value;

    PDF_Report.setFontSize(16);
    PDF_Report.text("Claims Risk Assessment Report", 20, 20); 

    PDF_Report.setFontSize(12);
    PDF_Report.text("Account Number: " + document.getElementById("account_number").value, 20, 35); 

    PDF_Report.text("Loss Ratio: " + document.getElementById("loss_ratio").value, 20, 45);

    PDF_Report.text("Risk Category: " + Risk_Category, 20, 55); 

    PDF_Report.text("Rating Suggestion: " + document.getElementById("rating_suggestion").value, 20, 65);

    PDF_Report.save("Risk_Assessment_Report.pdf");
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("account_number").addEventListener("input", Check_Account_Number);

    document.getElementById("years_paid").addEventListener("input", Premium_Input);

    document.getElementById("claims_count").addEventListener("input", Claim_Input);

    document.getElementById("Calculate_Button").addEventListener("click", Calculate_Risk_Assessment);

    document.getElementById("DownloadPDF_Button").addEventListener("click", Create_PDF);
});




