document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    const calculatorSection = document.querySelector('.calculator');
    if (calculatorSection) {
        const lmpInput = document.getElementById('lmp');
        const cycleLengthSelect = document.getElementById('cycle-length');
        const calculateButton = document.getElementById('calculate');
        const resetButton = document.getElementById('reset');
        const eddOutput = document.getElementById('edd-output');
        const lmpError = document.getElementById('lmp-error');
        const cycleLengthError = document.getElementById('cycle-length-error');

        eddOutput.textContent = "Please enter your information and click 'Calculate' to see your estimated due date.";

        // Populate cycle length dropdown
        for (let i = 20; i <= 45; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === 28) {
                option.selected = true;
            }
            cycleLengthSelect.appendChild(option);
        }

        calculateButton.addEventListener('click', () => {
            lmpError.textContent = '';
            cycleLengthError.textContent = '';
            const lmpValue = lmpInput.value;
            if (!lmpValue) {
                lmpError.textContent = 'Please select a date.';
                return;
            }
            const lmpDate = new Date(lmpValue);
            if (isNaN(lmpDate.getTime())) {
                lmpError.textContent = 'Invalid date format.';
                return;
            }

            const cycleLength = parseInt(cycleLengthSelect.value);
            const cycleAdjustment = cycleLength - 28;

            const edd = new Date(lmpDate);
            edd.setFullYear(edd.getFullYear() + 1);
            edd.setMonth(edd.getMonth() - 3);
            edd.setDate(edd.getDate() + 7 + cycleAdjustment);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            eddOutput.textContent = edd.toLocaleDateString('en-US', options);
        });

        resetButton.addEventListener('click', () => {
            lmpInput.value = '';
            cycleLengthSelect.value = '28';
            eddOutput.textContent = '';
            lmpError.textContent = '';
            cycleLengthError.textContent = '';
        });
    }
});
