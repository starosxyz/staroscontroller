#!/bin/bash
#
# Copyright (C) 2016-2017, Nanjing StarOS Technology Co., Ltd
#
source ./env.sh

help()
{
echo ===============================================================================
echo build usage:
echo ===============================================================================
echo "./build.sh [type]"
echo "[type]:"
echo "          help    		: help info" 
echo "          debug     		: build a debug"
echo "          release		    : build a release"
echo "          rpm 		    : build a rpm"
echo "          all 		    : build a debug and release"
echo ===============================================================================
}

# Build an RPM package
function build_rpm() {

    sudo rm -fr $STAROSCONTROLLER_RPM_ROOT

    mkdir -p $STAROSCONTROLLER_RPM_ROOT/{BUILD,RPMS,SOURCES/staroscontroller-$STAROSCONTROLLER_RPM_VERSION/opt/staros.xyz,SPECS,SRPMS}

    cp -r $STAROSCONTROLLER_STAGE $STAROSCONTROLLER_RPM_ROOT/SOURCES/staroscontroller-$STAROSCONTROLLER_RPM_VERSION/opt/staros.xyz/staroscontroller

    cd $STAROSCONTROLLER_RPM_ROOT/SOURCES
    COPYFILE_DISABLE=1 tar zcf staroscontroller-$STAROSCONTROLLER_RPM_VERSION.tar.gz staroscontroller-$STAROSCONTROLLER_RPM_VERSION

    cp $CURRENT/rpm/staroscontroller.spec $STAROSCONTROLLER_RPM_ROOT/SPECS/
    sed -i'' -E "s/@STAROSCONTROLLER_RPM_VERSION/$STAROSCONTROLLER_RPM_VERSION/g" $STAROSCONTROLLER_RPM_ROOT/SPECS/staroscontroller.spec

    rpmbuild --define "_topdir $STAROSCONTROLLER_RPM_ROOT" -bb $STAROSCONTROLLER_RPM_ROOT/SPECS/staroscontroller.spec

    cp $STAROSCONTROLLER_RPM_ROOT/RPMS/x86_64/staroscontroller-$STAROSCONTROLLER_RPM_VERSION-1.x86_64.rpm $CURRENT && ls -l $CURRENT/staroscontroller-$STAROSCONTROLLER_RPM_VERSION-1.x86_64.rpm
}

function clean_stage_dir() {
    [ -d "$STAROSCONTROLLER_RPM_ROOT" ] && rm -r $STAROSCONTROLLER_RPM_ROOT || :
}

if [ "$1" == "help" ] || [ "$1" == "" ]
then
	help
	exit 1
fi

if [ "$1" == "debug" ]
then
	make -f Makefile debug=1 optimize=0
elif [ "$1" == "release" ]
then
	make -f Makefile debug=0 optimize=1
elif [ "$1" == "rpm" ]
then
	build_rpm
	clean_stage_dir
elif [ "$1" == "all" ]
then
	make -f Makefile cleanall
	make -f Makefile debug=0 optimize=1
	build_rpm
	clean_stage_dir
else
	help
	exit 1
fi

