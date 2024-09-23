const screen = document.getElementById('screen');

screen.addEventListener('click', function() {

    // PETALS
    function createPetal(degree, distance) {
    const petal = document.createElement('div');
    petal.id = 'petal';
    const radian = degree * (Math.PI / 180);
    const x = Math.cos(radian) * distance;
    const y = Math.sin(radian) * distance;
    petal.style.top = `calc(50% - 25px + ${y}px)`;
    petal.style.left = `calc(50% - 25px + ${x}px)`;
    flower.appendChild(petal);

    setTimeout(function() {
        petal.style.opacity = '0.6';
    }, 10);
    }
    // CONTROL NUMBER
    setTimeout(function() {
        const numberOfPetals = 6;
        const radius = 100;

        for (let i = 0; i < numberOfPetals; i++) {
        const angle = i * (360 / numberOfPetals);
        createPetal(angle, radius);
        }
    }, 1500);

});