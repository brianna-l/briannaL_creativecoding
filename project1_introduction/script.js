document.addEventListener('DOMContentLoaded', function() {
    // typing effect
    // citing from https://www.w3schools.com/HOWTO/howto_js_typewriter.asp
    // fixed by ChatGPT
    var i = 0;
    var lines = [
        'Hi,',
        'this is Brianna',
        'and here is something about me',
        '.....',
    ];
    var speed = 100;
    var currentLine = 0;

    function typeWriter(text, element, callback) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(text, element, callback), speed);
        } else {
            if (callback) callback();
        }
    }

    function startTyping() {
        const textElement = document.getElementById('textContainer');

        function LineChange() {
            if (currentLine < lines.length) {
                textElement.innerHTML = '';
                i = 0;
                typeWriter(lines[currentLine], textElement, function() {
                    currentLine++;
                    setTimeout(LineChange, 3000);
                });
            }
        }
        LineChange();
    }
    startTyping();
});