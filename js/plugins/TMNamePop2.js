//=============================================================================
// TMPlugin2 - ネームポップ
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc イベントの頭上に文字列を表示する機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param backOpacity
 * @desc ネームポップの背景の不透明度。
 * 初期値: 96 ( 0 ～ 255 )
 * @default 96
 *
 * @param fontSize
 * @desc ネームポップのフォントサイズ。
 * 初期値: 20
 * @default 20
 *
 * @param outlineWidth
 * @desc ネームポップの縁取りの太さ。
 * 初期値: 4
 * @default 4
 *
 * @param outlineColor
 * @desc ネームポップの縁取りの色。
 * 初期値: rgba(0, 0, 0, 0.5)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param width
 * @desc ネームポップの幅
 * 初期値: 160
 * @default 160
 *
 * @param roundRectRadius
 * @desc TMBitmapEx.js導入時の、角丸矩形の丸部分の半径。
 * 初期値: 6
 * @default 6
 *
 * @help
 * 使い方:
 *
 *   イベントのメモ欄（または注釈コマンド）にタグを書き込むか、あるいは
 *   プラグインコマンドを使って後からネームポップを設定することで、
 *   キャラクターの頭上に文字列を表示することができます。
 *
 *   イベントの透明化をオンにするとネームポップも非表示になります。
 *   ネームポップだけを表示したい場合はイベントの画像を (なし) に
 *   してください。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   namePopCopy 1 名前
 *     イベント１番の頭上に 名前 という文字列を表示します。
 *
 *   namePopCopy 1 名前 -48
 *     ネームポップを上へ 48 ドットずらして表示します。
 *
 *   namePopCopy 1 名前 -48 blue
 *     ネームポップの縁取りの色を青色で表示します。
 *
 *   namePopCopy 1
 *     イベント１番のネームポップを消去します。
 *
 *   イベント番号（ひとつ目の数値）は以下の規則にしたがって対象を指定します。
 *     -1     … プレイヤーを対象にする
 *     0      … コマンドを実行しているイベントを対象にする
 *     1 以上 … その番号のイベントを対象にする
 *
 *
 * メモ欄（イベント）タグ:
 *
 *   <namePopCopy:名前 12 red>
 *     頭上に 名前 という文字列を、通常よりも下へ 12 ドットずらして、
 *     文字の縁取りを赤色にして表示します。
 *
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグでネームポップを設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 *   ネームポップには一部の制御文字を使用することもできます。
 *   \V, \N, \P, \G, \\, \C が使えます、使い方は『文章の表示』と同じですが、
 *   \C はネームポップ全体の文字色を変更します。
 *
 *   制御文字による置換はプラグインコマンドやイベントページの切り替えにより
 *   名前が変化したときにのみ実行されます。つまり \V で変数の値を名前として
 *   設定し、その後変数の値を別の値に変更してもネームポップは変化しません。
 *
 *
 * プラグインパラメータ補足:
 *
 *   namePopCopyOutlineColor
 *     縁取りの色は rgba(0, 0, 0, 0.5) のような形式でRGB値と不透明度を
 *     設定します。RGB値は 0 ～ 255、不透明度は 0 ～ 1.0 の範囲で値を
 *     設定してください。
 *       例: rgba(255, 0, 255, 0.5)    # 不透明度５０％のピンク
 *
 *     また、上記の形式以外に black や blue といったカラーネームと、
 *     #000000 や #0000ff のようなカラーコードを指定することもできます。
 *
 *   roundRectRadius
 *     TMBitmapEx.js をこのプラグインよりも上の位置に導入し、
 *     このパラメータの値を 1 以上にすることで、ネームポップ背景を
 *     角丸の矩形にすることができます。
 */

var Imported = Imported || {};
Imported.TMnamePopCopy = true;

var TMPlugin = TMPlugin || {};
TMPlugin.namePopCopy = {};
TMPlugin.namePopCopy.Parameters = PluginManager.parameters('TMnamePopCopy');
TMPlugin.namePopCopy.BackOpacity =  +(TMPlugin.namePopCopy.Parameters['backOpacity'] || 96);
TMPlugin.namePopCopy.FontSize = +(TMPlugin.namePopCopy.Parameters['fontSize'] || 20);
TMPlugin.namePopCopy.OutlineWidth = +(TMPlugin.namePopCopy.Parameters['outlineWidth'] || 4);
TMPlugin.namePopCopy.OutlineColor = TMPlugin.namePopCopy.Parameters['outlineColor'] || 'rgba(0, 0, 0, 0.5)';
TMPlugin.namePopCopy.Width = +(TMPlugin.namePopCopy.Parameters['width'] || 160);
TMPlugin.namePopCopy.RoundRectRadius = +(TMPlugin.namePopCopy.Parameters['roundRectRadius'] || 6);


if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;
  (function() {

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName];
    };

  })();
} // TMPlugin.EventBase

