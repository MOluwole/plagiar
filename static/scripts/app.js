
/*
  Developed by Megafuse Technologies
  Megafuse Beans Guyz
 */

(function() {
  window.App = function() {
    return {
      login: function(e) {
        var email, pass;
        email = document.getElementById('email');
        return pass = document.getElementById('pass');
      },
      max_character: function(elem, max_length) {
        // Max character
        var datalist, data;
        datalist = document.getElementsByTagName('span');

        $(elem).keyup(function() {
          if ( $(this).val().length >= max_length) {
            $(this).val($(this).val().substr(0, max_length));
            //console.log($(this).val().length);
            console.log("stop...." + $(this).val().length);
          } else {
            console.log("stop....");
          }
          for( var _x = 0; _x < datalist.length; _x++ ) {
            data = datalist[_x];
            attr = data.getAttribute('data-list');
            //alert(data);
            if ( attr === elem ) {
              _el = document.querySelector(elem).value;
              data.innerHTML = _el.length;
            }
          }
        });
      },
      add_topic: function() {

        $('.d').click(function(e) {
          e.preventDefault();
          var ID, conf;
          conf = window.confirm("Are you sure you want to delete ?")
          if(conf==true) {
              ID = $(this).attr('data-id');
              $.get('/remove-topic/'+ID, function(callback) {
                if(callback == 'deleted') {
                  $('.row'+ID).fadeOut('slow')
                } else {
                  Materialize.toast("Error Occured while delete record !", 4000)
                }
              });
          } else {

          }
        })

        $('#topic').keyup(function() {
          var data, url;
          data = $(this);
          if (data.val() === '') {
            data.focus();
            return false;
          } else {
            $('.preview').html("<img src='/static/images/loading-32-v1.gif' border='0'>")

            $.getJSON('/topic-search/'+data.val(), function(callback) {
              if ( callback.length > 0 ) {

                var table;
                table = "<table class=\"striped\">";
                table += "<tr><th>Topic </th><th>Platform </th><th>Supervisor</th><th>Matric No.</th><th>Session</th><th>Level</th></tr>";
                $.each(callback, function(key, value) {
                  table += "<tr><td>"+ value.topic +"</td><td>"+ value.category + "</td><td>"+ value.supervisor +"</td><td>"+ value.matric+"</td><td>"+ value.session+"</td><td>"+ value.level+ "</td></tr>";
                });
                table +="</table>";
                //console.log(value.topic + " " + key + " and ")
                $('.preview').fadeIn('slow').html("<h4 class='green-text'>Record Found: "+ callback.length +" </h4>" +table);
                $('#after-preview').fadeOut('slow')
              } else {
                $('#after-preview').fadeIn('slow').css('display', 'block')
                $('.preview').html('')
              }

            });
          }
        });
      },
      add_new: function() {

        $('.topic_search').keyup(function(e) {
          //console.log($(this).val());
           var data, format;
           data = $(this);
           if ( data.val() === '' ) {
             $('.topic-search-ii').slideUp('slow');
           } else {
               $('.topic-search-ii').slideDown('slow').html("<img src='/static/images/loading-32-v1.gif' border='0' width='20' height='20'>")
               format = "";
               $.getJSON('/topic-search/'+data.val(), function(callback) {

                  if ( callback.length > 0) {
                    $('.topic-search-ii').html('');
                    $.each(callback, function(key, value ) {
                        _id = value.id;
                        format += "<div style='padding:5px;border-bottom: 1px solid #ccc' class='in-cls'><a href='#' class='red-text' id='"+_id+"'><i class='fa fa-files-o'></i> " + value.topic + "</a></div>";
                      //  var link = $('<div id="'+value.id+'" class="inner-x"><a style="color: red;cursor:pointer" >'+value.topic+'</a></div>');
                      //  $('.topic-search-ii').append(link);
                      //  link.click( function() {
                      //     var _class;
                      //     _class = $('.inner-x').attr('data-xid');
                      //     alert(_class);
                      //  })
                    });
                    $('.topic-search-ii').html(format);
                  } else {
                    $('.topic-search-ii').slideUp('slow');
                  }
               });
          }
        });

        $(document).on('click', '.in-cls a', function() {
           var ID;
           ID = $(this).attr('id');
           $.getJSON('/search-topic-id/'+ID, function(callback) {
              $.each(callback, function(key, data) {
                $('.topic-search-ii').hide();
                $('.topic_search').val(data.topic);
                $('#supervisor').val(data.supervisor);
                $('#level option[value='+data.level+']').attr('selected', 'selected');
                $('#matric').val(data.matric);
                $('#year').val(data.session);
              });
           });
        })

        $('#add-new').click(function() {
          var more, format;
          more = $('#show-more');
          format = "<select name=\"doc_type[]\" class=\"browser-default typer\" id=\"doc\" required data-id='true'>"
          +"<option value=\"0\"> --select --</option>"
          +"<option value=\"introduction\">Introduction </option>"
          +"<option value=\"methodology\">Methodology</option>"
          +"<option value=\"conclusion\">Conclusion</option>"
          +"</select>";
          format += "<br><br><textarea class=\"materialize-textarea doc\" name=\"document[]\" data-id='true' id=\"txt\" placeholder=\"Paste Project Write Up\" required></textarea>";
          more.append(format);
        });

        $('#projectSubmit').on('click', function(e){
          e.preventDefault();
          var elem, topic, supervisor, year,
              matric, level, _attr, store = [];
          /**
            Assignment Segment ...
          **/
          topic = document.getElementById('topic');
          supervisor = document.getElementById('supervisor');
          year = document.getElementById('year');
          level = document.getElementById('level');
          matric = document.getElementById('matric');
          elem = document.getElementsByClassName('typer');
          doc_elem = document.getElementsByClassName('doc');


          if( topic.value == '' ) {
            Materialize.toast("Project Topic is required !", 4000);
            topic.focus();
            return false;
          } else if ( supervisor.value == '') {
            Materialize.toast("Project Supervisor name is required !", 4000);
            supervisor.focus();
            return false;
          } else if ( year.value == '' ) {
            Materialize.toast("Project Year is required !", 4000);
            year.focus();
            return false;
          } else if( level.value == '0') {
            Materialize.toast("Student Level is required !", 4000)
            level.focus();
            return false;
          } else if ( matric.value == '' ) {
            Materialize.toast("Student Matric No. is required ", 4000)
            matric.focus();
            return false;
          } else if ( elem[0].value == '0' ) {
            Materialize.toast("Project Write up section is required !", 4000)
            elem[0].focus();
            return false;
          }  else if ( doc_elem[0].value == '' ) {
            Materialize.toast("Project Write up content is required !", 4000)
            doc_elem[0].focus();
            return false;
          } else {

              for(var _key = 0; _key < elem.length; _key++ ) {
                var storage;
                storage = {
                  'topic' : topic.value,
                  'supervisor' : supervisor.value,
                  'year' : supervisor.value,
                  'level': level.value,
                  'matric' : matric.value,
                  'doc_type' : elem[_key].value,
                  'doc' : doc_elem[_key].value
                };
                /*
                  Ajax Request...
                 */
                $.post('/ajax', storage, function(callback) {
                  //alert(callback);
                  if ( callback === 'ok') {
                    Materialize.toast("<i class='fa fa-check'></i> Project Write Added Successfully", 2000)
                    setTimeout(function(){
                        window.location = '/add-new';
                    }, 3000);

                  } else if ( callback === 'exist' ){

                      Materialize.toast("Student Write Up Already Added for Section ", 4000)

                  } else {
                      Materialize.toast("Error Occured ", 4000)
                  }
                });
              }
            }
        });

        $('.del').on('click', function(e) {
          e.preventDefault();
          var conf, ID, url;
          conf = window.confirm("Are you sure you want to delete ?");
          if (conf == true) {
            $(this).html('<img src="/static/images/ajax-loader-light.gif" border="0"/>')
            ID = $(this).attr('data-id');
            url = '/edit_url/' + ID
            $.get(url, function(callback) {
               if(callback == "deleted") {
                 Materialize.toast("Record Deleted Successfully !", 2000);
                 setTimeout(function() {
                    window.location.reload();
                 }, 2000);
               } else {
                 Materialize.toast("Error Occured While processing ...", 4000)
               }
            });
          } else {

          }
          //alert($(this).attr('data-id'))
        });

        $('.open').click(function(e) {
          var ID;
          ID = $(this).attr('data-id');
          window.open('http://localhost:5000/view-data/' + ID, 'Documents', width='400');
        });
      },
      export_doc: function() {
        alert('Hello, world !')
      }
    };
  };

}).call(this);
