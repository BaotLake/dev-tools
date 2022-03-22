#! python3

from pynput import keyboard
from pynput.mouse import Button, Controller


def on_press(key):
    try:
        print(key)
        if key == keyboard.Key.cmd:
            print('click x3')
            mouse = Controller()
            mouse.click(Button.left)
            mouse.click(Button.left)
            mouse.click(Button.left)
    except:
        print('')


def on_release(key):
    pass


# Collect events until released
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()


# # no-blocking fashion:
# listener = keyboard.Listener(on_press=on_press, on_release=on_release)
# listener.start()
