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
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой', 'Как звучит флейта', 'Кларнет', 'Саксофон'],
    "crushdrummers.ru":['Барабанное шоу','Заказать барабанное шоу','Шоу барабанщиков в Москве']
};
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let yandexInput = document.getElementById('text');
let keywords =sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let btnY = document.getElementsByTagName("button")[0];
let i = 0;
let links = document.links; // вся коллекция ссылок
let next = document.getElementsByClassName('pager_item_kind_next');

if (yandexInput != null){
    document.cookie = "site="+site; // "site+"=site;
}else if (location.hostname=="yandex.ru"){
    site = getCookie("site");
}else{
    site=location.hostname;
}

if (yandexInput != null){
    let timerId = setInterval(()=>{
        yandexInput.value+=keyword[i]; //вбивает слово в поисковик. По одной букве с интервалом, заданным рандомно
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btnY.click();
        }
    },2000);
}else if(location.hostname == site){
    setInterval(()=>{
        let index = getRandom (0, links.length);
        if (getRandom(0, 101)>=80){ //вероятность возврата на главную страницу яндекс
            location.href='https://yandex.ru/';
        }
        else if (links[index].href.indexOf (site) !=-1){ // алгоритм для возврата на сайт, выбранный  для прогулки
            links.removeAttribute('target');
            links[index].click();
        }
    },getRandom(3000, 7000));
}else{
    let nextYandexPage = true;
    for (let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site) != -1){
            let link = links[i];
            nextYandexPage = false;
            links.removeAttribute('target');
            setTimeout(()=>{link.click();}, getRandom(1000, 4000));
            break;
        }
    }
    if (document.querySelectorAll(".pager__item", ".pager__item_current_yes", ".pager__item_kind_page")[5].innerText=="10"){ //условие для ограничения. После 10 страницы перейдет в начало
        nextYandexPage = false;
        location.href = 'https://yandex.ru/';
    }
    if (nextYandexPage){ // код для перехода поиска на следующую страницу

        setTimeout(()=>{document.querySelectorAll(".pager__item_kind_next")[0].click();},getRandom(1000,4000));  //document.querySelectorAll('.pager_item_kind_next')
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
