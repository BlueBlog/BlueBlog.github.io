$(function(){
   var APLLICATION_ID = "4CDE6C65-E91A-50B6-FF70-96D1A0C06100", 
       SECRET_KEY = "64B4C002-4AC2-AD92-FF9A-893CA484E800",
       VERSION = "v1";
       
       Backendless.initApp(APLLICATION_ID ,SECRET_KEY,VERSION);
       
       var postsCollection = Backendless.Persistence.of(Posts).find();
        
    console.log(postsCollection);
        
    var wrapper = {
        posts: postsCollection.data
    };
    
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("ddd, MMM Do YYYY");
    }); 
    Handlebars.registerHelper('poststoday',function () {
        var today = (new Date).getTime() - (86400000);
        var query = {condition: "created >= " + today};
        var Today1 = Backendless.Data.of( Posts ).find( query );
        console.log(Today1);
        console.log(today);
        return Today1.data.length;
    });
    
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML =  blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
        
    var blogScriptB = $("#poststoday-template").html();
    var blogTemplateB = Handlebars.compile(blogScriptB);
    var blogHTMLB =  blogTemplateB(wrapper);
    
    $('.badge').html(blogHTMLB);
    
    var blogScriptC = $("#Titles-template").html();
    var blogTemplateC = Handlebars.compile(blogScriptC);
    var blogHTMLC =  blogTemplateC(wrapper);

   $('#post-titles').html(blogHTMLC);

});
function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}