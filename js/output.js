// 投稿物を表示する my---------------------------
function mysearch() {
    // user名を検索取得
    // let inc = 0;
    // 投稿物を検索取得
    messagesRef.orderBy("time", "asc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().user_ID == auth_uid) {
                var doc_id = doc.id;

                var str = [];
                // str += String(inc);
                // inc++;
                str += `<div class="content_box">`;
                str += `<div class="card_box">`;
                str += `<div class="stamp_box">`;
                str += `<img src="../img/stamp_2.png" id="stamp" class="stamp" alt="">`;
                str += `</div>`;

                str += `<div id="${doc_id}" class="myout">`;
                str += `<p id="${doc.data().user_ID}" class="user_ID"></p>`;
                str += `<p id="${doc.data().messages_ID}" class="messages_ID">${doc.data().text}</p>`;
                str += `<p>${doc.data().posttime}</p>`;

                var media = [];
                // 写真投稿している時
                if (doc.data().blob == "image/jpeg") {
                    str += `<i class="material-icons">photo</i>`;
                    media += `<p id="chat_text" >${doc.data().text}</p>`;
                    media += `<img src="${doc.data().file}" id="${doc_id}" class="media"  alt="" width="400px" height="200px" border="0" />`;                    // 音声投稿しているとき
                } else if (doc.data().blob == "audio/mpeg") {
                    str += `<i class="material-icons">audiotrack</i>`;
                    media += `<p id="chat_text" >${doc.data().text}</p>`;
                    media += `<audio controls src="${doc.data().file}" id="${doc_id}" ></audio>`;
                    // 動画投稿しているとき
                } else if (doc.data().blob == "video/mpeg") {
                    str += `<i class="material-icons">movie_creation</i>`;
                    media += `<p id="chat_text" >${doc.data().text}</p>`;
                    media += `<video controls src="${doc.data().file}" id="${doc_id}"  width="500px" height="300px"></video>`;
                    // ファイル投稿していないとき
                } else {
                    // console.warn("ファイルがありません");
                }
                localStorage.setItem(doc_id, media);


                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col speak"><i class="material-icons">play_arrow</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col cancel"><i class="material-icons">not_interested</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col pause"><i class="material-icons">pause</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col resume"><i class="material-icons">replay</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col delete"><i class="material-icons">delete_forever</i></button>`;
                // str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col favorite"><i class="material-icons">star_rate</i></button>`;
                str += `<input type="tel" pattern="^¥d+$"  id=${doc_id} class="deleteTime" title="数字でご入力ください"></input>`;
                str += `<button id="Minutes"
                        class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent setTime"><i
                        class="material-icons">access_alarm</i>Minutes</button>`;
                str += `</div>`;
                //  str += `<button id=${doc_id} class="speak"><i class="material-icons">play_arrow</i></button>`;
                // str += `<button id=${doc_id} class="cancel">停止</button>`;
                // str += `<button id=${doc_id} class="pause">一時停止</button>`;
                // str += `<button id=${doc_id} class="resume">再開</button>`;
                // str += `<button id=${doc_id} class="delete">削除</button>`;
                // str += `<button id=${doc_id} class="favorite">保存</button>`;
                // str += `<input type="tel" pattern="^¥d+$" id=${doc_id} class="deleteTime" title="数字でご入力ください"></input>`;
                // str += `<input type="button" value="Minutes" class="setTime">`;
                // str += `</div>`; 

                $('#output').prepend(str);
                // console.log('yes');
            }

        });
        // 投稿数を取得表示
        // usersRef.get().then((querySnapshot) => {
        //     // var userRefCount;
        //     usersRef.get().then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             if ("messages_" + auth_uid == "messages_" + doc.id) {
        //                 console.log(doc.data().my_count);
        //                 alert('まだ投稿がありません。');
        //                 // $('#outputCount').html(userRefCount);
        //             }
        //         });
        //     });
        // });
    });

    var userMessagesRefCount;
    usersRef.doc("messages_" + auth_uid).get().then(function (doc) {
        if (doc.data().my_count == 0 || null) {
            alert('投稿がありません。');
        } else {
            userMessagesRefCount = doc.data().my_count;
            console.log(userMessagesRefCount);
        }
    });
    console.log(userMessagesRefCount);

    // 投稿物削除button-------------------------------
    // コレクション削除
    $('#output').on('click', '.delete', function () {
        // clickを押した子要素の親idを取得
        var divID = $(this).parent().attr('id');
        console.log(divID);

        // カウントのupdate
        usersRef.doc("messages_" + localID).set({
            my_count: parseInt(userMessagesRefCount) - 1
        });
        console.log(userMessagesRefCount);

        localStorage.removeItem(divID);

        messagesRef.doc(divID).delete().then(function () {
            setTimeout(function () {
                window.location.reload();
            }, 10);

        }).catch(function (error) {
            console.error('error removing document:', error);
        });
    });

    // // 保存button-----------------------------
    // $('#output').on('click', '.favorite', function () {
    //     // clickを押した子要素の親idを取得
    //     var divID = $(this).parent().attr('id');
    //     console.log(divID);
    //     var favorite_message = document.getElementById(divID);
    //     var get_doc = $(favorite_message).children();
    //     console.log(get_doc[0].id);

    //     // 保存投稿
    //     var favoriteRef = firebase.firestore().collection('FAVORITE');
    //     var localID = localStorage.getItem('userID');

    //     favoriteRef.add({
    //         messages_ID: divID,
    //         user_ID: get_doc[0].id,
    //         postuser_ID: localID,
    //         time: date
    //     });

    //     // 保存取得
    //     usersRef.get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             if ("favorite_" + localID == doc.id) {
    //                 // console.log('yes');
    //                 // console.log(doc.id);
    //                 // console.log(doc.data());
    //                 userRefCount = doc.data().favorite_count;
    //                 // console.log(userRefCount);
    //             } else {
    //                 console.log('no');
    //             }
    //         });

    //         console.log(userRefCount);
    //         var ref_count = 1;

    //         if (userRefCount == null) {
    //             // カウントのupdate
    //             usersRef.doc("favorite_" + localID).set({
    //                 favorite_count: 1 //sum
    //             });
    //             console.log('no');
    //         } else {
    //             console.log('yes');
    //             usersRef.doc("favorite_" + localID).set({
    //                 favorite_count: parseInt(userRefCount) + parseInt(ref_count++)
    //             });
    //             console.log(userRefCount);
    //         }
    //     });
    // });

};

