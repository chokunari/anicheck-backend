const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getOgpData = async officialURL => {
    let imgSrc = "";
    let description = ""; 
    let ogpData = {};
    await axios.get(officialURL,{responseType: 'document'})
    .then(response => {
        // アニメ公式URLをGETし返ってきた文字列をHTMLドキュメントとして読み込んでdomに格納する。
        const dom = new JSDOM(response.data);
        //HTMLドキュメント(dom)内のmeta要素を取得する。
        const metas = dom.window.document.getElementsByTagName('meta');
        //metasはHTMLCollectionのためmap関数は使用不可。
        Array.prototype.forEach.call(metas, meta => {
            switch(meta.getAttribute('property')){
                case `og:image`:
                    imgSrc = meta.getAttribute('content');
                    break;
                case `og:description`:
                    description = meta.getAttribute('content');
                    break;
            }
            ogpData = {
                        imgSrc: imgSrc,
                        description: description
                      };
            //if (meta.getAttribute('property') === 'og:image'){
            //    //console.log('これは画像URL:' + meta.getAttribute('content'));
            //    imgSrc = meta.getAttribute('content');
            //}else{
            //    //console.log('失敗やね');
            //}
        });
    })
    .catch(error => {
        console.log(error);
    });
    console.log(ogpData);
    //Promiseを返す
    return new Promise((resolve, reject) => {
        resolve(ogpData);
      });
};

//index.jsで使用できるようにexportする。
exports.getOgpData = getOgpData;