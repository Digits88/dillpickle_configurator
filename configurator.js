//This script takes a URL parameter "product_id" and maps it to a list of configurable products. Then will replace the fallback product image with svg xml. Changing the select options will change the colored regions of the svg accordingly. The colored regions to change have been tagged with the made-up "part" attribute.
//This is customized for Dill Pickle Gear, which uses OpenCart, but should be customizable to other shopping cart applications.
//Authored by Catherine Stein, http://www.catherine-stein.com

jQuery(document).ready(function () {

    //Get parameters from URL, including product ID. Thanks for this snippet go to JQueryByExample.
    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            } // end if
        }; // end for
    }; //end GetURLParameter

    var item = GetURLParameter('product_id');

    //Array is in form configurableItems[product_id] = 'SVG base name'
    var configurableItems = new Array();
    configurableItems[50] = 'Mudflaps';
    configurableItems[60] = 'Large_Saddlebag';
    configurableItems[79] = 'Medium_Saddlebag';
    configurableItems[61] = 'Small_Saddlebag';
    configurableItems[62] = 'Handlebar_Bag';
    configurableItems[80] = 'Tool_Canister';

    if (configurableItems[item]) { //that is, if the product ID exists in the configurableItems array
        $('#dp_main_image a').remove(); //remove fallback product image - image id is custom to template
        $('#dp_main_image').load('/store/configurator/images/' + configurableItems[item] + '.svg svg'); //replace with svg code
        $('#dp_main_image').css('border', 'none');
        $('div .description').css('overflow', 'auto');
        $('div .right').css('margin-left', '0px');
        $('div .left').css('margin-bottom', '1em').css('width','520px');
        
        //parts array contains option id numbers and assigns them to part names
        var parts = new Array();
        parts['color'] = new Array();
        parts['toggle'] = new Array();
        parts['color']['contrast'] = [228, 235, 237, 256, 265, 274];
        parts['color']['main'] = [227, 233, 236, 239, 255, 264, 273];
        parts['color']['lining'] = [238, 247, 257, 275, 276];

        //checkboxes
        parts['toggle']['flap'] = [239];
        parts['toggle']['mesh_lid'] = [243, 248, 269, 369];
        parts['toggle']['side_mesh'] = [249, 261];
        parts['toggle']['wallet'] = [242, 250, 270, 370];
        parts['toggle']['window'] = [246, 251, 260];
        parts['toggle']['interior_center'] = [244, 252, 258, 271, 371];
        parts['toggle']['interior_side'] = [245, 253, 259, 272, 372];
        parts['toggle']['camera'] = [254];
        parts['toggle']['cell_pocket'] = [262];

        //select menus
        parts['toggle']['side_pockets'] = [240, 266];
        parts['toggle']['side_pockets']['side_mesh'] = [65, 473];
        parts['toggle']['side_pockets']['side_cordura'] = [64, 365];
        parts['toggle']['rear_pockets'] = [241, 268];
        parts['toggle']['rear_pockets']['rear_zippered'] = [67, 368];
        parts['toggle']['rear_pockets']['rear_double'] = [66];
        parts['toggle']['cuesheet_attach'] = [263];
        parts['toggle']['cuesheet_attach']['straps'] = [121];
        parts['toggle']['cuesheet_attach']['cuesheet'] = [120];

        //colors array maps color hex ids to option choices - undefined = black
        var colors = new Array();
        colors['#787878'] = [18, 21, 42, 50, 54, 59, 109, 158, 345, 364, 399, 425]; //gray
        colors['#0C133C'] = [19, 23, 43, 51, 55, 58, 110, 159, 349, 373, 400, 426]; //navy
        colors['#F80000'] = [20, 24, 44, 52, 56, 60, 111, 160, 356, 375, 401, 427]; //red
        colors['#B49E65'] = [103, 143, 182, 210, 243, 278, 304, 330, 360, 376, 402, 428]; //tan

        colors['#C80000'] = [61, 73, 148, 451, 463] // red lining
        colors['#BFBABF'] = [62, 74, 149, 450, 462]; //silver lining

        colors['#FFFFFF'] = [106, 146, 185, 188, 213, 223, 246, 255, 281, 307, 333, 362, 396, 422, 448, 460, 470]; //white (cordura or lining)

        colors['#000001'] = [187, 215, 248, 456, 461, 472]; //black lining
        colors['#1D874A'] = [150, 216, 249, 455, 464]; //green lining
        colors['#FC0DB5'] = [151, 217, 250, 457, 465]; //magenta lining
        colors['#964157'] = [152, 218, 251, 458, 466]; //maroon lining
        colors['#FF6B1C'] = [153, 219, 252, 453, 467]; //orange lining
        colors['#3C007B'] = [154, 220, 253, 459, 468]; //purple lining
        colors['#002E89'] = [155, 221, 254, 452, 469]; //royal lining
        colors['#FFFB26'] = [156, 222, 256, 454, 471]; //yellow lining

        colors['#FF9FFF'] = [83, 113, 123, 162, 190, 258, 284, 310, 339, 377, 403, 429]; //blush pink
        colors['#73381E'] = [84, 124, 163, 191, 224, 259, 285, 311, 340, 378, 404, 430]; //brown
        colors['#BAE09B'] = [85, 125, 164, 192, 225, 260, 286, 312, 341, 379, 405, 431]; //celery
        colors['#666D70'] = [86, 126, 165, 193, 226, 261, 287, 313]; //Charcoal
        colors['#3F302B'] = [87, 127, 166, 194, 227, 262, 288, 314]; //Chocolate
        colors['#3C1143'] = [88, 128, 167, 195, 228, 263, 289, 315, 342, 380, 406, 432]; //eggplant
        colors['#3D72C8'] = [89, 129, 168, 196, 229, 264, 290, 316, 343, 381, 408, 433]; //electric blue
        colors['#1A644A'] = [90, 130, 169, 197, 230, 265, 291, 317, 344, 382, 407, 434]; //emerald
        colors['#DC5E21'] = [91, 131, 170, 198, 231, 266, 292, 318, 346, 383, 409, 435]; //international orange
        colors['#ECD5A6'] = [92, 132, 171, 199, 232, 267, 293, 319, 347, 384, 410, 436]; //khaki
        colors['#003893'] = [93, 133, 172, 200, 233, 268, 294, 320]; //mariner blue
        colors['#B7FCB3'] = [94, 134, 173, 201, 234, 269, 295, 321, 348, 385, 411, 437]; //mint
        colors['#8CD600'] = [95, 135, 174, 202, 235, 270, 296, 322, 350, 386, 412, 438]; //Neon Green
        colors['#FF7000'] = [82, 112, 122, 161, 189, 257, 283, 309, 351, 387, 413, 439]; //Neon Orange
        colors['#fc2366'] = [96, 136, 175, 203, 236, 271, 297, 323, 352, 388, 414, 440]; //Neon Pink
        colors['#EAE519'] = [97, 137, 176, 204, 237, 272, 298, 324, 353, 389, 415, 441]; //Neon Yellow
        colors['#494C32'] = [98, 138, 177, 205, 238, 273, 299, 325, 354, 390, 416, 442]; //olive
        colors['#566314'] = [99, 139, 178, 206, 239, 274, 300, 326, 355, 391, 417, 443]; //ranger green
        colors['#0000FF'] = [100, 140, 179, 207, 240, 275, 301, 327, 357, 392, 418, 444]; //royal cordura
        colors['#BFBAAF'] = [101, 141, 180, 208, 241, 276, 302, 328, 358, 393, 419, 445]; //silver cordura
        colors['#FCB514'] = [102, 142, 181, 209, 242, 277, 303, 329, 359, 394, 420, 446]; //spanish yellow
        colors['#008270'] = [104, 144, 183, 211, 244, 279, 305, 331, 361, 395, 421, 447]; //teal
        colors['#E6C48E'] = [105, 145, 184, 212, 245, 280, 306, 332]; //Wheat
        colors['#7C2128'] = [107, 147, 186, 214, 247, 282, 308, 334, 363, 397, 423, 449]; //wine

        stock_colors = ['#000000','#787878','#0C133C','#F80000','#B49E65', '#C80000', '#BFBABF']; //black, gray, navy, red, tan, red lining, silver lining 
         
        //rearrange all the options
        $('div .cart').css('clear', 'both').css('padding-top', '1em');
        $('div .options').css('border-bottom', 'none');
        $('input[type="checkbox"], select').parent().css('float', 'left').css('margin-right', '2em')
          .css('margin-bottom', '1em').css('width', '20%').css('height', '4em').next('br').remove();
        $('input[type="checkbox"], select').parent().first().css('clear' ,'both');

        function colorMatch(color) {
            //loop through array to match option choice to color

            var done = new Boolean(false);
            var newFill = "#000000";
            for (x in colors) {
                for (y in colors[x]) {
                    if (color == colors[x][y]) {
                        newFill = x;
                        done = true;
                        break;
                    }
                }
                if (done == true) {
                    break;
                }
            }

            return newFill;
        }; //end colorMatch

        function partsMatch(name, value, type, color_or_toggle) {
            //loop through array to match option name to part
            var done = new Boolean(false);

            for (x in parts[color_or_toggle]) {
                for (y in parts[color_or_toggle][x]) {
                    if (name.substring(0, 10) == "option[" + parts[color_or_toggle][x][y] && (type == 'checkbox' || type == 'radio')) {
                        var part = x;
                        done = true;
                        break;
                    } else {
                        for (z in parts[color_or_toggle][x][y]) {
                            if (value == parts[color_or_toggle][x][y][z]) {
                                var part = y;
                                done = true;
                                break;

                            } else if (!value) {
                                var part = x;
                                done = true;
                                break;
                            }
                        }
                    }
                }

                if (done == true) {
                    break;
                }
            }
            return part;
        }; //end partsMatch

        function changeColor(name, color) {
            // Which part is changing?
            part = partsMatch(name, 0, 'radio', 'color');
            // What color should it change to? These colors correspond to attribute values in OpenCart.	
            newFill = colorMatch(color);
            // Change the appropriate paths in the svg code
            $.each($('path[part="' + part + '"]'), function () {
                $(this).css('fill', newFill);
            }); //end each
            $.each($('.selectedColor'), function() {if ($(this).prev('input').attr('name') == name) {$(this).removeClass('selectedColor');}});
        }; //end changeColor
        
        function toggle(name, value, onOff, type) {
            part = partsMatch(name, value, type, 'toggle');
            //checkbox toggling
            if (type == 'checkbox') {
                $.each($('g[part="' + part + '"]'), function () {
                    if (onOff == 'on') {
                        $(this).attr('visibility', 'visible')
                        .attr('display', '')
                        .css('display', '')
                        .css('visibility', '');
                    } else {
                        $(this).attr('visibility', 'hidden');
                    }

                }); //end each
            }
            //select menu switching
            else if (type == 'select') {

                $.each($('select[name="' + name + '"] option'), function () {
                    optionPart = partsMatch(name, $(this).val(), type, 'toggle');

                    if ($(this).is(':selected') == false) {
                        $('g[part="' + optionPart + '"]').attr('visibility', 'hidden');
                    } else {
                        $('g[part="' + optionPart + '"]').attr('visibility', 'visible')
                        .attr('display', '')
                        .css('display', '')
                        .css('visibility', '');
                    }
                });

            }

            //hide centered labels if mesh lid is present
            if ($('g[part="mesh_lid"]').attr('visibility') == 'visible') {
                $('#No_Lid_Pocket').attr('visibility', 'hidden');
            } else {
                $('#No_Lid_Pocket').attr('visibility', 'visible')
                	.attr('display', '')
                    .css('display', '')
                    .css('visibility', '');
            }

        }; //end toggle

        $('input[type=radio]').change(function () {
            changeColor($(this).attr('name'), $(this).val());
            $(this).next('label').addClass('selectedColor');
        }); //call the changeColor function on the color swatch radio buttons
        $('select').change(function () {
            toggle($(this).attr('name'), $(this).val(), 'on', 'select')
        }); //call the toggle function on the select menus
        $('input[type=checkbox]').click(function () {
            if ($(this).is(':checked')) {
                toggle($(this).attr('name'), $(this).val(), 'on', 'checkbox')
            } else {
                toggle($(this).attr('name'), $(this).val(), 'off', 'checkbox');
            };
        }); //call the toggle function on the checkboxes
        
        //create the swatches from the radio buttons
        $('input[type="radio"]').css('display', 'none');
        
        $.each($('input[type="radio"]').next("label"), function () {
            var name = $(this).attr('for');
            var val = name.substring(13);
            var newFill = colorMatch(val);
            var colorName = $(this).html();
            colorName = colorName.replace(/ +(?= )/g, '');
            $(this).attr('title', colorName);
            $(this).css('background-color', newFill)
                .html('&nbsp;').css('float', 'left');
            if ($.inArray(newFill, stock_colors)>-1) {
              $(this).css('height', '4em').css('width', '4em').addClass('stock_color');
              } else {
                $(this).css('height', '2em').css('width', '2em').addClass('custom_color');
                }
            $(this).next("br").remove();
            $(this).parent().css('overflow','auto').addClass('swatch_block');
        }); //end each
        
        // swatch block layout tweaks
        var stock_count = $('.swatch_block').first().children('.stock_color').length;
        var stock_width = 4 * stock_count;
        stock_width += 'em';
        $.each($('.swatch_block'), function() {$(this).css('width',stock_width);});
        $('.swatch_block').wrapAll('<div class="all_color_blocks">');
        
        //Set default color schemes as selected
        function setColors (x) {
            
            if (x == 62) {
            $.each($('#option-value-110, #option-value-158, #option-value-149'), setColorsHelper);
            
        } else if (x == 61) {
            $.each($('#option-value-54, #option-value-58, #option-value-74'), setColorsHelper);
        } else if (x == 60) {
            $.each($('#option-value-42, #option-value-51, #option-value-62'), setColorsHelper);
        } else if (x == 50) {
            $.each($('#option-value-20, #option-value-23'), setColorsHelper);
        
        } else if (x == 79) {
        	$.each($('#option-value-345, #option-value-373, #option-value-450'), setColorsHelper);
        } else if (x == 80) {
        	$.each($('#option-value-399, #option-value-426, #option-value-462'), setColorsHelper);
        	
                } //end if
                } //end setColors
                
        function setColorsHelper() {
        	changeColor($(this).attr('name'), $(this).val());
            $(this).attr('checked','checked').attr('selected','selected');
            $(this).next('label').addClass('selectedColor');
        } //end setColorsHelper
        
        setColors(item);
        
        

    } //end if configurable
}); //end ready