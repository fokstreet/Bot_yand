// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Труба', 'Оркестр', 'Флейта', 'Гитара'],
    "crushdrummers.ru":['Барабанное шоу', 'Заказать барабанное шоу', 'Шоу барабанщиков в Москве']
};
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let yandexInput = document.getElementById('text');
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let btnY = document.querySelectorAll(".button_js_inited")[0];
let i = 0;
let links = document.links;


if (btnY != undefined){
    document.cookie = "site="+site; // "site+"=site;
}else if (location.hostname=="yandex.ru"){
    site = getCookie("site");
}else{
    site=location.hostname;
}

if (btnY != undefined){
    let timerId = setInterval(()=>{
        yandexInput.value+=keyword[i]; //вбивает слово в поисковик. По одной букве с интервалом, заданным рандомно
        i++;
        if (i==keyword.length){
            clearInterval(timerId);

            btnY.click(); //клик по кнопке поиска
        }
    },2000);
}else if(location.hostname == site){
    site = getCookie("site");
    setInterval(()=>{
        let index = getRandom (0, links.length);
        if (getRandom(0, 101)>=80){ //вероятность возврата на главную страницу гугл
            location.href='https://www.yandex.ru/';
        }
        else if (links[index].href.indexOf (site) !=-1) // алгоритм для возврата на сайт, выбранный  для прогулки
            links[index].click();
    },getRandom(3000, 7000));
}else{
    let nextYandexPage = true;
    for (let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site) != -1){
            let link = links[i];
            nextYandexPage = false;
            links[i].removeAttribute('target');
            setTimeout(()=>{link.click();}, getRandom(1000, 4000));
            break;
        }
    
    if (document.querySelectorAll(".pager__item", ".pager__item_current_yes", ".pager__item_kind_page")[5].innerText=="10"){ //условие для ограничения. После 10 страницы перейдет в начало
        nextYandexPage = false;
        location.href = 'https://yandex.ru/';
    }
    if (nextYandexPage){ // код для перехода поиска на следующую страницу
        setTimeout(()=>{document.querySelectorAll(".pager__item_kind_next")[0].click();},getRandom(1000,4000));
    }
  }
}

function getRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
