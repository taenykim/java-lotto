const { body } = document
const LOTTO_MAX_NUMBER = 45
const LOTTO_LENGTH = 6
const LOTTO_PRICE = 1000

const lottoNumbers = []
for (let i = 0; i < LOTTO_MAX_NUMBER; i++) {
  lottoNumbers.push(i + 1)
}

const myLottos = []
const rank = {
  FIRST: 0,
  SECOND: 0,
  THIRD: 0,
  FOURTH: 0,
  FIFTH: 0,
  MISS: 0,
}

const priceForm = document.createElement('form')
body.append(priceForm)

makeDescription('구입 금액을 입력해주세요. ', priceForm)

const priceInput = document.createElement('input')
priceInput.type = 'text'
priceInput.style.width = '500px'
priceForm.append(priceInput)

const priceButton = document.createElement('button')
priceButton.type = 'submit'
priceButton.textContent = '입력!'
priceForm.append(priceButton)

const conditionForm = document.createElement('form')
conditionForm.style.display = 'none'
body.append(conditionForm)

makeDescription('<br/>지난주 당첨 번호를 입력해주세요.', conditionForm)

const lottoNumberInput = document.createElement('input')
lottoNumberInput.type = 'text'
lottoNumberInput.style.width = '500px'
conditionForm.append(lottoNumberInput)

makeDescription('보너스볼을 입력해주세요.', conditionForm)

const bonusBallInput = document.createElement('input')
bonusBallInput.type = 'text'
bonusBallInput.style.width = '500px'
conditionForm.append(bonusBallInput)

const conditionButton = document.createElement('button')
conditionButton.type = 'submit'
conditionButton.textContent = '입력!'
conditionForm.append(conditionButton)

priceForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!getLottoCount(priceInput.value)) {
    makeDescription('입력값이 잘못되었습니다.', priceForm)
    return
  }
  const lottoCount = getLottoCount(priceInput.value)
  setLotto(lottoCount, myLottos)
  let result = ''
  makeDescription(`<br/>${lottoCount}개를 구매했습니다.`, priceForm)
  for (let i = 0; i < lottoCount; i++) {
    result += `[${myLottos[i].numbers.join(', ')}]<br/>`
  }
  makeDescription(`${result}`, priceForm)
  conditionForm.style.display = 'block'
})

conditionForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!checkInputValue(lottoNumberInput.value, bonusBallInput.value)) {
    makeDescription('입력값이 잘못되었습니다.', conditionForm)
    return
  }
  const winningLotto = new WinningLotto(
    new Lotto(lottoNumberInput.value.split(',').map((item) => Number(item))),
    Number(bonusBallInput.value)
  )
  matchLottos(myLottos, winningLotto)
  let result = '<br/>당첨통계<br/>--------<br/>'
  const fifthText = `3개일치(5000원)- ${rank['FIFTH']}개<br/>`
  const fourthText = `4개일치(50000원)- ${rank['FOURTH']}개<br/>`
  const thirdText = `5개일치(1500000원)- ${rank['THIRD']}개<br/>`
  const secondText = `5개일치, 보너스 볼 일치(30000000원)- ${rank['SECOND']}개<br/>`
  const firstText = `6개일치(2000000000원)- ${rank['FIRST']}개<br/>`
  const totalSum =
    rank['FIFTH'] * 5000 +
    rank['FOURTH'] * 50000 +
    rank['THIRD'] * 1500000 +
    rank['SECOND'] * 30000000 +
    rank['FIRST'] * 2000000000
  const lastText = `총 수익률은 ${totalSum / priceInput.value}입니다.`
  result += fifthText + fourthText + thirdText + secondText + firstText + lastText

  makeDescription(result, conditionForm)
})
