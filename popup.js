document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['result', 'inputType'], (data) => {
        if (data.result) {
            document.getElementById('input').value = data.result;
            let convertedResult;
            if (data.inputType === 'hex') {
                convertedResult = hexToText(data.result);
            } else if (data.inputType === 'text') {
                convertedResult = textToHex(data.result);
            }
            document.getElementById('result').value = convertedResult;
            copyToClipboard(convertedResult);
        }
    });
});

// Function to show success message
function showSuccessMessage() {
    const messageDiv = document.getElementById('successMessage');
    messageDiv.style.display = 'block';
    // setTimeout(() => {
    //     messageDiv.style.display = 'none';
    // }, 2000); // Hide after 2 seconds
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccessMessage(); // Show success message
    });
}

// Event for copy icon
document.getElementById('copyIcon').addEventListener('click', () => {
    const resultText = document.getElementById('result').value;
    copyToClipboard(resultText); // Copy result text to clipboard
});

// Event for swap icon
document.getElementById('swapButton').addEventListener('click', () => {
    const inputText = document.getElementById('input').value;
    const resultText = document.getElementById('result').value;
    document.getElementById('input').value = resultText;
    document.getElementById('result').value = inputText;
});

document.getElementById('convertHex').addEventListener('click', () => {
    const hexInput = document.getElementById('input').value;
    const result = hexToText(hexInput);
    document.getElementById('result').value = result;
    copyToClipboard(result); // Auto copy to clipboard
});

document.getElementById('convertText').addEventListener('click', () => {
    const textInput = document.getElementById('input').value;
    const result = textToHex(textInput);
    document.getElementById('result').value = result;
    copyToClipboard(result); // Auto copy to clipboard
});

function hexToText(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

function textToHex(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16);
    }
    return hex;
} 