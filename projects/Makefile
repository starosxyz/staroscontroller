#
# Copyright (C) 2013-2015, Nanjing WFNEX Technology Co., Ltd
#
export CURRENTPWD:=$(shell pwd)
export PRJDIR=$(CURRENTPWD)
export USER_ROOT=$(CURRENTPWD)/../
export PROJECT_NAME=staroscontroller
#######################################################################################
#######################################################################################
NULL_STDERR = 2>$(/dev/null) || true
MAJOR_VERSION := $(shell awk '/USER_MAJOR_VERSION/ { print $$3}' ${USER_ROOT}/include/myversion.h)
MINOR_VERSION := $(shell awk '/USER_MINOR_VERSION/ { print $$3}' ${USER_ROOT}/include/myversion.h)
BETA_VERSION := $(shell awk '/USER_BETA_VERSION/ { print $$3}' ${USER_ROOT}/include/myversion.h)
VERSION = $(MAJOR_VERSION).$(MINOR_VERSION).$(BETA_VERSION)
#######################################################################################
#######################################################################################
ifeq (1,$(debug))
TARNAME=$(PROJECT_NAME)_debug-$(VERSION)
else
TARNAME=$(PROJECT_NAME)_release-$(VERSION)
endif
#######################################################################################

all: check_dir $(buidlall)
	cp -rf $(USER_ROOT)/LICENSE.txt $(PRJDIR)/$(PROJECT_NAME)/
	cp -rf $(USER_ROOT)/ONOS_LICENSE.txt $(PRJDIR)/$(PROJECT_NAME)/
	cp -rf $(USER_ROOT)/AUTHOR $(PRJDIR)/$(PROJECT_NAME)/
	cp -rf $(USER_ROOT)/README.md $(PRJDIR)/$(PROJECT_NAME)/
	cp -rf $(USER_ROOT)/src/* $(PRJDIR)/$(PROJECT_NAME)/starlang/
	echo "Packing " $(TARNAME) "..."
	tar jcvf $(TARNAME).tar.bz2 -C $(PRJDIR) $(PROJECT_NAME)    
	@echo "build " $(PROJECT_NAME) " done!"
	@echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SUCCESS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

check_dir: 
	echo $(PRJDIR)
	@test -d $(PRJDIR)/$(PROJECT_NAME) || mkdir -p $(PRJDIR)/$(PROJECT_NAME)
	@test -d $(PRJDIR)/$(PROJECT_NAME)/logs || mkdir -p $(PRJDIR)/$(PROJECT_NAME)/logs
	@test -d $(PRJDIR)/$(PROJECT_NAME)/changelogs || mkdir -p $(PRJDIR)/$(PROJECT_NAME)/changelogs
	@test -d $(PRJDIR)/$(PROJECT_NAME)/docs || mkdir -p $(PRJDIR)/$(PROJECT_NAME)/docs
	@test -d $(PRJDIR)/$(PROJECT_NAME)/starlang || mkdir -p $(PRJDIR)/$(PROJECT_NAME)/starlang
#################################################################################
clean:
	rm -rf $(TARNAME).tar.bz2
	rm -rf $(PRJDIR)/$(PROJECT_NAME)
	
