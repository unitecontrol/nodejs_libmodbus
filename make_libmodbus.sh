#!/bin/sh

git clone https://github.com/stephane/libmodbus.git

cd ./libmodbus/

# reset to patch commit number
git reset --hard 6eaaad6b2d6fa434772ae9d419adfa9ae38f625e

patch -c -p2 < ../mt.patch

#./autogen.sh && ./configure --enable-static=yes --enable-shared=no && make
./autogen.sh && ./configure && make
