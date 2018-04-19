'use strict';

function calcView(container, data) {

    let outputNode, historyNode;

    this.init = function () {
        this.el = document.createElement('div');
        this.el.className = 'calc';
        container.append(this.el);
      }
    
    this.update = function() {
        outputNode.textContent = data.getCurrentValue();
        historyNode.textContent = data.getHistory();
    }

    let context = this;
    
    this.render = function () {
        
        this.el.innerHTML = this.template();
        outputNode = this.el.querySelector('.calc__text-field');
        historyNode = this.el.querySelector('.calc__history');
        let lines = this.el.querySelectorAll('.calc__row');

        function buttonFabric(options = {}){
            let button = document.createElement('div');
            button.className = options.classList;
            button.append( document.createTextNode(options.text || '') );
            button.onclick = () => {
                options.callback();
                if (options.storeAction === true) {
                    context.el.querySelectorAll('.calc__button').forEach( (elem) => {elem.classList.remove('calc__button_last-action')} );
                    button.classList.add('calc__button_last-action');
                }
                context.update();
            }
            return button;
        }

        lines[0].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: 'AC', callback: null}) );
        lines[0].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: '\u00B1', callback: data.changeSignCallback}) );
        lines[0].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: '\u0025', callback: data.percentCallback}) );
        lines[0].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: '\u00f7', callback: data.divisionCallback, storeAction: true}) );

        lines[1].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '7', callback: data.addNumeralCallback.bind(data, '7')}) );
        lines[1].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '8', callback: data.addNumeralCallback.bind(data, '8')}) );
        lines[1].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '9', callback: data.addNumeralCallback.bind(data, '9')}) );
        lines[1].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: '\u00d7', callback: data.mulCallback, storeAction: true}) );

        lines[2].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '4', callback: data.addNumeralCallback.bind(data, '4')}) );
        lines[2].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '5', callback: data.addNumeralCallback.bind(data, '5')}) );
        lines[2].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '6', callback: data.addNumeralCallback.bind(data, '6')}) );
        lines[2].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: '\u2212', callback: data.subtractionCallback, storeAction: true}) );

        lines[3].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '1', callback: data.addNumeralCallback.bind(data, '1')}) );
        lines[3].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '2', callback: data.addNumeralCallback.bind(data, '2')}) );
        lines[3].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '3', callback: data.addNumeralCallback.bind(data, '3')}) );
        lines[3].append( buttonFabric({classList: 'calc__button calc__button_action ripple__button_normal', text: '\u002b', callback: data.sumCallback, storeAction: true}) );

        lines[4].append( buttonFabric({classList: 'calc__placeholder'}) );
        lines[4].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '0', callback: data.addNumeralCallback.bind(data, '0')}) );
        lines[4].append( buttonFabric({classList: 'calc__button ripple__button_normal', text: '.', callback: data.addFractionCallback}) );
        lines[4].append( buttonFabric({classList: 'calc__button calc__button_equal ripple__button_dark', text: '\u003d', callback: data.computationCallback, storeAction: true}) );
    }
      
      this.template = function () {
        return `
            <div class = 'calc__history'></div>
            <div class = 'calc__text-field'>0</div>
            <div class = 'calc__devider'></div>
            <div class = 'calc__row'>
            </div>
            <div class = 'calc__row'>
            </div>
            <div class = 'calc__row'>
            </div>
            <div class = 'calc__row'>
            </div>
            <div class = 'calc__row'>
            </div>
        `;
      }

      this.init();
      this.render();
}