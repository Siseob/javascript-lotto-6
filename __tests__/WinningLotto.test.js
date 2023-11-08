import { mockReadLineAsync } from './mockMissionUtils';

describe('WinningLotto 정상 테스트', () => {
  test('"1,2,3,4,5,6", "7" 입력', () => {
    // given
    const numbers = '1,2,3,4,5,6';
    const bonus = '7';
    mockReadLineAsync([numbers, bonus]);

    // when
    const winningLotto = new WinningLotto();

    // then
    expect(winningLotto.numbers).toEqual(numbers.split(','));
    expect(winningLotto.bonus).toEqual(Number(bonus));
  });
});

describe('WinningLotto 당첨 번호 예외 테스트', () => {
  test.each([
    [''],
    ['1,2,t'],
    ['1,,2'],
    ['1,2,3,4,5'],
    ['1,2,3,4,5,5'],
    ['0,1,2,3,4,5'],
  ])('입력: %s', (input) => {
    // given
    mockReadLineAsync(input);
    const bonus = '7';

    // when & then
    expect(new WinningLotto()).toThrow('[ERROR] Invalid winning numbers.');
  });
});

describe('WinningLotto 보너스 번호 예외 테스트', () => {
  test.each([
    ['1,2,3,4,5,6', ''],
    ['1,2,3,4,5,6', '1t'],
    ['1,2,3,4,5,6', '1'],
    ['1,2,3,4,5,6', '0'],
  ])('입력: %s', (input) => {
    // given
    mockReadLineAsync(input);

    // when & then
    expect(new WinningLotto()).toThrow('[ERROR] Invalid bonus numbers.');
  });
});