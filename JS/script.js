// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==
let yandexInput = document.getElementById('text');
let keywords =['Гобой', 'Как звучит флейта', 'Кларнет', 'Саксофон', 'Труба'];
let keyword = keywords[getRandom(0, keywords.length)];
let btnY = document.getElementsByTagName("button")[0];
let links = document.links;
let next = document.getElementsByClassName('pager_item_kind_next');
let i = 0;

if (yandexInput != undefined){
    let timerId = setInterval(()=>{
        yandexInput.value+=keyword[i]; //вбивает слово в поисковик. По одной букве с интервалом, заданным рандомно
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btnY.click();
        }
    },1000*getRandom(1, 3));
}else if(location.hostname == "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai"){
    setInterval(()=>{
        let index = getRandom (0, links.length);
        if (getRandom(0, 101)>=80){ //вероятность возврата на главную страницу яндекс
            location.href='https://yandex.ru/';
        }
        if (links[index].href.indexOf ("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") !=-1) // алгоритм для возврата на сайт, выбранный  для прогулки
            links.removeAttribute('target');
            links[index].click();
    },getRandom(3000, 7000));
}else{
    let nextYandexPage = true;
    for (let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            let link = links[i];
            nextYandexPage = false;
            setTimeout(()=>{link.click();}, getRandom(1000, 4000));
            link.removeAttribute('target');
            break;
        }
    }
    /* if (document.querySelector(".45zuf2").innerText=="10"){ //условие для ограничения. После 10 страницы перейдет в начало
        nextYandexPage = false;
        location.href = 'https://yandex.ru/';*/

    if (nextYandexPage){ // код для перехода поиска на следующую страницу

        setTimeout(()=>{document.getElementsByClassName('.pager__item_kind_page').click();},getRandom(1000,4000));  //document.querySelectorAll('.pager_item_kind_next')
    }
}


function getRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