// 投稿物を表示する other---------------------------

let userRefArray = [];
function othersearch() {
    messagesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var doc_id = doc.id;

            // if (doc.data().time == date2) {
            // console.log(doc.data().posttime);

            var str = [];
            str += `<div class="content_box">`;
            str += `<div class="card_box">`;
            str += `<div class="stamp_box">`;
            str += `<img src="../img/stamp_2.png" id="stamp" class="stamp" alt="">`;
            str += `</div>`;

            str += `<div id="${doc_id}" class="myout">`;
            str += `<p id="${doc.data().user_ID}" class="user_ID"></p>`;
            str += `<p id="${doc.data().messages_ID}" class="messages_ID">${doc.data().text}</p>`;

            var media = [];
            // 写真投稿している時
            if (doc.data().blob == "image/jpeg") {
                str += `<i class="material-icons">photo</i>`;
                media += `<p id="chat_text" >${doc.data().text}</p>`;
                media += `<img src="${doc.data().file}" id="${doc_id}" alt="" width="400px" height="200px" border="0" />`;
                // 音声投稿しているとき
            } else if (doc.data().blob == "audio/mpeg") {
                str += `<i class="material-icons">audiotrack</i>`;
                media += `<p id="chat_text" >${doc.data().text}</p>`;
                media += `<audio controls src="${doc.data().file}" id="${doc_id}"></audio>`;
                // 動画投稿しているとき
            } else if (doc.data().blob == "video/mpeg") {
                str += `<i class="material-icons">movie_creation</i>`;
                media += `<p id="chat_text" >${doc.data().text}</p>`;
                media += `<video controls src="${doc.data().file}" id="${doc_id}"  width="500px" height="300px"></video>`;
                // ファイル投稿していないとき
            } else {
                // console.warn("ファイルがありません");
            }

            localStorage.setItem(doc_id, media);

            str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col speak"><i class="material-icons">play_arrow</i></button>`;
            str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col cancel"><i class="material-icons">not_interested</i></button>`;
            str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col pause"><i class="material-icons">pause</i></button>`;
            str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col resume"><i class="material-icons">replay</i></button>`;
            str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col favorite"><i class="material-icons">star_rate</i></button>`;
            str += `</div>`;

            userRefArray.push(str);
            // } 
        });

        for (i = userRefArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = userRefArray[i];
            userRefArray[i] = userRefArray[j];
            userRefArray[j] = tmp;
        }
        // console.log(userRefArray);
        $('#output').prepend(userRefArray);
    });

    // 保存button-----------------------------
    $('#output').on('click', '.favorite', function () {
        console.log('保存');
        // clickを押した子要素の親idを取得
        var divID = $(this).parent().attr('id');
        console.log(divID);
        var favorite_message = document.getElementById(divID);
        var get_doc = $(favorite_message).children();
        console.log(get_doc[0].id);

        // 保存情報を投稿
        var favoriteRef = firebase.firestore().collection('FAVORITE');
        var localID = localStorage.getItem('userID');
        favoriteRef.add({
            messages_ID: divID,
            user_ID: get_doc[0].id,
            postuser_ID: localID,
            time: date
        });


        var localID = localStorage.getItem('userID');
        usersRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if ("favorite_" + localID == doc.id) {
                    userRefCount = doc.data().favorite_count;
                }
            });

            console.log(userRefCount);
            var ref_count = 1;

            if (userRefCount == NaN) {
                // カウントのupdate
                usersRef.doc("favorite_" + localID).set({
                    favorite_count: 1 //sum
                });
                console.log('no');
            } else {
                console.log('yes');
                usersRef.doc("favorite_" + localID).set({
                    favorite_count: parseInt(userRefCount) + parseInt(ref_count++)
                });
            }
        });
    });
};


