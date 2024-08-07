document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('passwordText');
    const lengthSlider = document.getElementById('length');
    const lengthDisplay = document.getElementById('lengthDisplay');
    const copyButton = document.getElementById('copy');
    const generateButton = document.getElementById('generate');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    function getRandomCharacter(type) {
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const special = '!@#$%^&*()_+[]{}|;:,.<>?';
        switch (type) {
            case 'lowercase': return lower[Math.floor(Math.random() * lower.length)];
            case 'uppercase': return upper[Math.floor(Math.random() * upper.length)];
            case 'numbers': return numbers[Math.floor(Math.random() * numbers.length)];
            case 'special': return special[Math.floor(Math.random() * special.length)];
            default: return '';
        }
    }

    function generatePassword(length, options) {
        let characters = '';
        if (options.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (options.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.numbers) characters += '0123456789';
        if (options.special) characters += '!@#$%^&*()_+[]{}|;:,.<>?';

        if (characters === '') return '';

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters[Math.floor(Math.random() * characters.length)];
        }
        return password;
    }

    function updatePassword() {
        const length = parseInt(lengthSlider.value, 10);
        const options = {
            lowercase: document.getElementById('lowercase').checked,
            uppercase: document.getElementById('uppercase').checked,
            numbers: document.getElementById('numbers').checked,
            special: document.getElementById('special').checked
        };

        const newPassword = generatePassword(length, options);
        passwordDisplay.textContent = newPassword;
    }

    // Event listeners
    lengthSlider.addEventListener('input', () => {
        lengthDisplay.textContent = `Length: ${lengthSlider.value}`;
        updatePassword();
    });

    generateButton.addEventListener('click', () => {
        updatePassword();
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePassword);
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordDisplay.textContent)
            .then(() => alert('Password copied to clipboard!'))
            .catch(err => console.error('Failed to copy password: ', err));
    });

    // Generate a default password on load
    updatePassword();
});
