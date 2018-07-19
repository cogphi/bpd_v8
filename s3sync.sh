#! /bin/bash

s3cmd sync --delete-removed . s3://temp.butterfill.com/bpd_v8/ --add-header "Cache-Control: max-age=86400"
