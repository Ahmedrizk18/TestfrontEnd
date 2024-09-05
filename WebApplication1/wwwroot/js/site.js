// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
class Counter {
    static count = 0;

    static increment() {
        this.count++;
        return this.count;
    }
}

function AddRow(containerId) {
    var container = document.getElementById(containerId);

    var newRow = document.createElement('div');
    newRow.classList.add('row');

    for (var i = 1; i <= 3; i++) {
        var col = document.createElement('div');
        col.classList.add('col', 'p-3');
        var index = Counter.increment();
        if (i === 2) {
            col.innerHTML = `<div><input type="text" class="form-control bg-dark text-white" id="input${containerId}${index}${i}" value="0" onblur="RemoveErrorInvaild('input${containerId}${index}${i}')" onkeydown="return IsInputInt(event,'input${containerId}${index}${i}')" onpaste="validatePasteDecimal(event, 'input${containerId}${index}${i}')" oninput="Sumcolumn('${containerId}');SumRow('${containerId}')"> <div id="error${containerId}${index}${i}" style="color: red; display: none;">Invalid input</div></div>`;
        } else {
            col.innerHTML = `<div><input type="text" class="form-control bg-primary text-white" id="input${containerId}${index}${i}" value="0.0" onblur="RemoveErrorInvaild('input${containerId}${index}${i}')" onkeydown="return IsInputDecimal(event,'input${containerId}${index}${i}')" onpaste="validatePasteDecimal(event,'input${containerId}${index}${i}')" oninput=" Sumcolumn('${containerId}');SumRow('${containerId}')"> <div id="error${containerId}${index}${i}" style="color: red; display: none;">Invalid input</div></div>`;
        }

        newRow.appendChild(col);
    }
    var col = document.createElement('div');
    col.classList.add('col', 'p-3');
    col.innerHTML = `<input type="text" class="form-control bg-dark text-white" id="input${i}" value="0" disabled>`;
    newRow.appendChild(col);

    container.insertBefore(newRow, container.firstChild);

}


function SumRow(containerId) {
    var container = document.getElementById(containerId);
    var rows = container.getElementsByClassName('row');

    for (var i = 0; i < rows.length - 1; i++) {
        var cols = rows[i].getElementsByClassName('col');
        var sum = 0;
        for (var j = 0; j < cols.length - 1; j++) {
            sum += parseFloat(cols[j].getElementsByClassName('form-control')[0].value) || 0;
        }
        cols[cols.length - 1].getElementsByClassName('form-control')[0].value = `sum = ${sum}`
    }
    SumAllColumns();
}


function Sumcolumn(containerId) {
    var container = document.getElementById(containerId);
    var rows = container.getElementsByClassName('row');
    var Sumcol1 = 0, Sumcol2 = 0, Sumcol3 = 0;

    for (var i = 0; i < rows.length - 1; i++) {
        var cols = rows[i].getElementsByClassName('col');

        Sumcol1 += parseFloat(cols[0].getElementsByTagName('input')[0].value) || 0;

        Sumcol2 += parseInt(cols[1].getElementsByTagName('input')[0].value) || 0;

        Sumcol3 += parseFloat(cols[2].getElementsByTagName('input')[0].value) || 0;

    }

    document.getElementById(`sum${containerId.slice(-1)}1`).value = `sum = ${Sumcol1}`;
    document.getElementById(`sum${containerId.slice(-1)}2`).value = `sum = ${Sumcol2}`;
    document.getElementById(`sum${containerId.slice(-1)}3`).value = `sum = ${Sumcol3}`;
    var totalSum = Sumcol1 + Sumcol2 + Sumcol3;
    document.getElementById(`sum${containerId.slice(-1)}4`).value = `Total = ${totalSum}`;
    SumAllColumns();
}

