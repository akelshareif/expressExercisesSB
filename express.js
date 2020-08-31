const express = require('express');
const e = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Root route!');
});

app.get('/mean', (req, res) => {
    const numsQueryString = req.query.nums;
    const re = /\d+/g;
    const nums = numsQueryString.match(re);

    const sum = nums.reduce((acc, val) => {
        return Number(acc) + Number(val);
    });

    const mean = sum / nums.length;

    return res.json({
        response: {
            operation: 'mean',
            data: nums,
            result: mean,
        },
    });
});

app.get('/median', (req, res) => {
    const numsQueryString = req.query.nums;
    const re = /\d+/g;
    const nums = numsQueryString.match(re);
    nums.sort();

    if (nums.length % 2 === 0) {
        const median = (Number(nums[nums.length / 2]) + Number(nums[nums.length / 2 - 1])) / 2;

        return res.json({
            response: {
                operation: 'median',
                data: nums,
                result: median,
            },
        });
    } else {
        return res.json({
            response: {
                operation: 'median',
                data: nums,
                result: nums[Math.floor(nums.length / 2)],
            },
        });
    }
});

app.get('/mode', (req, res) => {
    const numsQueryString = req.query.nums;
    const re = /\d+/g;
    const nums = numsQueryString.match(re);

    const numMap = nums.reduce((obj, val) => {
        if (obj[val]) {
            obj[val]++;
        } else {
            obj[val] = 1;
        }
        return obj;
    }, {});

    let max = null;
    let mode = null;

    for (const [key, val] of Object.entries(numMap)) {
        if (Math.max(max, val) === val) {
            max = val;
            mode = key;
        }
    }

    if (numMap[mode] === 1) {
        return res.json({
            response: {
                msg: 'No mode was found. All numbers have same number of occurences.',
                data: nums,
            },
        });
    } else {
        return res.json({
            response: {
                operation: 'mode',
                data: numMap,
                result: mode,
            },
        });
    }
});

app.listen('3000', () => {
    console.log('Express server started');
});
