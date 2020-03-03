$(document).ready(function(){

//регулярные выражения для проверки введённых данных
var rv_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

//Код анимации появления элементов формы
$('.form_group').each(function(index, value){
   $(this).delay(index * 200).animate({opacity: 1}, 200);
})

//Скрипт поворота стрелочки в выпадающих списках
$("select").click(function(e){
  $(this).focus();
  $(this).parent().toggleClass('rotate');
});

$("select").blur(function(){
  $(this).parent().removeClass('rotate');
});


//проверка формы и получение сообщений из файлов JSON
$("#reg_form").submit(function(e){
    e.preventDefault();
    console.log("submit click");
    if(check_form())
    {
      console.log("check_form() returns true");
      $.getJSON('server-ok.json', function(json){
        console.log("getting JSON OK message...");
        console.log(json);   
        $(this).trigger("reset");
        reg_succes();
      });
     }
    else
    {
      console.log("check_form() returns false")
      $('#complete').effect('shake',{ direction: "both", times: 3, distance: 2}, 200);
      $.getJSON('server-error.json', function(json){
        console.log("getting JSON ERROR message...");
        console.log(json);
      });
      return;
    }
})

//при нажатии на кнопку, которая не имеет прямого отнощения к форме генерируем событие отправки формы
$("#complete").click(function(e){ $("#reg_form").submit();});


//функция проверяющая все поля формы перед отправкой
function check_form(){
  console.clear();
  //console.log(JSON.stringify($("#reg_form").serialize()));
  if($("#fname").val() != '')
    {
      console.log("fname OK");
      if($("#lname").val() != '')
      {
        console.log("lname OK");
        if($("#nat").val() !='')
        {
            console.log("nat OK");
            if($("#email").val() != '' && rv_email.test($("#email").val()))
            {
              console.log("email OK");
              if($("#day select").val() != '' && $("#month select").val() != '' && $("#year select").val() != '')
              {
                  console.log("date OK");
                  if($("input[name=gender]:checked").val()){
                    console.log("gender OK, " + $("input[name=gender]:checked").val());
                    if($("#password").val() !='' && rv_password.test($("#password").val()) &&  $("#password").val() == $("#cpassword").val())
                    {
                        console.log("password OK");
                        return true;
                    }else console.log("password FAIL");
                  }else console.log("gender FAIL");
              }else console.log("date FAIL");
            }else console.log("email FAIL");
          }else console.log("nat FAIL");
      }else console.log("lname FAIL");
    }else console.log("fname FAIL");
  return false;
}

//Функция показывающая сообщение об успещной решистрации
function reg_succes(){
  console.log("function reg_success");
  $(".success_container").show().animate({opacity: 1}, 1500);
  $("svg").fadeOut(1500);
  $(".form_container").fadeOut(1500).hide();
}

//start of blur event
//Проверка поля после потери фокуса
$('#email, #password, #cpassword').blur(function(e){
  var id = $(this).attr('id');
  var val = $(this).val();
  //console.log('blur id:' + id + "; val:" + val);
  switch(id)
  {
    case 'password': // one number, one capital letter, one lowercase letter, not less than 8 symbols
                      if(val.length >= 8 && val != '')
                      {
                        if(rv_password.test(val)){
                          console.log(val + " " + rv_password.test(val));
                          $('#error_msg').hide();
                          $(this).removeClass("error");
                          $(this).parent().find(".input_status").removeClass("hidden");
                        } else {
                          $('#error_msg').show().html('The password must contain at least one number, one uppercase, one lowercase letter and be at least 8 characters long');
                        }
                      }else{
                       $(this).addClass("error");
                       $(this).parent().find(".input_status").addClass("hidden");
                       $('#error_msg').show().html('The password must contain at least one number, one uppercase, one lowercase letter and be at least 8 characters long');
                      }
                      if(val != '' && val == $('#cpassword').val()){
                        $('#cpassword').removeClass("error");
                        $('#cpassword').parent().find(".input_status").removeClass("hidden");
                      }
                      break;
    case 'cpassword':
                        if(val != '' && val == $('#password').val())
                        {
                          if(rv_password.test(val)){
                             $('#error_msg').hide();
                             $(this).removeClass("error");
                             $(this).parent().find(".input_status").removeClass("hidden");
                          } else{
                            $('#error_msg').show().html('The password must contain at least one number, one uppercase, one lowercase letter and be at least 8 characters long');
                          }
                        }
                        else
                        {
                           $(this).addClass("error");
                           $(this).parent().find(".input_status").addClass("hidden");
                           $('#error_msg').show().html('Both passwords must match each other');
                        }break;
    case 'email':
        if(val != '' && rv_email.test(val))
        {
            $(this).removeClass("error");
            $(this).parent().find(".input_status").removeClass("hidden");
        }
        else{
          $(this).addClass("error");
          $(this).parent().find(".input_status").addClass("hidden");
        } break;
  }
}); //end of blur
}); //end of document ready