// 投稿物を表示する favorite---------------------------
function favoritesearch() {

    var auth_uid = localStorage.getItem('userID');

    var userRefCount;
    usersRef.doc("favorite_" + auth_uid).get().then(function (doc) {
        if (doc.data().favorite_count == 0 || null || undefined) {
            alert('保存されている投稿はありません。');
        } else {
            userRefCount = doc.data().favorite_count;
            console.log(doc.data().favorite_count);
        }
    });

    // テキストとuserのIDを関数から取得してくる
    // favoriteに入っているデータをとってくる
    favoriteRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            if (doc.data().postuser_ID == localID) {

                var searchID;
                // var searchID_user;
                var searchdelete;
                // console.log(doc.id);
                searchdelete = doc.id;
                searchID = doc.data().messages_ID;
                // console.log(searchID);
                searchID_user = doc.data().user_ID;
                // console.log(searchID_user);


                // messagesで検索する
                messagesRef.doc(searchID).get().then((res) => {

                    var res_id = res.id;
                    // console.log(res.data());
                    // console.log(res_id);
                    // console.log(res.data().user_ID);
                    // console.log(res.data().text);

                    // messagesのデータが無ければ、favoriteRefから削除する
                    if (res.data() == null) {
                        console.log('out');
                        favoriteRef.doc(searchdelete).delete().then(function () {
                        }).catch(function (error) {
                            console.error('error removing document:', error);
                        });
                        localStorage.removeItem(searchdelete);
                        var str = [];
                        str += `<p>内容はまだ保存されていません。</p>`;
                        $('#Foutput').html(str);
                    }

                    var fstr = [];
                    fstr += `<div class="content_box">`;
                    fstr += `<div class="card_box">`;
                    fstr += `<div class="stamp_box">`;
                    fstr += `<img src="../img/stamp_2.png" id="stamp" class="stamp" alt="">`;
                    fstr += `</div>`;

                    fstr += `<div id="${res_id}" class="myout">`;
                    fstr += `<p id="${res.data().user_ID}" class="user_ID"></p>`;
                    fstr += `<p id="${res_id}" class="messages_ID">${res.data().text}</p>`;

                    var media = [];
                    // 写真投稿している時
                    if (res.data().blob == "image/jpeg") {
                        fstr += `<i class="material-icons">photo</i>`;
                        media += `<p id="chat_text" >${doc.data().text}</p>`;
                        media += `<img src="${res.data().file}" id="${res_id}" alt="" width="400px" height="200px" border="0" />`;
                        // 音声投稿しているとき
                    } else if (res.data().blob == "audio/mpeg") {
                        fstr += `<i class="material-icons">photo</i>`;
                        media += `<p id="chat_text" >${doc.data().text}</p>`;
                        media += `<audio controls src="${res.data().file}" id="${res_id}" ></audio>`;
                        // 動画投稿しているとき
                    } else if (res.data().blob == "video/mpeg") {
                        fstr += `<i class="material-icons">photo</i>`;
                        media += `<p id="chat_text" >${doc.data().text}</p>`;
                        media += `<video controls src="${res.data().file}" id="${res_id}" class="media"  width="500px" height="300px"></video>`;
                        // ファイル投稿していないとき
                    } else {
                        console.warn("ファイルがありません");
                    }

                    localStorage.setItem(res_id, media);

                    fstr += `<button id=${res_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col speak"><i class="material-icons">play_arrow</i></button>`;
                    fstr += `<button id=${res_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col cancel"><i class="material-icons">not_interested</i></button>`;
                    fstr += `<button id=${res_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col pause"><i class="material-icons">pause</i></button>`;
                    fstr += `<button id=${res_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col resume"><i class="material-icons">replay</i></button>`;
                    fstr += `<button id=${searchdelete} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col favorite_delete"><i class="material-icons">delete_sweep</i></button>`;
                    fstr += `</div>`;
                    $('#Foutput').prepend(fstr);

                });
            }
        });
    });

    // 保存削除button-------------------------------
    // FAVORITEコレクション削除
    $('#Foutput').on('click', '.favorite_delete', function () {
        // clickを押した子要素の親idを取得
        var divID = $(this).attr('id');
        console.log(divID);

        // カウントのupdate
        usersRef.doc("favorite_" + localID).set({
            favorite_count: parseInt(userRefCount) - 1
        });
        console.log(userRefCount);

        localStorage.removeItem(divID);

        favoriteRef.doc(divID).delete().then(function () {
            setTimeout(function () {
                window.location.reload();
            }, 3);

        }).catch(function (error) {
            console.error('error removing document:', error);
        });

    });
};

