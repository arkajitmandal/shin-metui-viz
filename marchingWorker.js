importScripts("./Lib/marchingcubes.js");
importScripts("wavefunction.js");
importScripts("MO.js");


function getSurfaceMesh(bound,iso,res, dat){
    let Dat = marchingCubes([res,res,res],
        function(x,y,z) {
      return electronPSI(x, y, z, dat) - iso;
        }, [bound[2],bound[1]]);
    postMessage({'msg':'orbital computed','Dat':Dat,'cmd':'done'});
}



function electronPSI(x, y, z, dat) {
    n = 0.0500339;
    b = 0.201457;
    gaussY = n * Math.exp(-b * y * y);
    gaussZ = n * Math.exp(-b * z * z);
    //gaussX = n * Math.exp(-b * x * x);
    // Data on X
    let nR = dat.length;
    let Rmin = dat[0][0];
    let Rmax = dat[nR-1][0];
    let dR = (Rmax - Rmin)/nR
    let xi = Math.floor((x - Rmin)/dR) 
    gaussX = dat[xi][1] 
    //console.log( xi, x, gaussX)
    //console.log(gaussX * gaussY * gaussZ) 
    return gaussX * gaussY * gaussZ  //* 1E7
    //
}

onmessage = function(e) {
    //console.log('received ' + e.data);
    let msg = e.data;
    if (msg.cmd == "Start"){
        getSurfaceMesh(msg.bound,msg.iso,msg.res,msg.dat);
    }
}

