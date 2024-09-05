function AddRow(button) {
    var $parent = $(button).closest('.container-fluid');

    var $template = $('#row-template').get(0).content.cloneNode(true);
    $parent.prepend($template);
    bindEventsToItems();

}

function bindEventsToItems() {
    var $itemsDecimal = $('.cellInput.decimalValue');
    var $itemsInt = $('.cellInput.intValue');
    $itemsDecimal.each(function () {
       $(this).bind('input', Sum);
        $(this).bind('blur', RemoveErrorInvaild);
        $(this).bind('keydown', IsInputDecimal);
    });
    $itemsInt.each(function () {
        $(this).bind('input', Sum);
        $(this).bind('blur', RemoveErrorInvaild);
        $(this).bind('keydown', IsInputInt);
    });
}
function RemoveErrorInvaild(event) {
    $(event.target).css('border', '');
     $(event.target).parent().find('.color').hide();
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

        $(event.target).css('border', '');
        $(event.target).parent().find('.color').hide();
        return true;
    }
    event.preventDefault();
    $(event.target).css('border', '2px solid red');
    $(event.target).parent().find('.color').show();
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

        $(event.target).css('border', '');
        $(event.target).parent().find('.color').hide();
        return true;
    }

    event.preventDefault();

    $(event.target).css('border', '2px solid red');
    $(event.target).parent().find('.color').show();
    return false;


}


function Sum(event) {
    var $row = $(event.target).closest('.row');
    var $cols = $row.find('.cellInput');

    var sum = $cols.toArray().reduce((total, col) => {
        var value = parseFloat($(col).val()) || 0;
        return total + value;
    }, 0);
    $row.find('.cellSum').val(`sum = ${sum}`);

    var $container = $(event.target).closest('.container-fluid');
    var $rows = $container.find('.row');
    var $currentCol = $(event.target).closest('.col.p-3');
    var index = $currentCol.parent().children('.col.p-3').index($currentCol);

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

    var $cols = $container.find(result);
    var sumCol = $cols.toArray().slice(0, -1).reduce((total, element) => {
        var value = parseFloat($(element).find('.cellInput').val()) || 0;
        return total + value;
    }, 0);
    $cols.last().val(`sum = ${sumCol}`);

    var total = $container.find('.tablesum').find('input[type=text]').toArray().slice(0, -1).reduce((total, col) => {
        var value = parseFloat(col.value.replace('sum =', ''));
        return total + value;
    }, 0);
    $container.find('.four').val(`Total = ${total}`);
}
