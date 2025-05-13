document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const repaymentCheckbox = document.getElementById('repayment');
    const interestOnlyCheckbox = document.getElementById('interestOnly');

    // Ensure only one checkbox is selected at a time
    repaymentCheckbox.addEventListener('change', function () {
        if (this.checked) {
            interestOnlyCheckbox.checked = false;
        }
    });

    interestOnlyCheckbox.addEventListener('change', function () {
        if (this.checked) {
            repaymentCheckbox.checked = false;
        }
    });

    calculateBtn.addEventListener('click', function () {
        // Get input values
        const amount = parseFloat(document.getElementById('mortgageAmount').value);
        const term = parseFloat(document.getElementById('mortgageTerm').value);
        const rate = parseFloat(document.getElementById('interestRate').value);
        const isRepayment = repaymentCheckbox.checked;

        // Validate inputs
        if (isNaN(amount) || isNaN(term) || isNaN(rate)) {
            resultsDiv.textContent = 'Please enter valid numbers in all fields';
            return;
        }

        // Calculate monthly payment
        let monthlyPayment;
        if (isRepayment) {
            // Repayment mortgage calculation
            const monthlyRate = rate / 100 / 12;
            const numberOfPayments = term * 12;
            monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        } else {
            // Interest-only mortgage calculation
            monthlyPayment = (amount * (rate / 100)) / 12;
        }

        // Display results
        resultsDiv.textContent = `£${monthlyPayment.toFixed(2)}`;
    });
});