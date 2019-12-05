// 音声認識
function SpeechRecognition() {
    // 音声認識でテキスト化
    SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;

    // 使用チェック
    if ('SpeechRecognition' in window) {
        console.log('認識に対応しています');
    } else {
        alert('認識に対応していません');
    }

    // マイクを通じた音声を自動的に認識
    let recognition = new SpeechRecognition();

    // アメリカ英語：es-US イギリス英語：en-GB 中国語：zh-CN 韓国語：ko-KR
    // 日本語を指定：ja-JP
    recognition.lang = 'ja-JP';

    // interim(インタラム):暫定的 ->認識中の音声を文字化
    recognition.interimResults = true;

    // 認識期限(沈黙の1分までは暫定的にとらえる)
    recognition.continuous = true;

    // 確定した認識
    let finalTranscript = '';




    recognition.onresult = (event) => {

        // 暫定的な認識
        let interimTranscript = '';

        // 配列に結果が入ってきたとき(暫定的な状況から認識start)
        for (let i = event.resultIndex; i < event.results.length; i++) {

            // consoleのresults[i][0]に入った認識語を出力
            let transcript = event.results[i][0].transcript;
            console.log(event.results[i].isFinal);


            // false(終了)なら確定認識を出力
            if (event.results[i].isFinal) {
                // alert('認識終了');
                finalTranscript += transcript;
                recognition.stop();
                alert('認識を終了します');
                // true(認識中)なら暫定認識を出力
            } else {
                interimTranscript = transcript;
            }

            if (transcript == 'ストップ') {
                console.log(transcript);
                recognition.stop();
                alert('STOP');

                // ストップだけ探して、区切る(split)-> joinで削除
                transcript.slice(-4);
                console.log(transcript);

            }

        }

        // textにhtmlを表示させる
        text.innerHTML = finalTranscript + interimTranscript;

    };

    $('#start').on('click', function () {
        recognition.start();
    });


    $('#stop').on('click', function () {
        // 音声認識終了
        recognition.stop();
    });
}



