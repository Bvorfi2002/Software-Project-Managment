// commissionCalculator.js

// SPIF commission calculation
function calculateSpifCommission(contractValue, namesCount) {
    let commission = 0;
    if (contractValue >= 295 && namesCount >= 10) {
        commission = 25;
    } else if (contractValue >= 200 && namesCount >= 10) {
        commission = 20;
    } else if (contractValue >= 100 && namesCount >= 10) {
        commission = 15;
    } else if (contractValue >= 50 && namesCount >= 10) {
        commission = 10;
    }

    // If the agent is unable to get 10 names, the SPIF commissions are €5 less
    if (namesCount < 10) {
        commission -= 5;
    }

    return commission;
}

// Tiered commission calculation
function calculateTieredCommission(salesCount) {
    let commission = 0;
    if (salesCount >= 7) {
        commission = salesCount * 160;
    } else if (salesCount >= 5) {
        commission = salesCount * 150;
    } else if (salesCount >= 3) {
        commission = salesCount * 140;
    }

    return commission;
}

// Phone agent commission calculation
function calculatePhoneAgentCommission(saleValue, installationCompleted) {
    let commission = 1.5;
    if (saleValue > 50) {
        commission += 5;
    }
    if (installationCompleted) {
        commission += 10;
    }

    return commission;
}

module.exports = {
    calculateSpifCommission,
    calculateTieredCommission,
    calculatePhoneAgentCommission
};
