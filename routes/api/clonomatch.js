const express = require('express');
const router = express.Router({mergeParams: true});
const fs = require('fs');
const path = require('path');
const MongoWrapper = require(path.join(global.appRoot, 'lib', 'MongoWrapper'));
const { execSync, spawn } = require('child_process');
const config = require(path.join(global.appRoot, process.env.CONF));

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
    let dir = path.join(config.app.data_dir, name);
    fs.mkdir(dir, (err) => {
        if(err) {
            console.error("Couldn't create:", dir);
            res.send(500);
        }

        //You'll thank me later if you want to debug sibsearch
        let args = [config.app.sibsearch.executable, '-v', body.v, '-j', body.j, '--cdr3', body.cdr3,
            '--dir', dir, '--pid', body.pid, '--coverage', body.coverage];
        spawn('python3', args).on('exit', (code) => {
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
    fs.readdir(config.app.clonotypes.dir, (err, files) => {
        if(!err) {
            let file = files[Math.floor(Math.random()*files.length)];
            let line_num = Math.floor(Math.random()*parseInt(config.app.clonotypes.lines_per_file));

            let line = execSync('sed \'' + String(line_num) + 'q;d\' ' + path.join(config.app.clonotypes.dir, file))
                .toString();

            /*
                If line is empty repeat until found
             */
            while(!line.includes(',')) {
                file = files[Math.floor(Math.random()*files.length)];
                line_num = Math.floor(Math.random()*parseInt(config.app.clonotypes.lines_per_file));
                line = execSync('sed \'' + String(line_num) + 'q;d\' ' + path.join(config.app.clonotypes.dir, file))
                    .toString();
            }

            let ls = line.trim().split(',');
            MongoWrapper.getV3JMatches(ls[0], ls[1], ls[2], (err, results) => {
                if(err) {
                    console.error("Error getting Random V3J Match:", err);
                    res.send(500);
                } else {
                    res.json({
                        v: ls[0],
                        j: ls[1],
                        cdr3: ls[2],
                        results: results
                    });
                }
            });
        } else {
            console.error("random clonotype failed -- no random v3j returned");
            res.send(500);
        }
    });
});

router.post('/csv', function(req, res) {
    let body = JSON.parse(req.body);

    let filename = new Date().getTime() + ".csv";
    let filepath = path.join(config.app.data_dir,filename);
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
    let filename = path.join(config.app.data_dir, req.params.filename);

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
