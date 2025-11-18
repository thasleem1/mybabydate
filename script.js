document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    const calculatorSection = document.querySelector('.calculator');
    if (calculatorSection) {
        const lmpInput = document.getElementById('lmp');
        const cycleLengthSelect = document.getElementById('cycle-length');
        const calculateButton = document.getElementById('calculate');
        const resetButton = document.getElementById('reset');
        const eddOutput = document.getElementById('edd-output');
        const outputSection = document.querySelector('.output');
        const lmpError = document.getElementById('lmp-error');
        const cycleLengthError = document.getElementById('cycle-length-error');

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const maxDate = `${year}-${month}-${day}`;
        lmpInput.setAttribute('max', maxDate);

        const priorDate = new Date(new Date().setDate(today.getDate() - 365));
        const priorYear = priorDate.getFullYear();
        const priorMonth = String(priorDate.getMonth() + 1).padStart(2, '0');
        const priorDay = String(priorDate.getDate()).padStart(2, '0');
        const minDate = `${priorYear}-${priorMonth}-${priorDay}`;
        lmpInput.setAttribute('min', minDate);

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
            const lmpDateParts = lmpValue.split('-');
            const lmpDate = new Date(lmpDateParts[0], lmpDateParts[1] - 1, lmpDateParts[2]);
            
            if (isNaN(lmpDate.getTime())) {
                lmpError.textContent = 'Invalid date format.';
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (lmpDate > today) {
                lmpError.textContent = 'Please select a date in the past.';
                return;
            }

            const cycleLength = parseInt(cycleLengthSelect.value);
            const cycleAdjustment = cycleLength - 28;

            const edd = new Date(lmpDate);
            edd.setDate(edd.getDate() + 280 + cycleAdjustment);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            eddOutput.textContent = `Estimated Due Date: ${edd.toLocaleDateString('en-US', options)}`;

            const diffTime = edd.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const daysToGoOutput = document.getElementById('days-to-go');
            daysToGoOutput.textContent = `Days to go: ${diffDays}`;

            outputSection.style.display = 'block';
            calculatorSection.classList.add('active');
        });

        resetButton.addEventListener('click', () => {
            lmpInput.value = '';
            cycleLengthSelect.value = '28';
            eddOutput.textContent = '';
            const daysToGoOutput = document.getElementById('days-to-go');
            daysToGoOutput.textContent = '';
            lmpError.textContent = '';
            cycleLengthError.textContent = '';
            outputSection.style.display = 'none';
            calculatorSection.classList.remove('active');
        });
    }
});
