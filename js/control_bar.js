// menu bar

// console.log('応答中です');

// ログアウト
function signOut() {
    firebase.auth().signOut().then(function () {
        alert('ログアウトします');
        setTimeout(function () {
            window.location.href = 'Login.html';
        }, 100);


    }).catch(function (error) {
        console.log(error);
        alert('ログアウトに失敗しました');

    });
}

// function menu() {
//     var postCount = localStorage.getItem('userID');
//     console.log(postCount);

//     var menu_bar = "";

//     menu_bar += '<div id="menu">';
//     menu_bar += '<a id="POST" href="Messages.html">POST</a>';
//     menu_bar += '<a id="Card" href="Card.html">My Card</a>';
//     menu_bar += '<a id="MyOutput" href="MyOutput.html">My Output</a>';
//     menu_bar += '<a id="OthersOutput" href = "OthersOutput.html" > Others Output</a >';
//     menu_bar += '<a id="Favorite" href="Favorite.html">Favorite</a>';
//     menu_bar += '<a id="Settings" href="Settings.html">Settings</a>'
//     menu_bar += '<input type="button" value="Logout" onclick=signOut()>';
//     menu_bar += '</div>';
//     menu_bar = document.write(menu_bar);


//     console.log(postCount);

// }
