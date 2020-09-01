export default class Utils{
    static nextPowerOf2( n ) {

        return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) );
    
    }

    static lerp ( value1, value2, amount ) {

        amount = Math.max( Math.min( amount, 1 ), 0 );
        return value1 + ( value2 - value1 ) * amount;
    
    }

    static isSafari() {

        return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);
    
    }

    static clamp(num, min, max){
        if(num > max){
            return max;
        }
        if(num < min){
            return min;
        }
        return num;
    }
}