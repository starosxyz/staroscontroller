Name:        staroscontroller
Version:     @STAROSCONTROLLER_RPM_VERSION
Release:     1
Summary:     STAROSCONTROLLER
Vendor:      Nanjing StarOS Network Technology Co., Ltd
Packager:    StarOS.xyz

Group:       Development/Server
License:     Commercial
URL:         http://www.staros.xyz
Source0:     %{name}-@STAROSCONTROLLER_RPM_VERSION.tar.gz

BuildRoot: %{_tmppath}/%{name}-buildroot
Requires: starcore
Requires: stardlls
Requires: dipc
Requires: protocol
Requires: starlang
Requires: staros
%define _binaries_in_noarch_packages_terminate_build   0

%description
StarOS binaries for Red Hat Linux.

%prep
%setup -q

%install
mkdir -p %{buildroot}
cp -R * %{buildroot}

%clean
rm -rf %{buildroot}

%files
%defattr(-,root,root,-)
/opt/staros.xyz/staroscontroller

%post
cp -rf /opt/staros.xyz/staroscontroller/staroscontroller-service /usr/local/bin/
echo StarOS successfully, StarOS is a SDN network operating system

%preun
%postun
#TODO this should be less brute-force
rm -rf /opt/staros.xyz/staroscontroller
%changelog
# TODO

