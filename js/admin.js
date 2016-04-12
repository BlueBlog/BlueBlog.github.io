$(function(){
    
   var APLLICATION_ID = "4CDE6C65-E91A-50B6-FF70-96D1A0C06100", 
       SECRET_KEY = "64B4C002-4AC2-AD92-FF9A-893CA484E800",
       VERSION = "v1";
       
       Backendless.initApp(APLLICATION_ID ,SECRET_KEY,VERSION);
         
    //if(Backendless.UserService.isValidLogin()){
        //userLoggedIn(Backendless.LocalCache.get("current-user-id"))
    //} else{
    var loginScript = $("#login-template").html();
    var loginTemplate = Handlebars.compile(loginScript);

    $('.main-container').html(loginTemplate);
    //}
    $(document).on('submit', '.form-signin', function(event){
       event.preventDefault(); 
        
        var data = $(this).serializeArray(),
        email = data[0].value,
        password = data[1].value;
        
        Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn,gotError1));
    });
    $(document).on('submit', '.form-signup', function(event){
        
        var user = new backendless.user();
        email = data[0].value,
        password = data[1].value;
        
        user.email = email;
        user.paassword = password;
        
        Backendless.UserService.register(user);
    });

$(document).on('click', '.add-blog',function(){
    
    var addBlogScript = $("#add-blog-template").html();
    var addBlogTemplate = Handlebars.compile(addBlogScript);

    $('.main-container').html(addBlogTemplate);
     tinymce.init({ selector:'textarea',    selector: "textarea",
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image" });
    
});   
$(document).on('submit','.form-add-blog',function(event){
           event.preventDefault();
           var data = $(this).serializeArray(),
                title = data[0].value,
                content = data[1].value;
                
                if (content === "")
                {     Materialize.toast('ERROR MESSAGE IS EMPTY', 2000);
                }
                else if (title === "")
                {     Materialize.toast('ERROR TITLE IS EMPTY', 2000);
                }
                else{
                Materialize.toast('POSTED', 2000);
                var dataStore = Backendless.Persistence.of(Posts);
                console.log(Backendless.UserService.getCurrentUser());
                var postObject  = new Posts ({
                    title : title,
                    content : content,
                    authorEmail : Backendless.UserService.getCurrentUser().email
                });
    dataStore.save(postObject);
    
    this.title.value = "";
    this.content.value = "";
    
}});
$(document).on('click','.logout',function(){
   Backendless.UserService.logout(new Backendless.Async(userLoggedout,gotError)); 
 var loginScript = $("#login-template").html();
    var loginTemplate = Handlebars.compile(loginScript);

    $('.main-container').html(loginTemplate);
});
});

function userLoggedout(){
    console.log("logged out");
}
function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    content.name = args.title;
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user){
    console.log("logged in");
    var userData;
    if(typeof user === "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
    } else{
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}
function gotError(){
     Materialize.toast('ERROR', 2000);
     }
     function gotError1(){
     Materialize.toast('ERROR EMAIL OR PASSWORD IS WRONG', 2000);
     }
     
    var wrapper = {
        posts: postsCollection.data
    };
    Handlebars.registerHelper('poststoday',function () {
        var ALPHA = 0;
        var today = (new Date).getTime() - (86400000);
        var query = {condition: "created >= " + today};
        var Today1 = Backendless.Data.of( Posts ).find( query );
        console.log(Today1);
        console.log(today);
        return Today1.data.length;
    });
        var blogScriptB = $("#poststoday-template").html();
    var blogTemplateB = Handlebars.compile(blogScriptB);
    var blogHTMLB =  blogTemplateB(wrapper);
    
    $('.badge').html(blogHTMLB);
    
    