$(function(){
//-------------------------------------------------------------------------
  //Set up the keys and display area
  $('div').addClass('row').append('<div></div><div></div><div></div>')
  $('div div:eq(0)').addClass('col-2');
  $('div div:eq(1)').addClass('col-8');
  $('div div:eq(2)').addClass('col-2');
  $('div div:eq(1)').append('<div></div><div></div><div></div><div></div><div></div>');

  $('div div div').each(function(){
    $(this).addClass('row no-gutters');
    $(this).append('<div></div><div></div><div></div><div></div>');
  })

  // This is for testing
  // $('div:last').after('<span id="first"></span><br><span id="second"></span>');

  var counter = 0;
  var map = ['C','','^','*','7','8','9','/','4','5','6','-','1','2','3','+','0','.','','='];
  $('div div div div').each(function(){
    $(this).addClass('btn btn-outline-secondary col-3');
    $(this)[0].textContent = map[counter];
    counter += 1;
  });
  //display area!
  $('div div div:first').before('<p class="border border-secondary rounded text-right" style="height: 2em;margin:0.1em;"></p>');
//-------------------------------------------------------------------------

  // Business Logic!
  var first_val = '';
  var second_val = '';
  var current_val = '';
  var ret_val = 0;
  var operation = '';
  var replace_prev_value = false;
  var count = 0;
  var new_op = false;

  $('div div div div').on('click', function(e){
    if($.inArray(e.target.textContent,['.','0','1','2','3','4','5','6','7','8','9']) != -1){
      if(replace_prev_value){
        $('p')[0].textContent = '';
        replace_prev_value = false;
      }
      if(new_op){$('p')[0].textContent = ''; new_op = false;}
      $('p').append(e.target.textContent);
      count = 0;
    }
    if($.inArray(e.target.textContent,['+','-','*','/','^']) != -1){
      operation = e.target.textContent;
      replace_prev_value = true;
      first_val = $('p')[0].textContent;
      // $('#first')[0].textContent = first_val;
    }
    if(e.target.textContent==='='){
      replace_prev_value = true;
      new_op = true;
      current_val = $('p')[0].textContent;
      if(count===0){
        second_val = current_val;
        // $('#second')[0].textContent = second_val;
      }
      else{first_val = current_val;}
      // $('#first')[0].textContent = first_val;
      count += 1;
      if(operation==='+'){ret_val = parseFloat(first_val) + parseFloat(second_val);}
      else if(operation==='-'){ret_val = parseFloat(first_val) - parseFloat(second_val);}
      else if(operation==='/'){ret_val = parseFloat(first_val) / parseFloat(second_val);}
      else if(operation==='*'){ret_val = parseFloat(first_val) * parseFloat(second_val);}
      else if(operation==='^'){ret_val = parseFloat(first_val) ** parseFloat(second_val);}
      else{ret_val = current_val;}
      $('p')[0].textContent = ret_val;
    }
    if(e.target.textContent==='C'){
      first_val = '';
      second_val = '';
      current_val = '';
      ret_val = 0;
      // $('#first')[0].textContent = first_val;
      // $('#second')[0].textContent = second_val;
      $('p')[0].textContent = '';
    }
  })
//--------------------------------------------------------------------------
})
