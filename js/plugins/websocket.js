//===================================================================
//websocket.js
//イベントの頭上に文字を表示するプラグイン
//===================================================================
//Copyright (c) 2018 蔦森くいな
//Released under the MIT license.
//http://opensource.org/licenses/mit-license.php
//-------------------------------------------------------------------
//blog   : http://paradre.com/
//Twitter: https://twitter.com/Kuina_T
//===================================================================
//＜更新情報＞
//  ver1.1.0 2018/06/04 不具合修正、変数を使用可能にしました
//  ver1.0.0 2018/01/14 初版
//===================================================================

/*:
 * @plugindesc イベントの頭上に文字を表示したい時に使います
 * @author 蔦森くいな
 *
 * @help このプラグインはイベントのページ毎に異なる設定が可能です。
 * 設定したいイベントページの実行内容１行目に
 * 「注釈」コマンドを設定し、以下のように入力します。
 *
 * info:ハロルド
 *
 * これでイベントの頭上に「ハロルド」と表示されます。
 * 文字列の中に\V[n]で変数の値を表示する事もできます。
 * また、以下のように入力すると文字の大きさを変更できます。
 *
 * info:ハロルド,40
 *
 * さらに、行を変えて以下のように入力すると
 * 文字を表示する位置を調整できます
 *
 * info:ハロルド,40
 * infoMove:50,-20
 *
 * ※infoMoveは１つ目の数字がX座標、２つ目がY座標を調整します。
 * ※infoMoveは必ずinfoより後に入力する必要があります。
 * ※行を変えずにスペースで区切ってもOKです。
 * ※仕様上、表示する文字列に「：」や「　」は含められません
 *
 *
 * 利用規約：
 * このプラグインは商用・非商用を問わず無料でご利用いただけます。
 * 使用報告やクレジット表記も必要ありません。
 * どのようなゲームに使っても、どのように加工していただいても構いません。
 * MIT Licenseにつき著作権表示とライセンスURLは残しておいて下さい。
 */
(function() {
const symbol = require('js/plugins/node_modules/symbol-sdk');
const nodeUrl = 'http://sym-test-01.opening-line.jp:3000';
const epochAdjustment = 1637848847;
const networkType = symbol.NetworkType.TEST_NET;
const networkGenerationHash = "7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836"

const repositoryFactory = new symbol.RepositoryFactoryHttp(nodeUrl);
const listener = repositoryFactory.createListener();
const raw_address = 'TDCPHIHQPN6WKJJIUCOFISJCB4NULEZOS4NCQQQ'; //revokeされるアドレス

const address = symbol.Address.createFromRawAddress(raw_address);
const privateKey = 'EE59AE723F6DC1BF4192997AC4D8FA2B0BBE015840ED8810AF8F2764E6D125D7';


// 指定アドレスが関与しているトランザクションが承認されたら
// 指定アドレスのHPモザイク残高を変数にセット

console.log("WebSocket前");
    listener.open().then(() => {
        listener.confirmed(address).subscribe(
            (tx) => {
                // console.log(block);
                const accountHttp = repositoryFactory.createAccountRepository();
                accountHttp.getAccountInfo(address).subscribe(
                    // (accountInfo) => console.log(accountInfo.mosaics[5].amount.lower), // revokeする側のアドレスならとれた
                    (accountInfo) => $gameVariables.setValue(15, accountInfo.mosaics[5].amount.lower),　// revokeする側のアドレスなら変数反映できた

                    (err) => console.error(err),
                );

                // listener.close();
            },
            (err) => console.error(err),
        );
    });
})();
