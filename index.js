$(document).ready(function(){
    // check current php session on start
    $.ajax({
        url: "getsession.php",
        success: function(data){
            var session = JSON.parse(data);

            if(session.hasOwnProperty("logged_in") && session.logged_in == true){
                if(session.hasOwnProperty("user")){
                    login(session.user);
                    return;
                }
            }

            loadLoginPage(session);
        }
    });
    
    // load login page
    function loadLoginPage(session){
        $.ajax({
            url: "login.html",
            success: function(page){

                $("body").html(page);
                // login page
                $("#loginForm").submit(function(e) {
                    $.ajax({
                        type: "POST",
                        url: "login.php",
                        data: { username: $('#username').val(), 
                            pass: $('#pass').val(),
                        },
                        success: function(data){
                            console.log(data);
                            login(data);
                        }
                    });
                    e.preventDefault(); // avoid to execute the actual submit of the form.
                });
                $(".reg").click(function(){
                    register(session);
                });
                $("#about").click(function(){
                    about(session);
                });
                $("#instruction").click(function(){
                    instruction(session);
                });
                $("#logo").click(function(){
                    logo(session);
                });
            }
        });
    }
    
    function register(session){
        $.ajax({
            url: "register.html",
            success: function(page){
                $("body").html(page);
                $('.goback').click(function() {
                    loadLoginPage(session);
                });
                $("#registrationForm").submit(function(e){
                    $.ajax({
                        type: "POST",
                        url: "register.php",
                        data: { firstname: $('#firstname').val(),
                            lastname: $('#lastname').val(),
                            username: $('#username').val(), 
                            pass: $('#pass').val(),
                            cpass: $('#cpass').val(),
                        },
                        success: function(data){
                            console.log(data);
                            // respond to errors
                            if(data == "password_mismatch"){
                                $("#error").html("Passwords must match.");
                            } else if (data == "name_taken"){
                                alert("Sorry, this username is already taken.");
                            } else if (data == "failed"){
                                $("#error").html("Something went wrong, but we're not sure what.");
                            } else if (data == "success"){
                                loadLoginPage(session);
                                alert("User Account Added!");
                                
                            }
                        }
                    });
                    e.preventDefault();
                });
                $("#about").click(function(){
                    about(session);
                });
                $("#instruction").click(function(){
                    instruction(session);
                });
                $("#logo").click(function(){
                    logo(session);
                });
            }
        });
    }

    function login(result,session){
        var temp = null;
        
        try{
            temp = JSON.parse(result);
            
        }catch(e){
            temp = result;
        }
        // check result for success
         console.log(result);
         
         console.log(result.type);
        if(temp.result == "not_found"){
            $("#message").html("User does not exist");
        } else if (temp.result == "password_mismatch"){
            $("#message").html("Incorrect username or password");
        } else if (temp.result == "success"){
            //determine the user type
            if(temp.type == "admin"){
                $.ajax({
                    url: "admin.html",
                    success: function(page){
                       loadAdminPage(result, page, session);
                    }
                });
            } else if (temp.type == "user"){
                loadUser(result, session);
            }
        
        }
    }
    function loadAdminPage(admin, page, session){
        var temp = null;
         try{
             temp = JSON.parse(admin);
        }catch(e){
            temp = admin;
        }
        admin = temp;
        
        $("body").html(page);
        $("#name").html(admin.fname + " " + admin.lname);

        // logout
        $("#logout").click(function(){
            logOut(session);
        });
        getmessage(admin, page, session);
    }
    
    function loadUser(user, session){
        $.ajax({
            url: "user.html",
            success: function(page){
                loadUserPage(user, page, session);
            }
        });
    }
    
    function loadUserPage(user,page, session){
        var temp = null;
        try{
            temp = JSON.parse(user);
        }catch(e){
            temp = user;
        }
        user = temp;
        $("body").html(page);
        $("#name").html(user.fname + " " + user.lname);

        // logout
        $("#logout").click(function(){
            logOut(session);
        });
        $("#addmovie").click(function(){
            searchmovie(user, session);
        });
         $("#hot").click(function(){
            popularmoviepage(user, session);
        });
        showmovie(user, session);
        recommendmovie(user, session);
    }
    
    function popularmoviepage(user, session){
        $.ajax({
            url: "popular.html",
            success: function(page){
                $("#displayblock").html(page);
                popularmovie(user);
                $("#return").click(function() {
                    loadUser(user, session);
                });
            }
        });
    }
    
    
    function popularmovie(user, session){
        $.ajax({
            url: "popular.php",
            success: function(data){
                console.log("Popular movie connect");
                if (data){
                    $("#hotblock").html(data);
                }else{
                    $("#hotblock").html("nothing returned");
                }
                 $(".hotmovie").each(function() {
                    $(this).click(function() {
                        var movieid= $(this).attr("id");
                         $.ajax({
                            url: "reviews.html",
                            success: function(page){
                                $("#displayblock").html(page);
                                movieallreview(user, movieid, session);
                                getmovieinfo(movieid);
                            }
                         });
                    });
                        
                });
            }
        });
    }
    
    
    function searchmovie(user, session){
        $.ajax({
            url: "searchmovie.html",
            success: function(page){
                $("body").html(page);
                $("#returntouser").click(function() {
                    loadUser(user, session);
                });
                $("#searchmovie").submit(function(e){
                    $.ajax({
                        type: "GET",
                        url: "https://www.omdbapi.com/?s="+$('#moviename').val()+"&apikey=506f97",
                        success: function(data){
                            console.log(data);
                            let movies = data.Search;
                            let output = '';
                            $.each(movies, (index, movie) => {
                            output += `
                              <div class="col-md-3">
                                <div id="mov" class="well text-center">
                                  <img src="${movie.Poster}" height="268" width="182">
                                  <h5>${movie.Title}</h5>
                                  <button type="button" class="ratemovie ${movie.Title}" id="${movie.imdbID}">Rate</button> 
                                </div>
                              </div>
                            `;
                          });
                          $('#movies').html(output);
                          $(".ratemovie").each(function(){
                            $(this).click(function(){
                                var movieid = $(this).attr("id");
                                var classname= $(this).attr("class").split(" ")[0];
                                var moviename = $(this).attr("class").slice(classname.length+1);
                                    addmovie(user, moviename, movieid, session);
                            });
                        });
                        }
                    });
                    e.preventDefault();
                });
            }
        });
    }
    
    function getmovieinfo(movieid){
        $.ajax({
            type: "GET",
            url: "https://www.omdbapi.com/?i="+movieid+"&apikey=506f97",
            success: function(data){
                console.log(data);
                let movie = data;
                let output =`
                <div class="row">
                  <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                  </div>
                  <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                      <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                      <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                      <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                      <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                      <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                      <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                      <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Watch trailer</a>
                  </div>
                </div>
              `;
        
              $('#movie').html(output);
            }
        });
    }
    
    function addmovie(user, movienamed, movieidd, session){
        $.ajax({
            url: "addmovie.html",
            success: function(page){
                $("body").html(page);
                $("#moviename").html(movienamed);
                console.log(movieidd);
                $("#returntouser").click(function() {
                    loadUser(user, session)
                })
                $("#addmovierating").submit(function(e){
                    $.ajax({
                        type: "POST",
                        url: "addmovie.php",
                        data: { moviename: movienamed,
                            movieid: movieidd,
                            movierating: $('#movierating').val(),
                            review: $('#review').val(), 
                            username: user.username,
                        },
                        success: function(data){
                            console.log(data)
                            if(data == "success"){
                                loadUser(user);
                                alert("Movie Rating added!");
                            }else{
                                $("#message").html(data);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
        });

    }
    
    function showmovie(user, session){
        $.ajax({
            type: "POST",
            url: "showmovie.php",
            data: { username: user.username, 
            subject: "all" },
            success: function(data){
                console.log("get movie conected");
                console.log(data);
                $("#mlst").html(data);
                $(".movie").each(function(){
                    $(this).click(function(){
                        var movieid = $(this).attr("id");
                            moviereview(user, movieid, session);
                    });
                });
            }
        });
    }
    
    function recommendmovie(user, session){
        $.ajax({
            type: "POST",
            url: "getuserrecommendation.php",
            data: { username: user.username },
            success: function(data){
                console.log("get movierec conected");
                console.log(data);
                if (data){
                    $("#reclst").html(data);
                }else{
                    $("#reclst").html("<p>No movie recommendation is available for you at this time.</p><p> Check Popular Movies page</p>")
                }
                $(".movierec").each(function() {
                    $(this).click(function() {
                        var movieid= $(this).attr("id");
                         $.ajax({
                            url: "reviews.html",
                            success: function(page){
                                $("#displayblock").html(page);
                                movieallreview(user, movieid, session);
                                getmovieinfo(movieid);
                            }
                         });
                    });
                        
                });
            }
        });
    }
    function movieallreview(user, movieidd, session){
        $.ajax({
            type: "POST",
            url: "reviews.php",
            data: { movieid: movieidd },
            success: function(data){
                console.log("show all review conected");
                console.log(data);
                if (data){
                    $("#reviewblock").html(data);
                }else{
                    $("#reviewblock").html("nothing returned");
                }
                $("#return").click(function() {
                    loadUser(user, session);
                });
                $(".report").each(function(){
                    $(this).click(function(){
                        var movieid = $(this).attr("id");
                        var classname= $(this).attr("class").split(" ")[0];
                        var username = $(this).attr("class").slice(classname.length+1);
                        report(user, username, movieid, session);
                    });
                });
            }
        });
    }
    
    function report(user, usernamed, movieidd, session){
        $.ajax({
            url: "reason.html",
            success: function(page){
                $("body").html(page);
                $("#returntouser").click(function() {
                    loadUser(user, session)
                });
                $("#sendreport").submit(function(e){
                    $.ajax({
                        type: "POST",
                        url: "sendreport.php",
                        data: {username: usernamed,
                            movieid: movieidd,
                            reason: $('#body').val() },
                        success: function(data){
                            if(data == "success"){
                                loadUser(user);
                                alert("Message sent!");
                            }else {
                                alert("Message not sent.");
                            }
                        }   
                    })
                });
            }
        });
    }
    
    function getmessage(admin, page, session){
        $.ajax({
            type: "POST",
            url: "getmessage.php",
            data: { subject: "all" },
            success: function(data){
                console.log("get messages conected");
                console.log(data);
                $("#msglst").html(data);
                $(".messages").each(function(){
                $(this).click(function(){
                    var mid = $(this).attr("id");
                        showMessage(mid, admin, page, session);
                        markAsRead(mid);
                    });
                });
            }
        });
    }
    
    
    function showMessage(mid, admin, page, session){
        $.ajax({
            type: "POST",
            url: "getmessage.php",
            data: {subject: mid },
            success: function(data){
                console.log("show messages conected");
                console.log(data);
                $("#msglst").html(data);
                $("#return").click(function(){
                    loadAdminPage(admin, page, session);
                });
                $(".view").click(function(){ 
                    var movieid = $(this).attr("id");
                    var classname= $(this).attr("class").split(" ")[0];
                    var username = $(this).attr("class").slice(classname.length+1);
                    adminmoviereview(username, admin, movieid, page, session);
                    
                });
                $(".delete").click(function(){ 
                    var messageid = $(this).attr("id");
                    deletemessage(admin, page, session, messageid);
                    
                });
            }
        });
    }
    
    function deletemessage(admin, page, session, message_id){
         $.ajax({
            type: "POST",
            url: "deletemessage.php",
            data: { messageid: message_id, },
            success: function(data){//look at the code here, might not be neccessary
                console.log("show report messages delete conected");
                alert("Message Deleted!");
                loadAdminPage(admin, page, session);
            }
        });
    }
    
    function adminmoviereview(user, admin, movieid, page, session){
        $.ajax({
            type: "POST",
            url: "adminmoviereview.php",
            data: { username: user, 
            subject: movieid },
            success: function(data){
                if(data){
                    console.log("show messages conected");
                    console.log(data);
                    $("#msglst").html(data);
                    $("#return").click(function(){
                        loadAdminPage(admin, page, session);
                    });
                    $(".delete").click(function(){
                        var user_reviewid = $(this).attr("id");
                        deletereview(user_reviewid, admin, movieid, page, session);
                    });
                }else{
                    loadAdminPage(admin, page, session);
                    alert("Review Already Deleted!");
                }
                
            }
        });
    }
    
    function deletereview(user_reviewid, admin, movieid, page, session){
        $.ajax({
            type: "POST",
            url: "deletereview.php",
            data: { reviewid: user_reviewid, },
            success: function(data){//look at the code here, might not be neccessary
                console.log("show messages delete conected");
                alert("Review Deleted!");
                loadAdminPage(admin, page, session);
            }
        });
    }
    
    function markAsRead(msg){
        $.ajax({
            type: "GET",
            url: "markasread.php",
            data: { 
                    movieid: msg,
            },
            success: function(data){
                // nothing to do
            }
        });
    }
    
    function moviereview(user, movieid, session){
        $.ajax({
            type: "POST",
            url: "showmovie.php",
            data: { username: user.username, 
            subject: movieid },
            success: function(data){
                console.log("show messages conected");
                console.log(data);
                $("#mlst").html(data);
                $("#return").click(function(){
                    loadUser(user, session);
                });
            }
        });
    }
    
    function logOut(session){
        if(confirm("Are you sure you want to log out?")){
            $.ajax({
                url: "logout.php",
                success: function(data){
                    loadLoginPage(session);
                }
            });
        }
    }
    
    
    function about(session){
        $.ajax({
            url: "about.html",
            success: function(data){
                $("body").html(data);
                $("#return").click(function() {
                    if(session.hasOwnProperty("user")){
                        login(session.user);
                    }else{
                        loadLoginPage(session);
                    }
                });
                $(".reg").click(function(){
                    register(session);
                });
                $("#about").click(function(){
                    about(session);
                });
                $("#instruction").click(function(){
                    instruction(session);
                });
                $("#logo").click(function(){
                    logo(session);
                });
            }
        });
    }
    
    
    function instruction(session){
         $.ajax({
            url: "instruction.html",
            success: function(data){
                $("body").html(data);
                $("#return").click(function() {
                    if(session.hasOwnProperty("user")){
                        login(session.user);
                    }else{
                        loadLoginPage(session);
                    }
                });
                $(".reg").click(function(){
                    register(session);
                });
                $("#about").click(function(){
                    about(session);
                });
                $("#instruction").click(function(){
                    instruction(session);
                });
                $("#logo").click(function(){
                    logo(session);
                });
            }
        });
    }
    
     function logo(session){
        if(session.hasOwnProperty("user")){
            login(session.user);
        }else{
            loadLoginPage(session);
        }
    }
    
    
});//on page load ends here