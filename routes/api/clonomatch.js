const express = require('express');
const router = express.Router({mergeParams: true});
const fs = require('fs');
const tmp = require('tmp');
const path = require('path');
const MongoWrapper = require(path.join(global.appRoot, 'lib', 'MongoWrapper'));
const { execSync, spawn, spawnSync } = require('child_process');
const crypto = require('crypto');
const { Parser } = require('json2csv');
const Papa = require('papaparse');
// const socketHandler = require('../../lib/socketIOHandler.js').socketHandler;
const config = require(path.join(global.appRoot, process.env.CONF));

let runSibsearch = (body, res) => {
    tmp.file({ prefix: 'clonomatch-', postfix: '.json' }, (err, fname) => {
        if (err) throw err;

        let args = [config.app.sibsearch.executable, '--cdr3', body.cdr3,
            '--out', fname, '--pid', body.pid, '--coverage', body.coverage];
        if(body.v !== '') args.push('-v', body.v);
        if(body.j !== '') args.push('-j', body.j);

        console.log('args:', args)
        let child = spawn('python3', args);
        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        child.on('error', (err) => { console.error(err); });
        child.on('exit', (code) => {
            if(code === 0) {
                console.log("Sibsearch finished:", fname);
                let results = require(fname);

                let v3j = body.v + '_' + body.j + '_' + body.cdr3;
                let outname = v3j + '_results' + crypto.randomBytes(3).toString('hex');
                if(results.length > 0) {
                    fs.writeFileSync(path.join(config.app.data_dir,outname + '.json'), JSON.stringify(results));
                    const csvParser = new Parser();
                    fs.writeFileSync(path.join(config.app.data_dir,outname + '.csv'), csvParser.parse(results));
                }

                res.json({
                    v: body.v,
                    j: body.j,
                    cdr3: body.cdr3,
                    results: results,
                    out_filename: outname
                });
            } else {
                console.log("code", code)
                res.sendStatus(500);
            }
        });
    });
}

let runSibsearchBulk = (body) => {
    return new Promise((resolve, reject) => {
        let files = [];

        for(let row of body.data) {
            if('cdr3' in row) {
                continue
            } 

            let fileObject = tmp.fileSync({prefix: 'clonomatch-', postfix: '.json', keep: true});
            let args = [config.app.sibsearch.executable, '--cdr3', row[2],
                '--out', fileObject.name, '--pid', body.pid, '--coverage', body.coverage];
            if (row[0] !== '') args.push('-v', row[0]);
            if (row[1] !== '') args.push('-j', row[1]);

            let process = spawnSync('python3', args);
            if(process.error) console.error(process.error);
            else if(process.status === 0) files.push(require(fileObject.name));
            else console.log("error running sibsearch on:", args, "with code:", process.status);

            console.log("Done with:", fileObject.name, row[0], row[1], row[2])

            fileObject.removeCallback();
        }

        resolve(files);
    });
}

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
    let body = JSON.parse(req.body);

    runSibsearch(body, res);
});

router.post('/bulk', function(req, res) {
    let body = JSON.parse(req.body);
    console.log("bulk body",body);

    if(body.data != null) {
        runSibsearchBulk(body).then((resolve) => {

        }, (reject) => {
            console.log("RunSibsearchBulk failed:",reject);
        })

        res.sendStatus(200)
    } else {

    }
});

router.post('/random', function(req, res) {
    let body = JSON.parse(req.body);

    MongoWrapper.getRandomSequence((err, results) => {
        if(err) {
            console.error("Error getting Random V3J Match:", err);
            res.sendStatus(500);
        } else {
            let result = results[0];
            let v = '';
            let j = '';
            let cdr3_aa = '';
            if(result.cdr3_aa == null || result.cdr3_aa === '') {
                console.error("Error getting a Random V3J Match: No CDR3 in result");
            } else {
                cdr3_aa = result.cdr3_aa;
            }
            if(result.v_call != null) { v = result.v_call.split('*')[0] }
            if(result.j_call != null) { j = result.j_call.split('*')[0] }

            runSibsearch({
                v: v,
                j: j,
                cdr3: cdr3_aa,
                pid: body.pid,
                coverage: body.coverage
            }, res);
        }
    });
});

router.get('/csv/:filename', function(req, res) {
    let filename = path.join(config.app.data_dir, req.params.filename + '.csv');

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

router.get('/json/:filename', function(req, res) {
    let filename = path.join(config.app.data_dir, req.params.filename + '.json');

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
