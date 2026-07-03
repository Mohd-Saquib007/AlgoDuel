#!/bin/bash

cd /code

g++ Main.cpp -o Main

if [ $? -ne 0 ]; then
    exit 1
fi

./Main < input.txt