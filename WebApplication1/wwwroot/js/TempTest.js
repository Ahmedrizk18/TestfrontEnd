function AddRow(button) {

    var parent = button.closest('.container-fluid');
    var template = document.getElementById('row-template');
    var newRow = template.content.cloneNode(true);
    parent.insertBefore(newRow, parent.firstChild);
    bindEventsToItems();

}

function RemoveErrorInvaild(event) {
    event.target.style.border = null;
    event.target.parentElement.querySelector('.color').style.display = 'none';

}
function bindEventsToItems(){
    var itemsDecimal = document.querySelectorAll('.cellInput.decimalValue');
    var itemsInt = document.querySelectorAll('.cellInput.intValue');
    itemsDecimal.forEach(function (item) {
          item.addEventListener('input',Sum);
        item.addEventListener('blur', RemoveErrorInvaild);
          item.addEventListener('keydown',IsInputDecimal);
    });
    itemsInt.forEach(function (item) {
        item.addEventListener('input', Sum);
        item.addEventListener('blur', RemoveErrorInvaild);
          item.addEventListener('keydown',IsInputInt);
    });
}

function IsInputInt(event) {
    var code = event.keyCode;

    if (
        code === 8 ||  //backspace
        code === 9 ||   //horizontal tab
        code === 27 || //escape
        (code >= 48 && code <= 57) || // 0-9
        (code >= 96 && code <= 105)   //0-9
    ) {
        
        event.target.style.border = null;
        event.target.parentElement.querySelector('.color').style.display = 'none';
        return true;
    }
    event.preventDefault();
    event.target.style.border = '2px solid red';
    event.target.parentElement.querySelector('.color').style.display = 'block';
    return false;




}
function IsInputDecimal(event) {
    var code = event.keyCode;

    if (
        code === 8 ||
        code === 9 ||
        code === 27 ||
        ((code === 190 || code === 110) && !event.target.value.includes('.')) ||
        (code >= 48 && code <= 57) ||
        (code >= 96 && code <= 105)

    ) {

        event.target.style.border = null;
        event.target.parentElement.querySelector('.color').style.display= 'none';

        return true;
    }

    event.preventDefault();

    event.target.style.border = '2px solid red';
    event.target.parentElement.querySelector('.color').style.display = 'block';
    return false;


}

function Sum(event) {
    var row = event.target.closest('.row');
    var cols = row.querySelectorAll('.cellInput');

    var sum = Array.from(cols).reduce((total, col) => {
        var value = parseFloat(col.value);
        return total + value;
    }, 0);
    row.querySelector('.cellSum').value = `sum = ${sum}`;

    var container = event.target.closest('.container-fluid');
    var rows = container.querySelectorAll('.row');
    var index = Array.from(event.target.closest('.row')
        .querySelectorAll('.col.p-3'))
        .indexOf(event.target.closest('.col.p-3'));

    var result;

    switch (index) {
        case 0:
            result = '.one';
            break;
        case 1:
            result = '.two';
            break;
        case 2:
            result = '.three';
            break;
        default:
            result = 'unknown';
    }
    var cols = container.querySelectorAll(result);
    var sumCol = 0;
    Array.from(cols).slice(0, -1).forEach(function (element) {
        var value = parseFloat(element.querySelector('.cellInput').value) ;
        sumCol += value;
    });
    cols[cols.length - 1].value = `sum = ${sumCol}`;


    var total = Array.from(container.querySelector('.tablesum').querySelectorAll('.col.p-3'))
        .slice(0, -1).reduce((total, col) => {

            var value = parseFloat(col.querySelector('input[type=text]').value.replace('sum =', ''));
            return total + value;
        }, 0);
    container.querySelector('.four').value = `Total = ${total}`;

}