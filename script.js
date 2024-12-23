let totalPoints = 0;

function addPoints(action) {
    let points = 0;
    switch(action) {
        case 'voluntariado':
            points = 10;
            break;
        case 'doacao':
            points = 5;
            break;
        case 'reciclagem':
            points = 2;
            break;
    }
    totalPoints += points;
    document.getElementById('total-points').innerText = totalPoints;
}
