$(function(){
//-------------------------------------------------------------------------
  //Set up the keys and display area
  $('div div div').each(function(){
    $(this).addClass('row no-gutters');
  })

  var counter = 0;
  var map = ['C','%','^','&#215;','7','8','9','&#247;','4','5','6','-','1','2','3','+','&#177;','0','.','='];
  //&#215; is times, &#247; is divide, 	&#177; is plus_minus
  var map = ['C','%','^','&#215;','7','8','9','&#247;','4','5','6','-','1','2','3','+','&#177;','0','.','='];
  $('div div div div').each(function(){
    $(this).addClass('btn btn-outline-secondary col-3');
    $(this).attr('id',map[counter]);
    $(this)[0].innerHTML = map[counter];
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
    //If button pressed is a number or decimal...
    if($.inArray(e.target.textContent,['.','0','1','2','3','4','5','6','7','8','9']) != -1){
      if(replace_prev_value){
        $('p')[0].textContent = '';
        replace_prev_value = false;
      }
      if(new_op){$('p')[0].textContent = ''; new_op = false;}
      $('p').append(e.target.textContent);
      count = 0;
    }
    //If button pressed is an operator...
    if($.inArray(e.target.id,['+','-','&#215;','&#247;','^']) != -1){
      operation = e.target.id;
      replace_prev_value = true;
      first_val = $('p')[0].textContent;
      // $('#first')[0].textContent = first_val;
    }
    //If equals button pressed...
    if(e.target.textContent==='='){
      replace_prev_value = true;
      new_op = true;
      current_val = $('p')[0].textContent;
      if(count===0){
        second_val = current_val;
      }
      else{first_val = current_val;}
      count += 1;
      //Assign operations based on operation selected...
      if(operation==='+'){ret_val = parseFloat(first_val) + parseFloat(second_val);}
      else if(operation==='-'){ret_val = parseFloat(first_val) - parseFloat(second_val);}
      else if(operation==='&#247;'){ret_val = parseFloat(first_val) / parseFloat(second_val);}
      else if(operation==='&#215;'){ret_val = parseFloat(first_val) * parseFloat(second_val);}
      else if(operation==='^'){ret_val = parseFloat(first_val) ** parseFloat(second_val);}
      else{ret_val = current_val;}
      $('p')[0].textContent = ret_val;
    }
    //If Clear button pressed...
    if(e.target.textContent==='C'){
      first_val = '';
      second_val = '';
      current_val = '';
      ret_val = 0;
      $('p')[0].textContent = '';
    }
    //If ± button pressed...
    if(e.target.id==='&#177;'){
      $('p')[0].textContent = parseFloat($('p')[0].textContent) * -1;
    }
    //If % button pressed...
    if(e.target.id==='%'){
      $('p')[0].textContent = parseFloat($('p')[0].textContent) / 100;
    }
  })
//--------------------------------------------------------------------------
  $('#id1').on('click',function(e){
    $('#id2')[0].textContent = e.target.textContent;
  })


})
