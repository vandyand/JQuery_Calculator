$(function(){
  //---------------------------------------------------------------------------
  // Setup display area and buttons
  //---------------------------------------------------------------------------

  // Display bar setup
  $('button:eq(0)').attr('id','display');
  $('button:eq(0)').attr('class','col-12 display-bar no-padding btn btn-outline-secondary text-right');
  $('button:eq(0)')[0].innerHTML = '&ensp;';

  // Symbol map: &#215; is ×, &#247; is ÷, &#177; is ±
  var map = ['C','%','^','&#247;','7','8','9','&#215;','4','5','6','-','1','2','3','+','&#177;','0','.','='];
  var counter = 0;

  // Input buttons setup
  $('button:gt(0)').each(function(){
    $(this).attr('id',map[counter]);
    //$(this).attr('style','height:12.5%;width:25%;padding:0 !important;margin:0 !important;');
    $(this).attr('class','col-3 no-padding input-btn btn btn-outline-secondary');
    $(this)[0].innerHTML = map[counter];
    counter += 1;
  })

  //---------------------------------------------------------------------------
  // Business Logic
  //---------------------------------------------------------------------------
  var first_val = '';
  var second_val = '';
  var current_val = '';
  var ret_val = 0;
  var operation = '';
  var replace_prev_value = true;
  var count = 0;
  var new_op = false;
  var before_equals = true;

  $('button').on('click', function(e){

    // Number button logic
    if($.inArray(e.target.id,['.','0','1','2','3','4','5','6','7','8','9']) != -1){
      if(replace_prev_value){
        $('#display')[0].textContent = '';
        replace_prev_value = false;
      }
      if(new_op){$('#display')[0].textContent = ''; new_op = false;}
      $('#display').append(e.target.textContent);
      count = 0;
    }

    // Equals button logic
    if(e.target.id==='='){
      before_equals = false;
    }

    // Operation logic
    if(e.target.id==='='||($.inArray(e.target.id,['+','-','&#215;','&#247;','^']) != -1 && first_val!=='' && before_equals===true)){
      replace_prev_value = true;
      new_op = true;
      current_val = $('#display')[0].textContent;
      if(count===0){
        second_val = current_val;
      }
      else{first_val = current_val;}
      count += 1;
      // Assign functionality based on selected operation
      if(operation==='+'){ret_val = parseFloat(first_val) + parseFloat(second_val);}
      else if(operation==='-'){ret_val = parseFloat(first_val) - parseFloat(second_val);}
      else if(operation==='&#247;'){ret_val = parseFloat(first_val) / parseFloat(second_val);}
      else if(operation==='&#215;'){ret_val = parseFloat(first_val) * parseFloat(second_val);}
      else if(operation==='^'){ret_val = parseFloat(first_val) ** parseFloat(second_val);}
      else{ret_val = current_val;}
      $('#display')[0].textContent = ret_val;
    }

    // Exclusive operation button logic
    if($.inArray(e.target.id,['+','-','&#215;','&#247;','^']) != -1){
      operation = e.target.id;
      replace_prev_value = true;
      first_val = $('#display')[0].textContent;
      before_equals = true;
    }

    // Clear button logic
    if(e.target.id==='C'){
      first_val = '';
      second_val = '';
      current_val = '';
      operation = '';
      ret_val = 0;
      $('#display')[0].innerHTML = '&ensp;';
    }
    // Plus/Minus (±) button logic
    if(e.target.id==='&#177;'){
      $('#display')[0].textContent = parseFloat($('#display')[0].textContent) * -1;
    }
    // Percent button logic
    if(e.target.id==='%'){
      $('#display')[0].textContent = parseFloat($('#display')[0].textContent) / 100;
    }
  })
})