function SumAllColumns() {
    var totalSum1 = 0, totalSum2 = 0, totalSum3 = 0, totalTotalSum = 0;

    for (var containerIndex = 1; containerIndex <= 3; containerIndex++) {
        var sum1Element = document.getElementById('sum' + containerIndex + '1');
        var sum2Element = document.getElementById('sum' + containerIndex + '2');
        var sum3Element = document.getElementById('sum' + containerIndex + '3');

        totalSum1 += parseFloat(sum1Element.value.replace('sum = ', '')) || 0;
        totalSum2 += parseInt(sum2Element.value.replace('sum = ', '')) || 0;
        totalSum3 += parseFloat(sum3Element.value.replace('sum = ', '')) || 0;
    }

    totalTotalSum = totalSum1 + totalSum2 + totalSum3;

    document.getElementById('totalSum1').value = `sum = ${totalSum1}`;
    document.getElementById('totalSum2').value = `sum = ${totalSum2}`;
    document.getElementById('totalSum3').value = `sum = ${totalSum3}`;
    document.getElementById('totalSum4').value = `Total = ${totalTotalSum}`;
}
function deleteSelectedText(input) {

    var item = document.getElementById(input);
    var start = item.selectionStart;
    var end = item.selectionEnd;
    if (start !== end) {
        var value = item.value;
        item.value = value.substring(0, start) + value.substring(end);
        item.setSelectionRange(start, start);
    }

}
function IsInputInt(event, input) {
    var code = event.keyCode;

    if (
        code === 8 ||  //backspace
        code === 9 ||   //horizontal tab
        code === 27 || //escape
        (code >= 48 && code <= 57) || // 0-9
        (code >= 96 && code <= 105)   //0-9
    ) {
        document.getElementById(input).style.border = null;
        document.getElementById(input.replace('input', 'error')).style.display = 'none';
        deleteSelectedText(input);
        return true;
    }
    document.getElementById(input).style.border = '2px solid red';
    document.getElementById(input.replace('input', 'error')).style.display = 'block';

    return false;
}
function IsInputDecimal(event, input) {
    var code = event.keyCode;
    var inputValue = document.getElementById(`${input}`).value;

    deleteSelectedText(input);

    if (
        code === 8 ||
        code === 9 ||
        code === 27 ||
        ((code === 190 || code === 110) && !document.getElementById(`${input}`).value.includes('.')) ||
        (code >= 48 && code <= 57) ||
        (code >= 96 && code <= 105)

    ) {

        document.getElementById(input).style.border = null;
        document.getElementById(input.replace('input', 'error')).style.display = 'none';
      //  deleteSelectedText(input);
        return true;
    }
    document.getElementById(input).value = inputValue;
    document.getElementById(input).style.border = '2px solid red';
    document.getElementById(input.replace('input', 'error')).style.display = 'block';

    return false;
}


function validatePasteDecimal(event, input) {

    event.preventDefault();
    var Data = (event.clipboardData || window.clipboardData).getData('text');
    var Pattern = /^-?\d*\.?\d*$/;
    var itemvalue = document.getElementById(input).value;
    deleteSelectedText(input);

    if (Pattern.test(Data)) {
        if (!(Data.includes('.') && document.getElementById(input).value.includes('.'))) {
            document.getElementById(input).value += Data;
        }

        else {
            document.getElementById(input).style.border = '2px solid red';
            document.getElementById(input.replace('input', 'error')).style.display = 'block';
            document.getElementById(input).value = itemvalue;

        }

    }
    else {
        document.getElementById(input).style.border = '2px solid red';
        document.getElementById(input.replace('input', 'error')).style.display = 'block';
        document.getElementById(input).value = itemvalue;

    }
}
function validatePasteInt(event, input) {
    event.preventDefault();
    var Data = (event.clipboardData || window.clipboardData).getData('text');
    var Pattern = /^-?\d+$/;
    if (Pattern.test(Data)) {
        deleteSelectedText(input);
        document.getElementById(input).value += Data;
    } else {
        document.getElementById(input).style.border = '2px solid red';

        document.getElementById(input.replace('input', 'error')).style.display = 'block';

    }
}
function RemoveErrorInvaild(input) {
    document.getElementById(input).style.border = null;
    document.getElementById(input.replace('input', 'error')).style.display = 'none';
    // input.style.border = null;
    //var d = document.getElementById(input);

    //var parentDiv = input.parentNode;

    //var divs = parentDiv.querySelector('error1');
    //var errorElements = document.querySelectorAll('[id^="error"]');

    //var tt = document.getElementsByTagName(`error`);//.style.display = 'none';
}
function validateIntgerNumber(input) {
    var value = input.value.trim();
    var Pattern = /^-?\d+$/;

    if (!Pattern.test(value)) {
        alert("Invalid integer number.");
        input.value = "0";
    }
}

function validateDecimalNumber(input) {
    var value = input.value.trim();

    var Pattern = /^-?\d*\.?\d*$/;

    if (!Pattern.test(value)) {
        alert("Invalid decimal or integer number.");
        input.value = "0.0";
    }
}
//jQuery
//function AddRow(containerId) {

