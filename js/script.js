class Calculator {
    constructor(tidigareOperandTextElement, beräknaOperandTextElement) {
      this.tidigareOperandTextElement = tidigareOperandTextElement
      this.beräknaOperandTextElement = beräknaOperandTextElement
      this.clear()
    }
  
    clear() {
      this.beräknaOperand = ''
      this.ptidigareOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.beräknaOperand = this.beräknaOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.beräknaOperand.includes('.')) return
      this.beräknaOperand = this.beräknaOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.beräknaOperand === '') return
      if (this.tidigareOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.tidigareOperand = this.beräknaOperand
      this.beräknaOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.tidigareOperand)
      const beräkna  = parseFloat(this.beräknaOperand)
      if (isNaN(prev) || isNaN(beräkna)) return
      switch (this.operation) {
        case '+':
          computation = prev + beräkna
          break
        case '-':
          computation = prev - beräkna
          break
        case '*':
          computation = prev * beräkna
          break
        case '÷':
          computation = prev / beräkna
          break
        default:
          return
      }
      this.beräknaOperand = computation
      this.operation = undefined
      this.tidigareOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.beräknaOperandTextElement.innerText =
        this.getDisplayNumber(this.beräknaOperand)
      if (this.operation != null) {
        this.tidigareOperandTextElement.innerText =
          `${this.getDisplayNumber(this.tidigareOperand)} ${this.operation}`
      } else {
        this.tidigareOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const tidigareOperandTextElement = document.querySelector('[data-tidigare-operand]')
  const beräknaOperandTextElement = document.querySelector('[data-beräkna-operand]')
  
  const calculator = new Calculator(tidigareOperandTextElement, beräknaOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })