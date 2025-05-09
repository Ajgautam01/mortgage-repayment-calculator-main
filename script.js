document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const termInput = document.getElementById('term');
    const rateInput = document.getElementById('rate');
    const typeInputs = document.getElementsByName('mortgage-type');
    const resultOutput = document.getElementById('result-output');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.querySelector('.clear-all');

    calculateBtn.addEventListener('click', () => {
        const principal = parseFloat(amountInput.value);
        const years = parseInt(termInput.value);
        const rate = parseFloat(rateInput.value);
        const selectedType = [...typeInputs].find(input => input.checked).value;

        if (isNaN(principal) || isNaN(years) || isNaN(rate)) {
            resultOutput.textContent = 'Please fill in all fields correctly.';
            return;
        }

        const monthlyRate = rate / 100 / 12;
        const totalPayments = years * 12;

        let monthlyPayment;

        if (selectedType === 'repayment') {
            monthlyPayment =
                (principal * monthlyRate) /
                (1 - Math.pow(1 + monthlyRate, -totalPayments));
        } else {
            monthlyPayment = principal * monthlyRate;
        }

        resultOutput.textContent = `£${monthlyPayment.toFixed(2)} per month`;
    });

    clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        amountInput.value = '';
        termInput.value = '';
        rateInput.value = '';
        resultOutput.textContent = '';
        typeInputs[0].checked = true;
    });
});