// NGワード検索・非表示-----------------------------
function NGsend() {
    console.log('go');
    NGwordRef.add({
        user_ID: auth_uid,
        text: $('#search').val()
    });
    setTimeout(function () {
        $('#search').val('');
        window.location.reload();
    }, 400);
};

function ngsearch() {
    // user名を検索取得、ログイン名と同じなら表示する
    // 投稿物を検索取得
    var NGtextarr = [];
    NGwordRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.data().user_ID);
            if (doc.data().user_ID == auth_uid) {
                var doc_id = doc.id;
                // console.log(doc.data().user_ID);
                console.log(doc.data().text);
                var NGtext = doc.data().text;
                NGtextarr.push(NGtext);

                var nstr = [];
                nstr += `<div id="${doc_id}">`;
                nstr += `<p id="${doc_id}" class="messages_ID">${NGtext}</p>`;
                nstr += `</div>`;
                $('#out').prepend(nstr);
            }
        });
        // NGwordに登録したもの
        var searchText = NGtextarr;
        console.log(NGtextarr);
        var targetText;

        $('#output p').each(function () {
            // 表示されている全textを取得
            targetText = $(this).text();
            // console.log(targetText);
            for (var i = 0; i < NGtextarr.length; i++) {
                if (targetText.search(NGtextarr[i]) != -1) {
                    //     // 部分一致のときの処理
                    console.log('out');
                    // var serchItem = $(this).parent().attr('id');
                    // console.log(serchItem);
                    $(this).parent().remove();
                    break;

                } else {
                    console.log('safe');
                };
            };
        });
    });
}


