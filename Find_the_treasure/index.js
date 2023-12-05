$distance = 0;
$distanceHint = 0;
$clicks = 0;
$remainingClicks = 30;

$target = {
    x: null,
    y: null,
}

function setRandomTreasurePosition() {
    $target.x = Math.floor(Math.random() * 480);
    $target.y = Math.floor(Math.random() * 480);
}
setRandomTreasurePosition();

let getDistance = function (event, target) {
    let diffX = event.offsetX - $target.x;
    let diffY = event.offsetY - $target.y;
    return Math.floor(Math.sqrt((diffX * diffX) + (diffY * diffY)));
};

let getDistanceHint = function (distance) {
    if ($distance < 20) {
        return "Обожжешься!";
    } else if ($distance < 30) {
        return "Очень горячо";
    } else if ($distance < 50) {
        return "Горячо";
    } else if ($distance < 70) {
        return "Тепло";
    } else if ($distance < 120) {
        return "Холодно";
    } else if ($distance < 180) {
        return "Очень холодно";
    } else if($distance < 240){
        return "Очень-очень холодно!";
    } else {
        return "Замерзнешь!";
    }
};

$(".map").click(function (event) {
    $clicks++;
    // Получаем расстояние от места клика до клада
    $distance = getDistance(event, $target);
    // Преобразуем расстояние в подсказку
    $distanceHint = getDistanceHint($distance);
    // Записываем в элемент #distance новую подсказку
    $(".distance").text($distanceHint);
    // Если кликов больше данных, поздравляем с поражением
    if(($remainingClicks - $clicks) == 0){
        alert("У вас закончились клики! Вы проиграли, поздравляю");
        $(".distance").text("Конец игры");
    }
    // Оповещение о кол-ве кликов
    $(".tries").text(`Кол-во оставшихся кликов : ${$remainingClicks - $clicks}`);
    // Если клик был достаточно близко, поздравляем с победой
    if ($distance < 10) {
        alert("Клад найден! Сделано кликов: " + $clicks);
        $(".distance").text("Победа!");
    }
});
