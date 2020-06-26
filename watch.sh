#!/usr/bin/env bash

fswatch -o src | while read num ;  do echo File change: executing… $1 && eval $1;  done
