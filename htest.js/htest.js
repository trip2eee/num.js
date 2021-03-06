/**
 * @file  htest.js
 * @brief Simple Unit Test framework.
 * @author Jongmin Park (trip2eee@gmail.com)
 */

/**
 * htest class
 */
class htest{
    // private fields.
    #__test_cases
    #__num_failed
    #__list_failed
    #__is_success
    
    constructor(){
        this.#__test_cases = [];
        this.#__num_failed = 0;
        this.#__list_failed = [];
        this.#__is_success = false;
    }

    SetUp(){

    }

    TearDown(){

    }
    
    test(){
        this.#__test_cases = [];
        let keys = Reflect.ownKeys(Reflect.getPrototypeOf(this));

        for(let key of keys){            

            if('constructor' != key && 'SetUp' != key && 'TearDown' != key){
                // The name of method shall start with 'test_'.
                if('test_' == key.substr(0, 5)){
                    this.#__test_cases.push(key);
                }                
            }
        }

        const strHeader = '\x1b[32m[============]\x1b[0m';
        const strRun    = '\x1b[32m[ RUN        ]\x1b[0m';
        const strOK     = '\x1b[32m[         OK ]\x1b[0m';
        const strFAIL   = '\x1b[31m[       FAIL ]\x1b[0m';
        const strPASSED = '\x1b[32m[   PASSED   ]\x1b[0m';
        const strFAILED = '\x1b[31m[   FAILED   ]\x1b[0m';

        if(this.#__test_cases.length > 1){
            console.log(strHeader + ' Running ' + this.#__test_cases.length + ' tests');
        }else{
            console.log(strHeader + ' Running ' + this.#__test_cases.length + ' test');
        }
        
        const t_start = performance.now();

        for(let i = 0; i < this.#__test_cases.length; i++){
            console.log(strRun + ' ' + this.#__test_cases[i]);
            this.#__is_success = true;
            const t_start_test = performance.now();

            // prepare for test.
            this.SetUp();
            
            // run test.
            try{
                this[this.#__test_cases[i]]();
            }catch(error) {
                // If exeption was thrown.
                this.#__is_success = false;  // Set success flag to be failed.
                console.error(error);
            }

            // release resources.
            this.TearDown();
            
            const t_end_test = performance.now();
            const t_test = (t_end_test - t_start_test);
            const strTime = ' (' + t_test.toFixed(0) + ')';

            // if the test case is failed.
            if(false == this.#__is_success){
                this.#__num_failed++;
                this.#__list_failed.push(this.#__test_cases[i]);
                console.log(strFAIL + ' ' + this.#__test_cases[i] + strTime);
            }
            else{
                console.log(strOK + ' ' + this.#__test_cases[i] + strTime);
            }
        }
        
        const t_end = performance.now();
        const t_total = t_end - t_start;
        const strTotalTime = ' (' + t_total.toFixed(0) + ' ms total)';
        if(this.#__test_cases.length > 1){
            console.log(strHeader + ' ' + this.#__test_cases.length + ' tests ran' + strTotalTime);
        }else{
            console.log(strHeader + ' ' + this.#__test_cases.length + ' test ran' + strTotalTime);
        }

        if((this.#__test_cases.length - this.#__num_failed) > 1){
            console.log(strPASSED + ' ' + (this.#__test_cases.length - this.#__num_failed) + ' tests');
        }else{
            console.log(strPASSED + ' ' + (this.#__test_cases.length - this.#__num_failed) + ' test');
        }

        if(this.#__num_failed > 0){
            if(this.#__num_failed > 1){
                console.log(strFAILED + ' ' + this.#__num_failed + ' tests listed below');
            }else{
                console.log(strFAILED + ' ' + this.#__num_failed + ' test listed below');
            }

            for(let i = 0; i < this.#__list_failed.length; i++){
                console.log(strFAILED + ' ' + this.#__list_failed[i]);
            }
        }


    }
    
    // private assertions.
    #__expectFail(){
        this.#__is_success = false;
    }

    #__assertFail(){
        this.#__is_success = false;
        throw 'Assertion Failed';
    }
    
    expectEqual(x, y){
        if(x != y){
            console.log(x + ' != ' + y)
            this.#__expectFail();
        }
    }

    assertEqual(x, y){
        if(x != y){
            console.log(x + ' != ' + y)
            this.#__assertFail();
        }
    }

    expectNear(x, y, eps){
        if(Math.abs(x - y) > eps){
            console.log('abs( ' + x + ' - ' + y + ' ) > ' + eps);
            this.#__expectFail();
        }
    }

    assertNear(x, y){
        if(Math.abs(x - y) > eps){
            console.log('abs( ' + x + ' - ' + y + ' ) > ' + eps);
            this.#__assertFail();
        }
    }

    expectNotEqual(x, y){
        if(x == y){
            this.#__expectFail();
        }
    }

    assertNotEqual(x, y){
        if(x == y){
            this.#__assertFail();
        }
    }

    expectTrue(x){
        if(false == x){
            this.#__expectFail();
        }
    }

    assertTrue(x){
        if(false == x){
            this.#__assertFail();
        }
    }

    expectFalse(x){
        if(true == x){
            this.#__expectFail();
        }
    }

    assertFalse(x){
        if(true == x){
            this.#__assertFail();
        }
    }
};

module.exports = { htest };