if (!TMPlugin.InterpreterBase) {
  TMPlugin.InterpreterBase = true;
  (function() {

    Game_Interpreter.prototype.convertEscapeCharactersTM = function(text) {
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
      return text;
    };

    Game_Interpreter.prototype.actorNameTM = function(n) {
      var actor = n >= 1 ? $gameActors.actor(n) : null;
      return actor ? actor.name() : '';
    };

    Game_Interpreter.prototype.partyMemberNameTM = function(n) {
      var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
      return actor ? actor.name() : '';
    };

  })();
} // TMPlugin.InterpreterBase

(function() {

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  Game_CharacterBase.prototype.setnamePopCopy = function(namePopCopy, shiftY) {
    if (namePopCopy) {
      namePopCopy = $gameMap._interpreter.convertEscapeCharactersTM(namePopCopy);
    }
    this._namePopCopy  = namePopCopy;
    this._namePopCopyY = shiftY || 0;
  };

  Game_CharacterBase.prototype.namePopCopyOutlineColor = function() {
    return this._namePopCopyOutlineColor || TMPlugin.namePopCopy.OutlineColor;
  };

  Game_CharacterBase.prototype.setnamePopCopyOutlineColor = function(outlineColor) {
    this._namePopCopyOutlineColor = outlineColor;
  };

  Game_CharacterBase.prototype.requestnamePopCopy = function() {
    this._requestnamePopCopy = true;
  };

  Game_CharacterBase.prototype.onChangenamePopCopy = function() {
    this._requestnamePopCopy = false;
  };

  Game_CharacterBase.prototype.isnamePopCopyRequested = function() {
    return this._requestnamePopCopy;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var namePopCopy = this.loadTagParam('namePopCopy');
      if (namePopCopy) {
        var arr = namePopCopy.split(' ');
        this.setnamePopCopy(arr[0], arr[1]);
        this.setnamePopCopyOutlineColor(arr[2]);
      }
    } else {
      this.setnamePopCopy(null, 0);
    }
    this.requestnamePopCopy();
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'namePopCopy') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        character.setnamePopCopy(args[1], arr[2]);
        character.setnamePopCopyOutlineColor(arr[3]);
        character.requestnamePopCopy();
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updatenamePopCopy();
  };

  Sprite_Character.prototype.updatenamePopCopy = function() {
    if (this._character.isnamePopCopyRequested() ||
        this._namePopCopy !== this._character._namePopCopy) {
      this._character.onChangenamePopCopy();
      this._namePopCopy = this._character._namePopCopy;
      if (this._namePopCopy) {
        if (!this._namePopCopySprite) {
          this._namePopCopySprite = new Sprite_namePopCopy();
          this.addChild(this._namePopCopySprite);
          this._namePopCopySprite.y = this.namePopCopyShiftY();
        }
        this._namePopCopySprite.refresh(this._namePopCopy,
                                    this._character.namePopCopyOutlineColor());
      } else {
        this.removeChild(this._namePopCopySprite);
        this._namePopCopySprite = null;
      }
    }
  };

  Sprite_Character.prototype.namePopCopyShiftY = function() {
    return this._character._namePopCopyY - this.patternHeight();
  };

  //-----------------------------------------------------------------------------
  // Sprite_namePopCopy
  //

  function Sprite_namePopCopy() {
    this.initialize.apply(this, arguments);
  }

  Sprite_namePopCopy.prototype = Object.create(Sprite.prototype);
  Sprite_namePopCopy.prototype.constructor = Sprite_namePopCopy;

  Sprite_namePopCopy.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(TMPlugin.namePopCopy.Width, TMPlugin.namePopCopy.FontSize + 4);
    this.bitmap.fontSize = TMPlugin.namePopCopy.FontSize;
    this.bitmap.outlineWidth = TMPlugin.namePopCopy.OutlineWidth;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  };

  Sprite_namePopCopy.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.y = this.parent.namePopCopyShiftY();
  };

  Sprite_namePopCopy.prototype.refresh = function(text, outlineColor) {
    this.bitmap.clear();
    this.bitmap.textColor = '#ffffff';
    this.bitmap.outlineColor = outlineColor;
    text = this.convertEscapeCharacters(text);
    var tw = this.bitmap.measureTextWidth(text);
    var x = Math.max((this.width - tw) / 2 - 4, 0);
    var w = Math.min(tw + 8, this.width);
    this.bitmap.paintOpacity = TMPlugin.namePopCopy.BackOpacity;
    if (Imported.TMBitmapEx && TMPlugin.namePopCopy.RoundRectRadius) {
      this.bitmap.fillRoundRect(x, 0, w, this.height, TMPlugin.namePopCopy.RoundRectRadius, '#000000');
    } else {
      this.bitmap.fillRect(x, 0, w, this.height, '#000000');
    }
    this.bitmap.paintOpacity = 255;
    this.bitmap.drawText(text, 0, 0, this.width, this.height, 'center');
  };

  Sprite_namePopCopy.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\x1bC\[(\d+)\]/gi, function() {
      this.bitmap.textColor = this.textColor(arguments[1]);
      return '';
    }.bind(this));
    return text;
  };

  Sprite_namePopCopy.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    var windowskin = ImageManager.loadSystem('Window');
    return windowskin.getPixel(px, py);
  };

})();
