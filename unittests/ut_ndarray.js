/**
 * @file ut_ndarray.js
 * @brief Multidimensional array unit test.
 * @Author Jongmin Park
 */

var nj = require('../num.js/num');
var ut = require('../htest.js/htest');

class ut_numjs extends ut.htest
{
    SetUp(){
        
    }
    TearDown(){

    }

    test_array(){
        let a = nj.array([[1, 2, 3],
                          [4, 5, 6]]);
        nj.assertArrayEqual(a, [[1, 2, 3], [4, 5, 6]]);
    }

    test_zeros(){
        let a = nj.zeros([3, 2]);
        nj.assertArrayEqual(a.shape, [3, 2]);
        nj.assertArrayEqual(a, [[0, 0], [0, 0], [0, 0]]);
    }

    test_ones(){
        let a = nj.ones([2, 2, 2]);
        nj.assertArrayEqual(a.shape, [2, 2, 2]);
        nj.assertArrayEqual(a, [[[1, 1], [1, 1]], [[1, 1], [1, 1]]]);
    }

    test_flatten(){
        const a1 = [[[1], [2]], [[3], [4]]];
        let b1 = nj.array(a1);
        let c1 = b1.flatten();

        const a2 = [[1, 2], [3, 4]];
        let b2 = nj.array(a2);
        let c2 = b2.flatten();

        nj.assertArrayEqual(c1, [1, 2, 3, 4])
        nj.assertArrayEqual(c2, [1, 2, 3, 4])
    }

    test_reshape(){
        const a = [[[1], [2]], [[3], [4]], [[5], [6]]];
        const b = nj.array(a);
        let c = b.reshape([2, 3]);

        nj.assertArrayEqual(c, [[1, 2, 3], [4, 5, 6]]);
    }

    test_add(){
        let a = nj.array([[1, 2], [3, 4]]);
        let b = nj.array([[1, 1], [2, 2]]);        
        let c = nj.add(a, b);
        nj.assertArrayEqual(c, [[2, 3], [5, 6]]);
    }

    test_sub(){
        let a = nj.array([[1, 2], [3, 4]]);
        let b = nj.array([[1, 1], [2, 2]]);        
        let c = nj.sub(a, b);
        nj.assertArrayEqual(c, [[0, 1], [1, 2]]);
    }

    test_mul(){
        let a = nj.array([[1, 2], [3, 4]]);
        let b = nj.array([[1, 1], [2, 2]]);        
        let c = nj.mul(a, b);
        nj.assertArrayEqual(c, [[1, 2], [6, 8]]);
    }

    test_div(){
        let a = nj.array([[1, 2], [3, 4]]);
        let b = nj.array([[1, 1], [2, 2]]);        
        let c = nj.div(a, b);
        nj.assertArrayEqual(c, [[1, 2], [1.5, 2]]);
    }

    test_matmul(){
        let a = nj.array([[1, 2, 3], [4, 5, 6]]);
        let b = nj.array([[1, 2], [3, 4], [5, 6]]);        
        let c = nj.matmul(a, b);
        nj.assertArrayEqual(c, [[22, 28], [49, 64]]);
    }

    test_eye(){
        let a = nj.eye(2);
        nj.assertArrayEqual(a, [[1, 0], [0, 1]]);

        let b = nj.eye(2, 3);
        nj.assertArrayEqual(b, [[1, 0, 0], [0, 1, 0]]);
    }

    test_transpose(){
        let a1 = nj.array([[[1], [2], [3]], [[4], [5], [6]]]);
        let b1 = a1.T;      // equivalent to a1.transpose();
        nj.assertArrayEqual(b1, [[[1, 4], [2, 5], [3, 6]]]);

        let a2 = nj.array([[[1], [2], [3]], [[4], [5], [6]]]);
        let b2 = a2.transpose([0, 2, 1]);
        nj.assertArrayEqual(b2, [[[1, 2, 3]], [[4, 5, 6]]]);

        let a3 = nj.array([[[1, 2], [3, 4], [5, 6]], 
                           [[7, 8], [9, 10], [11, 12]]]);
                           
        let b3 = a3.transpose([1, 2, 0]);
        nj.assertArrayEqual(b3, [[[1,  7], [2,  8]],
                                 [[3,  9], [4, 10]], 
                                 [[5, 11], [6, 12]]]);

        let b4 = a3.transpose([0, 2, 1]);
        nj.assertArrayEqual(b4, [[[1,  3,  5],
                                  [2,  4,  6]],
                                 [[7,  9, 11],
                                  [8, 10, 12]]]);
    }

    test_toString(){
        let a = nj.zeros([2, 2, 1]);

        const str = a.toString();
        const target = 'ndarray(\n[[[0.000000],\n[0.000000]],\n[[0.000000],\n[0.000000]]]\n)';
        this.expectEqual(str, target);
    }

    test_linalg_inv(){
        let a = nj.array([[1, 2], [3, 4]]);
        let b = nj.linalg.inv(a);
        let c = nj.matmul(a, b);

        nj.assertArrayNear(c, [[1, 0], [0, 1]], 1e-6);
        console.log('' + c);
    }

    test_linalg_solve(){
        // 2nd order polynomial fitting test.
        const c0 = 1.0;
        const c1 = 0.01;
        const c2 = 0.001;
        const N = 3;
        let a = nj.zeros([N, 3]);
        let b = nj.zeros([N, 1]);

        for(let i = 0; i < N; i++){
            const x = i*10;
            a[i][0] = 1.0;
            a[i][1] = x;
            a[i][2] = Math.pow(x,2);
            
            b[i][0] = c0 + (c1*x) + (c2*Math.pow(x,2));
        }

        const x = nj.linalg.solve(a, b);

        nj.assertArrayNear(x, [[c0], [c1], [c2]], 1e-6);
    }

    test_linalg_solve2(){
        // 2nd order polynomial fitting test.
        const c0 = 1.0;
        const c1 = 0.01;
        const c2 = 0.001;
        const N = 10;

        let a = nj.zeros([N, 3]);
        let b = nj.zeros([N, 1]);

        for(let i = 0; i < N; i++){
            const x = i*10;
            a[i][0] = 1.0;
            a[i][1] = x;
            a[i][2] = Math.pow(x,2);
            
            b[i][0] = c0 + (c1*x) + (c2*Math.pow(x,2));
        }

        const x = nj.linalg.solve(nj.matmul(a.T, a), nj.matmul(a.T, b));

        nj.assertArrayNear(x, [[c0], [c1], [c2]], 1e-6);
    }
};

let test = new ut_numjs();
test.test();