//    var container = $('#' + containerId);
//    var newRow = $('<div>').addClass('row');
//    for (var i = 1; i <= 3; i++) {
//        var col = $('<div>').addClass('col p-3');
//        if (i === 2) {

//            col.html(`<input type="text" class="form-control bg-dark text-white" id="input${i}" value="0" oninput="validateIntgerNumber(this); Sumcolumn('${containerId}');SumRow('${containerId}')">`);


//        } else {

//            col.html(`<input type="text" class="form-control bg-primary text-white" id="input${i}" value="0.0" oninput="validateDecimalNumber(this); Sumcolumn('${containerId}');SumRow('${containerId}')">`);

//        }
//        newRow.append(col);


//    }
//    var lastCol = $('<div>').addClass('col p-3');
//    lastCol.html(`<input type="text" class="form-control bg-dark text-white" id="input${i}" value="0" oninput="validateIntgerNumber(this); Sumcolumn('${containerId}');SumRow('${containerId}')" disabled>`);
//    newRow.append(lastCol);

//    container.prepend(newRow);
//}

//function Sumcolumn(containerId) {
//    var container = $('#' + containerId);
//    var rows = container.find('.row');
//    var Sumcol1 = 0, Sumcol2 = 0, Sumcol3 = 0;
//    for (var i = 0; i < rows.length - 1; i++) {
//        var cols = $(rows[i]).find('.col');

//        Sumcol1 += parseFloat($(cols[0]).find('input').val()) || 0;

//        Sumcol2 += parseInt($(cols[1]).find('input').val()) || 0;

//        Sumcol3 += parseFloat($(cols[2]).find('input').val()) || 0;

//    }
//    $('#sum' + containerId.slice(-1) + '1').val(`sum = ${Sumcol1.toFixed(2)}`);
//    $('#sum' + containerId.slice(-1) + '2').val(`sum = ${Sumcol2}`);
//    $('#sum' + containerId.slice(-1) + '3').val(`sum = ${Sumcol3.toFixed(2)}`);

//    var totalSum = Sumcol1 + Sumcol2 + Sumcol3;
//    $('#sum' + containerId.slice(-1) + '4').val(`Total = ${totalSum.toFixed(2)}`);
//    SumAllColumns();

//}

//function validateIntgerNumber(input) {
//    var value = $(input).val().trim();
//    var pattern = /^-?\d+$/;
//    if (!pattern.test(value)) {
//        alert("Invalid integer number.")
//        $(input).val("0");
//    }
//}

//function validateDecimalNumber(input) {

//    var value = $(input).val().trim();
//    var pattern = /^-?\d*\.?\d*$/;
//        if (!pattern.test(value)) {
//         alert("Invalide Integer Or Decimal");
//        $(input).val("0.0");
//    }

//}

//function SumRow(containerId) {
//    var container = $('#' + containerId);
//    var rows = container.find('.row');
//    for (var i = 0; i < rows.length - 1; i++) {
//        var cols = $(rows[i]).find('.col');

//        var sum = 0;
//        for (var j = 0; j < cols.length - 1; j++) {
//            sum += parseFloat($(cols[j]).find('.form-control').val()) || 0;

//        }
//        $(cols[cols.length - 1]).find('.form-control').val(`sum = ${sum.toFixed(2)}`);

//    }
//    SumAllColumns();
//}

//function SumAllColumns() {
//    var totalSum1 = 0, totalSum2 = 0, totalSum3 = 0, totalTotalSum = 0;

//    for (var containerIndex = 1; containerIndex <= 3; containerIndex++) {
//        totalSum1 += parseFloat($('#sum' + containerIndex + '1').val().replace('sum = ', '')) || 0;
//        totalSum2 += parseInt($('#sum' + containerIndex + '2').val().replace('sum = ', '')) || 0;
//        totalSum3 += parseFloat($('#sum' + containerIndex + '3').val().replace('sum = ', '')) || 0;
//    }

//    totalTotalSum = totalSum1 + totalSum2 + totalSum3;

//    $('#totalSum1').val(`sum = ${totalSum1.toFixed(2)}`);
//    $('#totalSum2').val(`sum = ${totalSum2}`);
//    $('#totalSum3').val(`sum = ${totalSum3.toFixed(2)}`);
//    $('#totalSum4').val(`Total = ${totalTotalSum.toFixed(2)}`);
//}


