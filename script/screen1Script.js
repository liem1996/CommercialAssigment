var image = document.getElementById("result");
var i=0;


 jasonArray = [
    {
       
        opentime: 2000,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9BiZB7lUGFNWWdKsMAIBPULWCA-O6yNEIw&usqp=CAU"
       
    },
    {
        
        opentime: 3000,
        image:"https://cashcow-cdn.azureedge.net/images/a26817b8-bab0-4579-9fbe-9a8e27a12ce8_500.jpg"
    },            
    {
        
        opentime: 6000,
        image:"https://images1.ynet.co.il/PicServer5/2018/12/13/8942861/wide-article-980.jpg"
    },           
     
];
function func(){
    i++;  
    
    image.src=jasonArray[i % jasonArray.length].image;

}
  setInterval(func, jasonArray[i % jasonArray.length].opentime);

  i=0;

