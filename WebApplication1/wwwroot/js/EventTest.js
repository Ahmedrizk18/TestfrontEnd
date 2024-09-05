


function AddRow(button) {
    var parent = button.parentElement;
   

    var newRow = document.createElement('div');
    newRow.classList.add('row');

    for (var i = 1; i <= 3; i++) {
        var col = document.createElement('div');
        col.classList.add('col', 'p-3');
        if (i === 2) {
            col.innerHTML = `<div><input type="text" class="form-control cellimp intval bg-dark text-white"  value="0"  > <div  style="color: red; display: none;">Invalid input</div></div>`;
        } else {
            col.innerHTML = `<div><input type="text" class="form-control bg-primary cellimp decval text-white"  value="0.0"  > <div  style="color: red; display: none;">Invalid input</div></div>`;
        }

        newRow.appendChild(col);
    }
    var items = newRow.querySelectorAll('input');
    for (var i=0; i < items.length; i++) {
        if (i === 1) {
            items[i].addEventListener('input', sum);
            items[i].addEventListener('keydown', IsInputInt);
            items[i].addEventListener('blur', RemoveErrorInvaild);

        } else {
            items[i].addEventListener('input', sum);
            items[i].addEventListener('keydown', IsInputDecimal);
            items[i].addEventListener('blur', RemoveErrorInvaild);
        }

    }
    
    var col = document.createElement('div');
    col.classList.add('col', 'p-3');
    col.innerHTML = `<input type="text" class="form-control bg-dark text-white" id="input${i}" value="0" disabled>`;
    newRow.appendChild(col);

    parent.insertBefore(newRow, parent.firstChild);

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
        event.target.parentElement.lastChild.style.display = 'none';

        return true;
    }
    event.preventDefault();
    event.target.style.border = '2px solid red';
    event.target.parentElement.lastChild.style.display = 'block';
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
        event.target.parentElement.lastChild.style.display = 'none';

        return true;
    }

    event.preventDefault();

    event.target.style.border = '2px solid red';
    event.target.parentElement.lastChild.style.display = 'block';
    return false;


}




function sum(event) {
  

    var row = event.target.closest('.row');

    var cols = row.querySelectorAll('.col.p-3');

    var sum = Array.from(cols).slice(0, -1).reduce((total, col) => {
        var value = parseFloat(col.firstChild.firstChild.value.replace('sum =','')  );
        return total + value;
    }, 0);
    cols[cols.length - 1].querySelector('input[type=text]').value = `sum =${sum}`;





    var container = event.target.closest('.container-fluid');
    var rows = container.querySelectorAll('.row');
    var totalSum = 0;

    var index =  Array.from(event.target.closest('.row')
        .querySelectorAll('.col.p-3'))
        .indexOf(event.target.closest('.col.p-3'));
    for (var i = 0; i < rows.length - 1; i++) {
        var cols = rows[i].querySelectorAll('.col.p-3');
        var value = parseFloat(cols[index].firstChild.firstChild.value);
        totalSum += value;
    }


    rows[rows.length - 1].querySelectorAll('input[type=text]')[index].value = `sum =${totalSum}`;

    
    var summ = Array.from(rows[rows.length - 1].querySelectorAll('.col.p-3'))
        .slice(0, -1).reduce((total, col) => {
            
            var value = parseFloat(col.querySelector('input[type=text]').value.replace('sum =', ''));
        return total + value;
    }, 0);

    rows[rows.length - 1].querySelectorAll('input[type=text]')[3].value = `Total =${summ}`;


}
function RemoveErrorInvaild(event) {
    event.target.style.border = null;
    event.target.parentElement.lastChild.style.display = 'none';
  
}