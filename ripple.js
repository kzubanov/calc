'use strict';

//добавляем эвент листсенеры ко многим объектам
let addMulitListener = function(el, event, callback) {
    el.forEach( (element) => {
        element.addEventListener(event, callback);
        }
    );
}

//конструктор риплов с разными классами. делаем чтобы можно было делать анимацию нажатия разного цвета
function rippleConstructor(className) {
    return function(e){
        let ripple = this.querySelector('.' + className);
    
        if(ripple == null) {
            ripple = document.createElement('span'); 
            ripple.classList.add(className);
            this.insertBefore(ripple, this.firstChild);
    
            let size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
        }
      
        ripple.classList.remove('animate');
        ripple.style.top = e.target.offsetHeight / 2 - ripple.offsetHeight / 2 + 'px';
        ripple.style.left = e.target.offsetWidth / 2 - ripple.offsetWidth / 2 + 'px';
        ripple.classList.add('animate');
        setTimeout( () => {ripple.remove()}, 350 );
    }
}


//добавляем рипл разного цвета разным кнопкам
addMulitListener( document.querySelectorAll('.ripple__button_normal'), 'click', rippleConstructor('ripple-normal') );
addMulitListener( document.querySelectorAll('.ripple__button_dark'), 'click', rippleConstructor('ripple-dark') );