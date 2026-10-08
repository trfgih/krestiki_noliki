$(document).ready(function(){

    for(let i = 0; i < 9; i++) {
        $('.playzone').append('<div class="block"></div>')
    }

    let x = 1,
        y = 3;
    $('.block').each(function(index){
        if(x > 3) {
            x = 1;
            y--;
        }
        $(this).attr({
            posx: x,
            posy: y
        });
        x++;
    }); // end each

    let courseX = true,
        courseO = false;

    let count = 0;

    $('.block').click(function(){
        if($(this).hasClass('clicked_O') || $(this).hasClass('clicked_X')){return}

        count++;
        console.log(count);

        if(courseX) {
            $(this).html('<p>X</p>').addClass('clicked_X');
            courseX = false,
            courseO = true;

            let win = checkWin.bind($(this), 'X');
            win();
        }else {
            $(this).html('<p>O</p>').addClass('clicked_O');
            courseX = true,
            courseO = false

            let win = checkWin.bind($(this), 'O');
            win();
        }

    });// end click


    // Функция проверки победителя (очень длинная :D)
    // Но сначала вспомогательная функция обьявления победы/ничьи xD

    function winnerx(status){
      setTimeout(() => {
          if(status == 'draw'){
              alert(`draw`);
          }else {
              alert(`${status} win`);
          };
          $('.block').html('').removeClass('clicked_O clicked_X').css({backgroundColor: ''});
          courseX = true;
          courseO = false;
          count   = 0;
      }, 25);
      return false;
    }

    function checkWin(player){
        let $thisX = $(this).attr('posx'),
            $thisY = $(this).attr('posy');

        let winner      = winnerx.bind($(this)),
            draw_check  = true;

        let x_right        = $(`.block[posx="${+$thisX+1}"][posy="${$thisY}"]`),
            x_right_right  = $(`.block[posx="${+$thisX+1+1}"][posy="${$thisY}"]`),
            x_left         = $(`.block[posx="${+$thisX-1}"][posy="${$thisY}"]`),
            x_left_left    = $(`.block[posx="${+$thisX-1-1}"][posy="${$thisY}"]`);

            if(x_right.hasClass(`clicked_${player}`)){
                if(x_left.hasClass(`clicked_${player}`)) {
                    x_left.css({backgroundColor: 'red'});
                    x_right.css({backgroundColor: 'red'});
                    $(this).css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }else if(x_right_right.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    x_right_right.css({backgroundColor: 'red'});
                    x_right.css({backgroundColor: 'red'});
                    draw_check = draw_check = winner(player);
                }

            }else if(x_left.hasClass(`clicked_${player}`)) {

                if(x_right.hasClass(`clicked_${player}`)) {
                    x_left.css({backgroundColor: 'red'});
                    x_right.css({backgroundColor: 'red'});
                    $(this).css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }else if(x_left_left.hasClass(`clicked_${player}`)){
                    x_left.css({backgroundColor: 'red'});
                    x_left_left.css({backgroundColor: 'red'});
                    $(this).css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }

            }

            let y_up         = $(`.block[posx="${$thisX}"][posy="${+$thisY+1}"]`),
                y_up_up      = $(`.block[posx="${$thisX}"][posy="${+$thisY+1+1}"]`),
                y_down       = $(`.block[posx="${$thisX}"][posy="${+$thisY-1}"]`),
                y_down_down  = $(`.block[posx="${$thisX}"][posy="${+$thisY-1-1}"]`);


                if(y_up.hasClass(`clicked_${player}`)){
                    if(y_down.hasClass(`clicked_${player}`)) {
                        y_down.css({backgroundColor: 'red'});
                        y_up.css({backgroundColor: 'red'});
                        $(this).css({backgroundColor: 'red'});
                        draw_check = winner(player);
                    }else if(y_up_up.hasClass(`clicked_${player}`)){
                        $(this).css({backgroundColor: 'red'});
                        y_up_up.css({backgroundColor: 'red'});
                        y_up.css({backgroundColor: 'red'});
                        draw_check = winner(player);
                    }

                }else if(y_down.hasClass(`clicked_${player}`)) {

                    if(y_up.hasClass(`clicked_${player}`)) {
                        y_down.css({backgroundColor: 'red'});
                        y_up.css({backgroundColor: 'red'});
                        $(this).css({backgroundColor: 'red'});
                        draw_check = winner(player);
                    }else if(y_down_down.hasClass(`clicked_${player}`)){
                        y_down.css({backgroundColor: 'red'});
                        y_down_down.css({backgroundColor: 'red'});
                        $(this).css({backgroundColor: 'red'});
                        draw_check = winner(player);
                    }

                }

            let y_up_x_right            = $(`.block[posx="${+$thisX+1}"][posy="${+$thisY+1}"]`),
                y_down_x_right          = $(`.block[posx="${+$thisX+1}"][posy="${+$thisY-1}"]`),
                y_up_x_left             = $(`.block[posx="${+$thisX-1}"][posy="${+$thisY+1}"]`),
                y_down_x_left           = $(`.block[posx="${+$thisX-1}"][posy="${+$thisY-1}"]`),
                y_up_x_right_twice      = $(`.block[posx="${+$thisX+2}"][posy="${+$thisY+2}"]`),
                y_down_x_left_twice     = $(`.block[posx="${+$thisX-2}"][posy="${+$thisY-2}"]`),
                y_down_x_right_twice    = $(`.block[posx="${+$thisX+2}"][posy="${+$thisY-2}"]`),
                y_up_x_left_twice       = $(`.block[posx="${+$thisX-2}"][posy="${+$thisY+2}"]`)

            if(y_up_x_right.hasClass(`clicked_${player}`)) {

                if(y_up_x_right_twice.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    y_up_x_right.css({backgroundColor: 'red'});
                    y_up_x_right_twice.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }else if(y_down_x_left.hasClass('clicked_X')){
                    $(this).css({backgroundColor: 'red'});
                    y_up_x_right.css({backgroundColor: 'red'});
                    y_down_x_left.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }

            }else if(y_down_x_left.hasClass(`clicked_${player}`)){

                if(y_down_x_left_twice.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    y_down_x_left.css({backgroundColor: 'red'});
                    y_down_x_left_twice.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }else if(y_up_x_right.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    y_down_x_left.css({backgroundColor: 'red'});
                    y_up_x_right.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }

            }else if(y_down_x_right.hasClass(`clicked_${player}`)){

                if(y_down_x_right_twice.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    y_down_x_right.css({backgroundColor: 'red'});
                    y_down_x_right_twice.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }else if(y_up_x_left.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    y_down_x_right.css({backgroundColor: 'red'});
                    y_up_x_left.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }

            }else if(y_up_x_left.hasClass(`clicked_${player}`)){
                if(y_up_x_left_twice.hasClass(`clicked_${player}`)){
                    $(this).css({backgroundColor: 'red'});
                    y_up_x_left_twice.css({backgroundColor: 'red'});
                    y_up_x_left.css({backgroundColor: 'red'});
                    draw_check = winner(player);
                }
            }

            if(count == 9 && draw_check){
                winner('draw');
            }
    } // end checkWin

}); // end ready
