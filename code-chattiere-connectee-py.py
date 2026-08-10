def débloquage():
    global en_cours
    en_cours = 1
    pins.servo_write_pin(AnalogPin.P1, 90)
    basic.show_icon(IconNames.SQUARE)
    basic.pause(10000)
    pins.servo_write_pin(AnalogPin.P1, 0)
    en_cours = 0
    basic.clear_screen()
en_cours = 0
bloquage = 0
en_cours = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)

def on_forever():
    global bloquage
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) and bloquage == 0 and en_cours == 0:
        débloquage()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) and (en_cours == 1 or bloquage == 1):
        basic.show_icon(IconNames.SAD)
    if input.button_is_pressed(Button.A):
        if bloquage == 1:
            bloquage = 0
        else:
            bloquage = 1
    if input.button_is_pressed(Button.B) and en_cours == 0:
        débloquage()
    if bloquage == 1:
        basic.show_icon(IconNames.NO)
    else:
        basic.show_icon(IconNames.YES)
basic.forever(on_forever)
