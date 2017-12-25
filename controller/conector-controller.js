'use strict'
var cryptoUtil = require('../util/cryptojs-util');
var conf = require('../configuracion.json');
var urls = require('../urls.json');
var apiRest= require('../api-rest.json');
var _ = require('lodash');
var request = require('request');


var conector = {

    authenticate: function (req, res) {
        let header = req.headers;
        let body = req.body;
        //console.log({ kData: body.k });
        cryptoUtil.cryptoMethod.decode(body.k).then(dec => {
            console.log({decData:dec});
            let j=JSON.parse(dec);
            console.log({jsonData:j});
            
            
            let sysIndex = _.findIndex(conf.apps, function (o) { return o.key == j.k; })
            if (sysIndex != -1) {

                if (conf.apps[sysIndex].origin == header.origin) {
                    console.log('origen pass');
                    //solicitando token
                    cryptoUtil.cryptoMethod.encode(JSON.stringify({keyApp:'34532345456dfdfghsadsfdfs'})).then(enc=>{
                        request.post(apiRest.host+apiRest.token, { form: { data: enc } }, (err, httpResponse, body) => {
                            //console.log({resApiRest:httpResponse,bodyMantecol:body});
                            try{
                                let j=JSON.parse(body);
                                if(j.success==true){
                                    console.log({jMoco:j});
                                    let strg=JSON.stringify({d:true,dat:{t:j.token,data:null},u:urls})
                                    cryptoUtil.cryptoMethod.encode(strg).then(twoenct=>{
                                        console.log('enviado respuesta a app');
                                        res.json({
                                            d:true,dat:twoenct
                                        })
                                    }) 
                                }


                            }catch(e){
                                res.json({
                                    d: false
                                })
                            }
                            
                          })
                    }).catch(()=>{
                        res.json({
                            d: false
                        })
                    })
                    

                } else {
                    res.json({
                        d: false
                    })
                }


            } else {
                res.json({
                    d: false
                })
            }
        }).catch(()=>{
            res.json({
                d: false
            })
        })




       // console.log({ auth: req.headers, body: body });

    },
    peticion:peticion

    

}


function peticion(req,res){
    let body = req.body.k;
    cryptoUtil.cryptoMethod.decode(body).then(dec => {
    console.log({peticionRealizada:dec});
    let jData = JSON.parse(dec);
    console.log({jItemPeticion:jData.data.d});
        console.log({jDataJSon:jData});
        console.log({urlPom:jData.data.d.u});
        console.log({mocoson:jData});
    request.post(apiRest.host+jData.data.d.u, { form: { token: jData.data.d.m, data: jData.data.d.c,IdentificadorApp:jData.k,ident:jData.data.ident } }, (err, httpResponse, body) => {
        console.log({dataApi:body});
        try{


            if(body!=undefined){
                let j= JSON.parse(body);
           
                    if(j.success==true){
                       
                            res.json({
                                d:true,dat:j.d
                            })
                   
                        console.log('el josias es un gordo');
                    }else{
                        res.json({
                            d:true,dat:null
                        })
                    }
            }else{
                res.json({
                    d:true,dat:null
                })
            }


        }catch(e){
            res.json({
                d:true,dat:null
            })
        }
        
      


    })
   
    })
}

module.exports = conector;