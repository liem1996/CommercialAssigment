var image = document.getElementById("result");
var i=0;


 jasonArray = [
    {
       
        opentime: 2000,
        image:"https://o.quizlet.com/DkJ6OEEA6nkfdZsb7CEOiw.jpg"
       
    },
    {
        
        opentime: 3000,
        image:"https://static.wixstatic.com/media/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg/v1/fill/w_250,h_363,al_c,q_90/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg"
    },            
    {
        
        opentime: 6000,
        image:"https://o.quizlet.com/DkJ6OEEA6nkfdZsb7CEOiw.jpg"
    }          
     
];
function func(){
    i++;  
    image.src=jasonArray[i % jasonArray.length].image;

}
  setInterval(func, jasonArray[i % jasonArray.length].opentime);



  i=0;

