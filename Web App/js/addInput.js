var count = 1;
var limit = 20;
function addInput(divName){
     if (count == limit)  {
          alert("You have reached the limit of adding " + count + " inputs");
     }
     else {
          var newlabel = document.createElement("label");
          newlabel.setAttribute("class", "label");
          newlabel.innerHTML = "Address " + (count + 1);
          document.getElementById(divName).appendChild(newlabel);
          count++;
         
          var newp = document.createElement("p");
          newp.setAttribute("class", "control");
          newp.innerHTML = "<input class='input' type='text' id='input " + (count) + "'>";
          document.getElementById(divName).appendChild(newp);
     }
}
function deleteLastInput(divName){
    if (count == 1)  {
        alert("No more to delete.");
    }
    else {
        var labels = [];
        labels = document.getElementById(divName).getElementsByClassName("label");
        var label = labels[labels.length - 1];
        document.getElementById(divName).removeChild(label);
        
        var boxes = [];
        boxes = document.getElementById(divName).getElementsByClassName("control");
        var box = boxes[boxes.length - 1];
        document.getElementById(divName).removeChild(box);
        
        count--;
    }
}