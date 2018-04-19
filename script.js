'use strict';

function Calc(options = {}) {

    //запоминаем действие, которое нужно выполнить
    let lastAction = null;
    let lastActionSign = '';

    let history = '';
    this.getHistory = function() {
        return history;
    }

    //если есть действие и мы готовы к вводу нового значения
    let isReadyForArgument = false;

    //если есть действие и мы готовы к вводу нового значения
    let isReadyForComputation = false;

    //в калькуляторе с вводом придется работать как со строкой, чтобы это было удобно пишем класс
    let currentValue = options.currentValue || '0';
    let oldValue = options.oldValue || '0';
    
    function shortString() {
        let maxSymbolCount = 12;
        console.log(currentValue);
        if (currentValue.length > maxSymbolCount) {
            if (currentValue.indexOf('e+') > -1) {
                currentValue = 'Infinity';
                return;
            }
            if (currentValue.indexOf('e-') > -1) {
                currentValue = '0';
                return;
            }
            currentValue = currentValue.slice(0, maxSymbolCount);
            if (currentValue[currentValue.length - 1] === '.') {
                currentValue = currentValue.slice(0, currentValue.length - 1);
            }
        }
    }

    this.getCurrentValue = function() {
        return currentValue; 
    }

    this.setCurrentValue = function(num) {
        currentValue = String(num) || '0';
        shortString();
    }

    function addNumeral(num) {
        if (isReadyForArgument) {
            currentValue = String(num);
            isReadyForArgument = false;
            isReadyForComputation = true;
            return;
        }
        if (currentValue === '0') {
            currentValue = String(num);
            return;
        }
        if (currentValue === '-0') {
            currentValue = '-' + String(num);
            return;
        }
        currentValue += String(num);
        shortString();
    }

    function addFraction() {
        if (isReadyForArgument) {
            currentValue = '0.';
            isReadyForArgument = false;
            isReadyForComputation = true;
        }
        if ( currentValue.indexOf('.') > -1) {
            return;
        }
        currentValue += '.';
        shortString();
    }

    function changeSign() {
        if (isReadyForArgument) {
            currentValue = '-0';
            isReadyForArgument = false;
            isReadyForComputation = true;
        }
        if ( currentValue[0] === '-' ) {
            currentValue = currentValue.slice(1);
            return;
        }
        currentValue = '-' + currentValue;
        shortString();
    }

    function percent() {
        if (currentValue === '0' || currentValue === '-0') {
            return;
        }
        currentValue = String( Number(currentValue) / 100);
        shortString();
    }

    let context = this;

    function callbackConstructor(callback, sign) {
        let func = function() {
            if (isReadyForComputation && lastAction) {
                history = oldValue + ' ' + lastActionSign + ' ' + currentValue + ' = ';
                lastAction();
                history += currentValue;
                lastAction = null;
                isReadyForComputation = false;
            }
            isReadyForArgument = true;
            oldValue = currentValue;
            if (callback) {
                lastAction = callback.bind(this);
                lastActionSign = sign;
            }            
        }
        return func.bind(context);
    }


    function sum() {
        let result = Number(oldValue) + Number(currentValue);
        if (!isNaN(result)) {
            this.setCurrentValue( result );
            return;
        }
        this.setCurrentValue( 0 );
    }

    function mul() {
        let result = Number(oldValue) * Number(currentValue);
        if (!isNaN(result)) {
            this.setCurrentValue( result );
            return;
        }
        this.setCurrentValue( 0 );
    }

    function division() {
        let result = Number(oldValue) / Number(currentValue);
        if (!isNaN(result)) {
            this.setCurrentValue( result );
            return;
        }
        this.setCurrentValue( 0 );
    }

    function subtraction() {
        let result = Number(oldValue) - Number(currentValue);
        if (!isNaN(result)) {
            this.setCurrentValue( result );
            return;
        }
        this.setCurrentValue( 0 );
    }

    this.sumCallback = callbackConstructor(sum, '\u002b');
    this.mulCallback = callbackConstructor(mul, '\u00d7');
    this.divisionCallback = callbackConstructor(division, '\u00f7');
    this.subtractionCallback = callbackConstructor(subtraction, '\u2212');
    this.addNumeralCallback = addNumeral.bind(context);
    this.changeSignCallback = changeSign.bind(context);
    this.addFractionCallback = addFraction.bind(context);
    this.percentCallback = percent.bind(context);
    this.computationCallback = callbackConstructor();
    
    
}

let calc = new Calc();