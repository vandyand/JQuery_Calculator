$(function(){
//-------------------------------------------------------------------------
  //Set up the keys and display area

  var counter = 0;
  //&#215; is × symbol, &#247; is ÷ symbol, 	&#177; is ± symbol
  var map = ['','C','%','^','&#247;','7','8','9','&#215;','4','5','6','-','1','2','3','+','&#177;','0','.','='];

  $('button').each(function(){
    //$(this).attr('class','btn btn-outline-secondary btn-block');
    $(this).attr('id',map[counter]);
    $(this).attr('style','height:15%;width:100%;');
    $(this).attr('class','btn btn-outline-secondary');
    $(this)[0].innerHTML = map[counter];
    counter += 1;
  })

  $('button:first').attr('id','display');
  $('button:first').attr('style','height:15%;width:100%;');
  $('button:first').addClass('text-right');
  //$('button:first').attr('class','border')
  //Display area...
  //$('p').attr('class','border border-secondary rounded text-right flex-fill').attr('id','display').attr('style','padding:1%');
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

  $('button').on('click', function(e){
    //If button pressed is a number or decimal...
    if($.inArray(e.target.id,['.','0','1','2','3','4','5','6','7','8','9']) != -1){
      if(replace_prev_value){
        $('#display')[0].textContent = '';
        replace_prev_value = false;
      }
      if(new_op){$('#display')[0].textContent = ''; new_op = false;}
      $('#display').append(e.target.textContent);
      count = 0;
    }
    //If button pressed is an operator...
    if($.inArray(e.target.id,['+','-','&#215;','&#247;','^']) != -1){
      operation = e.target.id;
      replace_prev_value = true;
      first_val = $('#display')[0].textContent;
      // $('#first')[0].textContent = first_val;
    }
    //If equals button pressed...
    if(e.target.textContent==='='){
      replace_prev_value = true;
      new_op = true;
      current_val = $('#display')[0].textContent;
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
      $('#display')[0].textContent = ret_val;
    }
    //If Clear button pressed...
    if(e.target.textContent==='C'){
      first_val = '';
      second_val = '';
      current_val = '';
      ret_val = 0;
      $('#display')[0].textContent = '';
    }
    //If ± button pressed...
    if(e.target.id==='&#177;'){
      $('#display')[0].textContent = parseFloat($('#display')[0].textContent) * -1;
    }
    //If % button pressed...
    if(e.target.id==='%'){
      $('#display')[0].textContent = parseFloat($('#display')[0].textContent) / 100;
    }
  })
//--------------------------------------------------------------------------
})
