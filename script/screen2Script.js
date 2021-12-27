var image = document.getElementById("result");
var i=0;


 jasonArray = [
    {
       
        opentime: 2000,
        image:"https://www.makorrishon.co.il/wp-content/uploads/2018/03/1_118491090.jpg"
       
    },
    {
        
        opentime: 3000,
        image:"https://www.shotim.co.il/wp-content/uploads/nostalgic-ad-elite-instant-coffee.jpg"
    },            
    {
        
        opentime: 6000,
        image:"https://gidigov.co.il/wp-content/uploads/2016/03/bezeq-2.jpg"
    },           
     
];

function func(){
    i++;  
    
    image.src=jasonArray[i % jasonArray.length].image;

}

setInterval(func, jasonArray[i % jasonArray.length].opentime);



  i=0;
