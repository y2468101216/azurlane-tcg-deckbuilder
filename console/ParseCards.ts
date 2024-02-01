import axios from 'axios';
import * as fs from 'fs';

let page = 1;
let limit = 100;
let total = 0;
let list = [];
let jsonList: string[] = [];
axios.post("https://api.azurlane-tcg.com/api/pc/getKapaiList",{"page":page,"limit":limit})
    .then(function(response: { data: any; }){
        total = response.data.data.total;
        list = response.data.data.list;
        saveJson()
    });

function saveJson() {

    for (let i=0; i<total; i+=limit) {
        axios.post("https://api.azurlane-tcg.com/api/pc/getKapaiList", {"page": page, "limit": limit})
            .then((response: { data: any; }) => {
                list = response.data.data.list;
                fs.writeFile('public/assert/cards_' + i + '.json', JSON.stringify(list, null, 4), {
                    flag: "w+"
                } ,function(err){
                    console.log(err)
                });
            });
        jsonList.push('cards_' + i + '.json');
        page++;
    }

    fs.writeFile('public/assert/cards_list.json', JSON.stringify(jsonList), {
        flag: "w+"
    },function(err){
        console.log(err)
    });
}