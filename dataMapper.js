/**********************************************************************************
 Could not have been created without the existence of the svg file referenced. 
 File can be found at 
 http://commons.wikimedia.org/wiki/File:BlankMap-World6,_compact.svg
 
 

 **********************************************************************************/
            
            var dataMapper = function(){  //expects array of the form: [[country, num],[country,num]..etc]
                var list = (arguments[0]) ? arguments[0] : [['us', 5],['ru', 7], ['ca', 13], ['fr', 100]];
                var a = document.getElementById('map');
                var map = a.contentDocument;
                
                var showbox = function(e, co, num){ //edit page(X or Y) subtractions based on desired position... somehow make it relative to svg document
                    $("#numtag").html(" " + num);
                    $("#cotag").html(countries[co]);
                    $("#info").css({"margin-left": e.pageX - 350, "visibility": "visible", "margin-top": e.pageY - 225});
                };
                
                var changeColor = function($co, color){
                    if($co.get(0).tagName == "g"){
                        $co.children().css("fill", color);
                        if($co.children().get(0).tagName == "g"){
                            $co.children().children().css("fill", color); //"#1E90FF"
                        }
                    
                        
                    }else{
                        $co.css("fill", "red");
                    }
                };
                
                var feature = function(co, num, total){
                    var color = 200 - Math.floor(num * 255 / total);
                    color = "rgb(" + color + ",224," + color + ")";
                    
                    changeColor($(map).find("#" + co), color);
                                        
                    $(map).find("#" + co).hover(function(){
                        $(this).bind("mousemove", function(e){
                            showbox(e, co, num);
                        });
                        changeColor($(this), "#1E90FF");
                    }, function(){
                        $(this).unbind("mousemove");
                        $("#info").css("visibility", "hidden");
                        changeColor($(this), color);
                    });
                };
                
                var setupMap = function(data){
                    var total = 0;
                    var locs = Array();
                    for(var i = 0; i < data.length; i++){
                        if(data[i][0] in locs){
                            locs[data[i][0]] += data[i][1];
                        }else{
                            locs[data[i][0]] = data[i][1];
                        }
                        total += data[i][1];
                    }
                    for(var x in locs){
                        feature(x, locs[x], total);
                    }
                };
                
                
                setupMap(list);
            
            };