// cardを検索取得------------------------------------------------------------

var cardRef = firebase.firestore().collection('CARD');
var localID = localStorage.getItem('userID');

function cardset() {
    userArr = [];
    cardRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var doc_id = doc.data().user_ID;
            console.log(doc_id);
            userArr.push(doc_id);
        });
    });

    console.log(userArr);
    // var reg = new RegExp(localID);
    // console.log(reg);
    var userArrSearch = userArr.find(function (element) {
        return element(localID);
    });
    console.log(userArrSearch);

    if (userArrSearch == undefined) {
        console.log('yes');

        cardRef.doc(localID).get().then(function (doc) {
            var doc_id = doc.data().card_ID;
            var localNAME = localStorage.getItem('userNAME');

            var str = [];
            str += `<div id="${doc_id}">`;
            str += `<div id="${doc_id}" class="card_ID">`;
            str += `<div id="${doc.data().user_ID}" class="user_ID"></div>`;
            str += `<p class="name">${localNAME}</p>`;
            str += `<p id="${doc_id}_characteristics" class="characteristics">ひとこと:　${doc.data().characteristics}</p>`;

            if (doc.data().contact !== '') {
                str += `<p id="${doc_id}_contact" class="contact">連絡先:　${doc.data().contact}</p>`;
            }
            str += `</div>`;

            $('#Coutput').html(str);
        });
    } else {
        var localNAME = localStorage.getItem('userNAME');
        var str = [];
        str += `<p class="name">${localNAME}</p>`;
        str += `<p>編集されていません。</p>`;
        $('#Coutput').html(str);
    }

};


function mycard() {
    userArr = [];
    cardRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var doc_id = doc.data().user_ID;
            userArr.push(doc_id);
            // console.log(doc_id);
        });
    });

    console.log(userArr);
    var userArrSearch = userArr.find(function (element) {
        return element(auth_uid);
    });
    console.log(userArrSearch);

    if (userArrSearch == undefined) {
        console.log('yes');

        cardRef.doc(auth_uid).get().then(function (doc) {
            var doc_id = doc.data().card_ID;
            // var display_get = localStorage.getItem('userNAME');

            var str = [];
            str += `<div id="${doc_id}">`;
            str += `<div id="${doc_id}" class="card_ID">`;
            str += `<div id="${doc.data().user_ID}" class="user_ID"></div>`;
            // str += `<p class="name">${auth_uid}</p>`;
            str += `<h2 id="${doc_id}_characteristics" class="characteristics">ひとこと:　${doc.data().characteristics}</h2>`;

            if (doc.data().contact !== '') {
                str += `<h2 id="${doc_id}_contact" class="contact">連絡先:　${doc.data().contact}</h2>`;
            }
            str += `</div>`;
            str += `</div>`;

            $('#Coutput').prepend(str);
        });
    } else {
        var str = [];
        // str += `<p class="name">${auth_uid}</p>`;
        str += `<p>内容はまだ<a href=Card_set.html>投稿</a>されていません。</p>`;
        $('#Coutput').html(str);
    }
};


