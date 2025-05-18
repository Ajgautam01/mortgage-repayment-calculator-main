document.getElementById('calculateBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortgageAmount').value);
    const years = parseInt(document.getElementById('mortgageTerm').value);
    const rate = parseFloat(document.getElementById('interestRate').value);
    const type = document.querySelector('input[name="mortgageType"]:checked').value;

    const monthlyPaymentElement = document.querySelector('.monthly-payment');
    const totalRepaymentElement = document.querySelector('.total-repayment span:last-child');
    const resultsDescription = document.querySelector('.results-description');

    if (isNaN(amount) || isNaN(years) || isNaN(rate) || amount <= 0 || years <= 0 || rate <= 0) {
        monthlyPaymentElement.textContent = '£0.00';
        totalRepaymentElement.textContent = '£0.00';
        resultsDescription.textContent = 'Please enter valid values in all fields to calculate your repayments.';
        return;
    }

    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;
    let monthlyPayment;
    let totalAmount;

    if (type === "repayment") {
        // Repayment mortgage formula
        monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
            (Math.pow(1 + monthlyRate, totalPayments) - 1);
        totalAmount = monthlyPayment * totalPayments;
    } else {
        // Interest-only mortgage formula
        monthlyPayment = amount * monthlyRate;
        totalAmount = amount + (monthlyPayment * totalPayments);
    }

    // Update the UI
    monthlyPaymentElement.textContent = `£${monthlyPayment.toFixed(2)}`;
    totalRepaymentElement.textContent = `£${totalAmount.toFixed(2)}`;
});

// Clear All functionality
document.querySelector('.clr-btn').addEventListener('click', () => {
    document.getElementById('mortgageAmount').value = '';
    document.getElementById('mortgageTerm').value = '';
    document.getElementById('interestRate').value = '';
    document.querySelector('input[name="mortgageType"][value="repayment"]').checked = true;

    document.querySelector('.monthly-payment').textContent = '£0.00';
    document.querySelector('.total-repayment span:last-child').textContent = '£0.00';
    document.querySelector('.results-description').textContent =
        'Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.';
});