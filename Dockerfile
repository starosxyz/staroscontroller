# First stage is the build environment

FROM docker.io/centos

MAINTAINER YXR <yxr@staros.xyz>

USER root

COPY ./tools /opt/tools

WORKDIR /opt/tools/installstaros-controller/

RUN chmod a+x staroscontroller-install.sh &&\
	chmod a+x ../staroscontroller-service &&\
    ./staroscontroller-install.sh install

	
# Ports
# 6633 - OpenFlow
# 8282 - StarOS GUI
# 9922 - Starface GUI
# 8801 - StarOS CLI
# 9933 - StarOS Controller GUI
EXPOSE 6633 8282 9922 8801 9933

# Get ready to run command
CMD ["/bin/bash", "../staroscontroller-service"]