// 相手の情報を探す---------------------------
function yourSearch() {
    var yourID = $('#search').val();
    console.log(yourID);
    var auth_uid = localStorage.getItem('userID');

    userArr = [];
    messagesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var doc_id = doc.data().user_ID;
            userArr.push(doc_id);
            // console.log(doc_id);
        });
    });

    // 数量チェック
    console.log(userArr);
    var userArrSearch = userArr.find(function (element) {
        return element(auth_uid);
    });
    console.log(userArrSearch);
    if (userArrSearch != undefined) {
        alert('投稿がまだありません。');// target.html = str;
    }

    var outGet = document.getElementById('output');
    console.log(outGet);

    // 自分のIDが無い場合全員分のデータが表示される
    // 表示されたIDとログインIDが異なれば、remove する
    messagesRef.get().then((querySnapshot) => {
        var str = '';
        querySnapshot.forEach((doc) => {
            // console.log(doc.data().user_ID);
            // console.log(yourID);

            if (doc.data().user_ID == yourID) {
                var doc_id = doc.id;

                // var str = [];
                // str += String(inc);
                // inc++;
                str += `<div class="content_box">`;
                str += `<div class="card_box" style="background-color: #fff;">`;
                str += `<div class="stamp_box">`;
                str += `<img src="../img/stamp_2.png" id="stamp" class="stamp" alt="">`;
                str += `</div>`;


                str += `<div id="${doc_id}">`;
                str += `<p id="${doc.data().user_ID}" class="user_ID">${doc.data().user_NAME}</p>`;
                str += `<p id="${doc.data().messages_ID}" class="messages_ID">${doc.data().text}</p>`;
                // str += `<p>${doc.data().posttime}</p>`;

                var media = [];
                // 写真投稿している時
                if (doc.data().blob == "image/jpeg") {
                    str += `<i class="material-icons">photo</i>`;
                    media += `<p id="chat_text" >${doc.data().text}</p>`;
                    media += `<img src="${doc.data().file}" id="${doc_id}" class="media"  alt="" width="400px" height="200px" border="0" />`;
                    // 音声投稿しているとき
                } else if (doc.data().blob == "audio/mpeg") {
                    str += `<i class="material-icons">photo</i>`;
                    media += `<p id="chat_text" class="media" >${doc.data().text}</p>`;
                    media += `<audio controls src="${doc.data().file}" id="${doc_id}" ></audio>`;
                    // 動画投稿しているとき
                } else if (doc.data().blob == "video/mpeg") {
                    str += `<i class="material-icons">photo</i>`;
                    media += `<p id="chat_text" >${doc.data().text}</p>`;
                    media += `<video controls src="${doc.data().file}" id="${doc_id}" class="media"  width="500px" height="300px"></video>`;
                    // ファイル投稿していないとき
                } else {
                    // console.warn("ファイルがありません");
                }
                localStorage.setItem(doc_id, media);

                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col speak"><i class="material-icons">play_arrow</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col cancel"><i class="material-icons">not_interested</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col pause"><i class="material-icons">pause</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col resume"><i class="material-icons">replay</i></button>`;
                str += `<button id=${doc_id} class="mdl-button mdl-js-button mdl-button--primary  mdl-cell mdl-cell--1-col favorite"><i class="material-icons">star_rate</i></button>`;
                str += `</div>`;
                str += `</div>`;
                // console.log(str);

                // console.log('yes');

                // $('#output').prepend(str);
                // target.html = str;
            }
            $('#output').html(str);
        });
        $('#search').val('');
    });

    // 保存button-----------------------------
    $('#output').on('click', '.favorite', function () {
        console.log('保存');
        // clickを押した子要素の親idを取得
        var divID = $(this).parent().attr('id');
        console.log(divID);
        var favorite_message = document.getElementById(divID);
        var get_doc = $(favorite_message).children();
        console.log(get_doc[0].id);

        // 保存情報を投稿
        var favoriteRef = firebase.firestore().collection('FAVORITE');
        var localID = localStorage.getItem('userID');
        favoriteRef.add({
            messages_ID: divID,
            user_ID: get_doc[0].id,
            postuser_ID: localID,
            time: date
        });


        var localID = localStorage.getItem('userID');
        usersRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if ("favorite_" + localID == doc.id) {
                    userRefCount = doc.data().favorite_count;
                }
            });

            console.log(userRefCount);
            var ref_count = 1;

            if (userRefCount == NaN) {
                // カウントのupdate
                usersRef.doc("favorite_" + localID).set({
                    favorite_count: 1 //sum
                });
                console.log('no');
            } else {
                console.log('yes');
                usersRef.doc("favorite_" + localID).set({
                    favorite_count: parseInt(userRefCount) + parseInt(ref_count++)
                });
            }
        });
    });
}

