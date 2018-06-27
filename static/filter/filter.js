/**
 * 给商品价格加补0
 * @param {*} value 
 */
const addZero=function(value){
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}

//判断愉悦值大于1000,用1K表示
const addKToPleasureValue = (value) => {
	
    if(value < 1000){
        return value;
    }
    else if(value>=1000&&value<1000000){
    	var Kval = (value/1000).toString() ;
    	Kval = Kval.slice(0,4);
        return Kval+'K';
    }else if(value>=1000000&&value<1000000000){
    	var Mval = (value/1000000).toString() ;
    	Mval = Mval.slice(0,4);
        return Mval+'M'
    }else{
    	var Bval = (value/1000000000).toString() ;
    	Bval = Bval.slice(0,4);
        return Bval+'B'
    }
}
export default {
    addZero,
    addKToPleasureValue
}
