const express = require('express');
const router = express.Router({mergeParams: true});
const fs = require('fs');
const path = require('path');
const MongoWrapper = require('../../lib/MongoWrapper');
const { execSync, spawn } = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

/* Some constants to save us some CPU cycles. Whenever database gets updated, the info.csv file
 * will need to be updated and these values will need to be updated too */
const MAX_INFO_FILE = 1173;
const NUM_LINES_PER_FILE = 50000;

const DATA_FOLDER = 'generated_data';
const SIBSEARCH_EXECUTABLE = 'lib/sibsearch/sibsearch.py';

const getRandomV3J = function() {
    let file_num = Math.floor(Math.random()*MAX_INFO_FILE);
    let line_num = Math.floor(Math.random()*NUM_LINES_PER_FILE);

    let v3jsplit = execSync('sed \'' + String(line_num) + 'q;d\' lib/clonotypeinfo/info_' + String(file_num) + '.csv')
        .toString().split(',');

    return {
        v: v3jsplit[0],
        j: v3jsplit[1],
        cdr3: v3jsplit[2],
    }
};

//
// const runSibsearch = (v, j, cdr3, dir) => {
//     // const execString = 'python3 ' + SIBSEARCH_EXECUTABLE;
//     //
//     // // console.log("running Sibsearch:", execString, parameters.concat([filename]));
//
//     return spawn('python3', [SIBSEARCH_EXECUTABLE, '-v', v, '-j', j, '--cdr3', cdr3, '--dir', dir]);
// };

let createCSVOutput = (rows) => {
    let retval = '';
    let keys = Object.keys(rows[0]);

    retval += keys.join(',') + '\n';
    for(let row of rows) {
        for(let key of keys) {
            if(key !== keys[0]) retval += ',';
            retval += row[key];
        }
        retval += '\n';
    }

    return retval;
};

router.post('/', function(req, res) {
    let body;
    if(typeof(req.body) === 'object') {
        body = req.body;
    } else {
        body = JSON.parse(req.body);
    }

    MongoWrapper.getV3JMatches(body.v, body.j, body.cdr3, (err, results) => {
        if(err) {
            console.error("Error getting V3J Matches:", err);
            res.send(500);
        } else {
            res.json({
                v: body.v,
                j: body.j,
                cdr3: body.cdr3,
                results: results
            });
        }
    });
});

router.post('/sibling', function(req, res) {
    let body = JSON.parse(req.body);

    let name = String(new Date().getTime());
    let dir = path.join(DATA_FOLDER,name);
    fs.mkdir(dir, (err) => {
        if(err) {
            console.error("Couldn't create:", dir);
            res.send(500);
        }
        let args = [SIBSEARCH_EXECUTABLE, '-v', body.v, '-j', body.j, '--cdr3', body.cdr3, '--dir', dir];
        spawn('python3', [SIBSEARCH_EXECUTABLE, '-v', body.v, '-j', body.j, '--cdr3', body.cdr3, '--dir', dir]).on('exit', (code) => {
            if(code === 0) {
                let results = require(path.join(process.cwd(), dir, 'filtered.json'));
                res.json({
                    v: body.v,
                    j: body.j,
                    cdr3: body.cdr3,
                    results: results
                });
            } else {
                res.send(500);
            }
        });
    });
});

router.post('/random', function(req, res) {
    let v3j = getRandomV3J();

    MongoWrapper.getV3JMatches(v3j.v, v3j.j, v3j.cdr3, (err, results) => {
        if(err) {
            console.error("Error getting Random V3J Match:", err);
            res.send(500);
        } else {
            res.json({
                v: v3j.v,
                j: v3j.j,
                cdr3: v3j.cdr3,
                results: results
            });
        }
    });
});

router.post('/csv', function(req, res) {
    let body = JSON.parse(req.body);

    let filename = new Date().getTime() + ".csv";
    let filepath = path.join(DATA_FOLDER,filename);
    let content = createCSVOutput(body.rows);

    fs.writeFile(filepath, content, 'utf8', (err) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        res.json({filename: filename});
    })
});

router.get('/csv/:filename', function(req, res) {
    let filename = path.join(DATA_FOLDER, req.params.filename);

    if(fs.existsSync(filename)) {
        res.download(filename, function(err) {
            if(err) {
                console.log("Error downloading CSV:", err);
            }
        });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
