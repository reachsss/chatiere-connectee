function débloquage() {
    
    en_cours = 1
    pins.servoWritePin(AnalogPin.P1, 90)
    basic.showIcon(IconNames.Square)
    basic.pause(10000)
    pins.servoWritePin(AnalogPin.P1, 0)
    en_cours = 0
    basic.clearScreen()
}

let en_cours = 0
let bloquage = 0
en_cours = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
basic.forever(function on_forever() {
    
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) && bloquage == 0 && en_cours == 0) {
        débloquage()
    }
    
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) && (en_cours == 1 || bloquage == 1)) {
        basic.showIcon(IconNames.Sad)
    }
    
    if (input.buttonIsPressed(Button.A)) {
        if (bloquage == 1) {
            bloquage = 0
        } else {
            bloquage = 1
        }
        
    }
    
    if (input.buttonIsPressed(Button.B) && en_cours == 0) {
        débloquage()
    }
    
    if (bloquage == 1) {
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Yes)
    }
    
})
