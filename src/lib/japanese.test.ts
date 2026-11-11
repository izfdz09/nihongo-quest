import test from 'node:test';
import assert from 'node:assert/strict';
import { display, kana, pieces, sameRomaji, segments, toRomaji } from './japanese';

test('rōmaji de palabras básicas', () => {
  const cases: Record<string, string> = {
    こんにちは: 'konnichiwa',
    がっこう: 'gakkou',
    まっちゃ: 'matcha',
    きょう: 'kyou',
    しんぶん: 'shinbun',
    ほんや: "hon'ya",
    じゅう: 'juu',
    ちゃ: 'cha',
    りょこう: 'ryokou',
    ざっし: 'zasshi',
    きって: 'kitte',
  };
  for (const [jp, ro] of Object.entries(cases)) assert.equal(toRomaji(jp), ro, jp);
});

test('rōmaji de katakana, vocal larga y sonidos extranjeros', () => {
  assert.equal(toRomaji('コーヒー'), 'kōhī');
  assert.equal(toRomaji('テレビ'), 'terebi');
  assert.equal(toRomaji('パーティー'), 'pātī');
  assert.equal(toRomaji('ファイル'), 'fairu');
  assert.equal(toRomaji('スペイン'), 'supein');
  assert.equal(toRomaji('チェック'), 'chekku');
});

test('las partículas sueltas se leen wa / e / o', () => {
  assert.equal(toRomaji('私[わたし] は 学生[がくせい] です。'), 'watashi wa gakusei desu.');
  assert.equal(toRomaji('水[みず] を 飲[の]みます'), 'mizu o nomimasu');
  assert.equal(toRomaji('学校[がっこう] へ 行[い]きます'), 'gakkou e ikimasu');
  assert.equal(toRomaji('はな'), 'hana');
  assert.equal(toRomaji('学生[がくせい] では ありません。'), 'gakusei dewa arimasen.');
});

test('texto visible, lectura y furigana', () => {
  const src = '私[わたし] は 日本語[にほんご] を 勉強[べんきょう]します。';
  assert.equal(display(src), '私は日本語を勉強します。');
  assert.equal(kana(src), 'わたし は にほんご を べんきょうします。');
  assert.deepEqual(segments('食[た]べます'), [{ text: '食', ruby: 'た' }, { text: 'べます' }]);
  assert.deepEqual(pieces(src), ['私[わたし]', 'は', '日本語[にほんご]', 'を', '勉強[べんきょう]します']);
});

test('comparación tolerante de rōmaji', () => {
  assert.ok(sameRomaji(' Arigatou ', 'arigatou'));
  assert.ok(sameRomaji('kōhī', 'kohi'));
  assert.ok(!sameRomaji('ka', 'ga'));
});
