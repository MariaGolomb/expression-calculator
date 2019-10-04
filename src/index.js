function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
        let operations={
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
    }
   
    let numbers=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
   
    let stack=[];
    let culkArr=[];
    let exprArr=[];
    let openBr=0;
    let closeBr=0;
    let num=[];
   
    for(let i=0; i<expr.length; i++){
   
        let elem=expr[i];
        if(numbers.includes(elem)){
            num.push(elem);
        } else {
   
           if(num.length!==0){
               exprArr.push(num.join(''));
               num=[];
           }
   
           if(elem!==' '){ 
               if(elem==='('){
                   openBr++;
               }else if (elem===')'){
                   closeBr++;
               }
               exprArr.push(elem);
            }
        }  
    }
    
    if(num.length!==0){
       exprArr.push(num.join(''));
       num=[];
    }
   
   
    if(openBr!==closeBr){
       throw Error("ExpressionError: Brackets must be paired")
    }
    
   
    
    exprArr.forEach(elem=>{
        
           if(elem in operations){
               if(stack.length===0){
                   stack.push(elem);
               } else {
                   if(operations[elem]<=operations[stack[stack.length-1]] ){
                       while(operations[elem]<=operations[stack[stack.length-1]]){
                           culkArr.push(stack.pop());
                       }
                       stack.push(elem);
                   } else {
                       stack.push(elem);
                   }
               } 
   
   
           } else {
               if(elem==='('){
                   stack.push(elem);
               } else if(elem===')'){
                   // obrabotka skobok
                   while(stack[stack.length-1]!=="("){
                       culkArr.push(stack.pop());
                   }
                   stack.pop();
   
               } else {
                   culkArr.push(elem);
               }
           }
   
       
   
    })
   
        while(stack.length!==0){
           culkArr.push(stack.pop());
        }
   
   
    //calculations
    
    while(culkArr.length>0){
        let elem=culkArr.shift();
        if(elem in operations){
            switch(elem){
                case '+': 
                   {
                   let b=parseFloat(stack.pop(), 10);
                   let a=parseFloat(stack.pop(), 10);
                   stack.push(a+b);
                   break;
                   }
                case '-':
                   {
                   let b=parseFloat(stack.pop(), 10);
                   let a=parseFloat(stack.pop(), 10);
                   stack.push(a-b);
                   break;
                   }
                case '*':
                   {
                   let b=parseFloat(stack.pop(), 10);
                   let a=parseFloat(stack.pop(), 10);
                   stack.push(a*b);
                   break;}
                case '/':
                   {
                   let b=parseFloat(stack.pop(), 10);
                   if(b===0){
                       throw Error('TypeError: Division by zero.');
                   }
                   let a=parseFloat(stack.pop(), 10);
                   stack.push(a/b); 
                   break;
                   }
            }
   
        } else {
        stack.push(elem);
        }
    }
   
   return stack[0];
}

module.exports = {
    expressionCalculator
}
