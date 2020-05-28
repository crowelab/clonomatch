#!/usr/bin/env bash
rm -r build/*
npm run build
NODE_ENV=production node bin/www
