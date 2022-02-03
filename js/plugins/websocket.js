//===================================================================
//websocket.js
//イベントの頭上に文字を表示するプラグイン
//===================================================================
(function() {
    const symbol = require('/node_modules/symbol-sdk');
    const nodeUrl = 'http://sym-test-01.opening-line.jp:3000';
    const epochAdjustment = 1637848847;
    const networkType = symbol.NetworkType.TEST_NET;
    const networkGenerationHash = "7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836"

    const repositoryFactory = new symbol.RepositoryFactoryHttp(nodeUrl, {
        websocketUrl: 'wss://sym-test-01.opening-line.jp:3000/ws',
        websocketInjected: WebSocket
    });

    const listener = repositoryFactory.createListener();
    const raw_address = 'TDCPHIHQPN6WKJJIUCOFISJCB4NULEZOS4NCQQQ'; //revokeされるアドレス

    const address = symbol.Address.createFromRawAddress(raw_address);
    const privateKey = 'EE59AE723F6DC1BF4192997AC4D8FA2B0BBE015840ED8810AF8F2764E6D125D7';

    const accountHttp = repositoryFactory.createAccountRepository();


// 指定アドレスが関与しているトランザクションが承認されたら
// 指定アドレスのHPモザイク残高を変数にセット

    console.log("WebSocket前");
    listener.open().then(() => {
        listener.confirmed(address).subscribe(
            () => {
                setHitPoint2Variable()
            },
            (err) => console.error(err),
        );
    });

    function setHitPoint2Variable() {
        $gameVariables.setValue(15,0)
        let url = 'http://sym-test-02.opening-line.jp:3000/accounts/TCW5Z7YV6ZS7SIQ3ZRJMUNGUCQ6WYXNYXKV4WCY';
        fetch(url)
            .then(function (data) {
                return data.json();
            })
            .then(function (json) {
                console.log(json.account.mosaics)
                for (var i = 0; i < json.account.mosaics.length; i++) {
                    if (json.account.mosaics[i].id == '7F2D26E89342D398') {
                        // 保有モザイクを検索してrevokeのモザイクだったら残高を変数にセット
                        // 15番入れたら他プレイやにも反映されてた。オンライン共有変数だった気がするから多分それのおかげ
                        $gameVariables.setValue(15, json.account.mosaics[1].amount)
                    }
                }
            });
    }
})();
